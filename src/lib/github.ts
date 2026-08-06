import "server-only";

/**
 * GitHub's public REST API doesn't expose the contribution calendar, so this
 * goes through GraphQL. The token is read from the environment on the server
 * and never reaches the client — this module is `server-only` so an accidental
 * client import fails the build rather than leaking it.
 */

const ENDPOINT = "https://api.github.com/graphql";

const QUERY = `
  query ContributionCalendar($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              weekday
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

/** 0 = no contributions, 4 = busiest quartile. */
export type Level = 0 | 1 | 2 | 3 | 4;

export type Day = {
  date: string;
  weekday: number;
  count: number;
  level: Level;
};

export type Week = { days: Day[] };

export type Calendar = {
  weeks: Week[];
  /** Null when we're rendering the empty fallback grid. */
  total: number | null;
  /** Set when the graph is a placeholder, explaining why. */
  note: string | null;
};

const LEVELS: Record<string, Level> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

type ApiResponse = {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              date: string;
              weekday: number;
              contributionCount: number;
              contributionLevel: string;
            }[];
          }[];
        };
      };
    } | null;
  };
  errors?: { message: string }[];
};

export async function getContributions(login: string): Promise<Calendar> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return emptyCalendar(
      "Set GITHUB_TOKEN to show real contribution data.",
    );
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY, variables: { login } }),
      // Refresh once a day rather than on every render.
      next: { revalidate: 86_400 },
    });

    if (!response.ok) {
      return emptyCalendar(`GitHub API returned ${response.status}.`);
    }

    const payload = (await response.json()) as ApiResponse;
    const calendar =
      payload.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      const reason = payload.errors?.[0]?.message ?? "No calendar returned.";
      return emptyCalendar(reason);
    }

    return {
      total: calendar.totalContributions,
      note: null,
      weeks: calendar.weeks.map((week) => ({
        days: week.contributionDays.map((day) => ({
          date: day.date,
          weekday: day.weekday,
          count: day.contributionCount,
          level: LEVELS[day.contributionLevel] ?? 0,
        })),
      })),
    };
  } catch (error) {
    return emptyCalendar(
      error instanceof Error ? error.message : "Could not reach GitHub.",
    );
  }
}

/**
 * A full year of blank cells, aligned to real dates so the month labels and
 * weekday rows still read correctly when live data isn't available.
 */
function emptyCalendar(note: string): Calendar {
  const today = new Date();
  // Walk back to the Sunday that starts the current week.
  const end = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()),
  );
  end.setUTCDate(end.getUTCDate() - end.getUTCDay());

  const weeks: Week[] = [];
  for (let w = 52; w >= 0; w--) {
    const days: Day[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(end);
      date.setUTCDate(end.getUTCDate() - w * 7 + d);
      days.push({
        date: date.toISOString().slice(0, 10),
        weekday: d,
        count: 0,
        level: 0,
      });
    }
    weeks.push({ days });
  }

  return { weeks, total: null, note };
}
