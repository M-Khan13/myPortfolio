import { Section } from "@/components/frame";
import { githubUser } from "@/content";
import { getContributions, type Level, type Week } from "@/lib/github";

const LEVEL_CLASS: Record<Level, string> = {
  0: "bg-level-0",
  1: "bg-level-1",
  2: "bg-level-2",
  3: "bg-level-3",
  4: "bg-level-4",
};

const WEEKDAYS = ["Mon", "Wed", "Fri"];
const WEEKDAY_ROWS = [1, 3, 5];

export async function Contributions() {
  const calendar = await getContributions(githubUser);
  const months = monthLabels(calendar.weeks);

  return (
    <Section label="Contributions">
      {/*
        `dir="rtl"` on the scroll container makes it start at the far end, so a
        narrow viewport lands on the most recent weeks. The inner `dir="ltr"`
        puts the calendar itself back in reading order.
      */}
      <div dir="rtl" className="overflow-x-auto pb-2">
        <div dir="ltr" className="min-w-max">
          {/* Month labels, positioned over the week each month starts in. */}
          <div
            className="mb-1 grid gap-[2px] pl-8"
            style={{
              gridTemplateColumns: `repeat(${calendar.weeks.length}, 10px)`,
            }}
          >
            {calendar.weeks.map((_, index) => (
              <span
                key={index}
                className="label whitespace-nowrap text-[0.625rem] tracking-normal"
                style={{ gridColumn: index + 1 }}
              >
                {months.get(index) ?? ""}
              </span>
            ))}
          </div>

          <div className="flex gap-1">
            {/* Weekday gutter. */}
            <div className="grid grid-rows-7 gap-[2px] pr-1">
              {Array.from({ length: 7 }, (_, row) => (
                <span
                  key={row}
                  className="label h-[10px] text-[0.625rem] leading-[10px] tracking-normal"
                >
                  {WEEKDAY_ROWS.includes(row)
                    ? WEEKDAYS[WEEKDAY_ROWS.indexOf(row)]
                    : ""}
                </span>
              ))}
            </div>

            <div className="grid grid-flow-col grid-rows-7 gap-[2px]">
              {calendar.weeks.map((week) =>
                week.days.map((day) => (
                  <span
                    key={day.date}
                    title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                    style={{ gridRow: day.weekday + 1 }}
                    className={`size-[10px] rounded-[2px] ${LEVEL_CLASS[day.level]}`}
                  />
                )),
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="label normal-case tracking-[0.12em]">
          {calendar.total !== null ? (
            <>
              {calendar.total.toLocaleString("en-US")} contributions in the last
              year on{" "}
            </>
          ) : (
            <>Contributions on </>
          )}
          <a
            href={`https://github.com/${githubUser}`}
            target="_blank"
            rel="noreferrer noopener"
            className="underline decoration-rule-strong underline-offset-4 transition-colors hover:text-foreground"
          >
            @{githubUser}
          </a>
        </p>

        <div className="flex items-center gap-1.5">
          <span className="label text-[0.625rem]">Less</span>
          {([0, 1, 2, 3, 4] as Level[]).map((level) => (
            <span
              key={level}
              className={`size-[10px] rounded-[2px] ${LEVEL_CLASS[level]}`}
            />
          ))}
          <span className="label text-[0.625rem]">More</span>
        </div>
      </div>

      {calendar.note ? (
        <p className="mt-3 rounded border border-dashed border-rule-strong px-3 py-2 font-mono text-[0.6875rem] text-muted-foreground">
          {calendar.note}
        </p>
      ) : null}
    </Section>
  );
}

/** Maps week index → month name, for the first week each month appears in. */
function monthLabels(weeks: Week[]): Map<number, string> {
  const labels = new Map<number, string>();
  let previous = "";

  weeks.forEach((week, index) => {
    const first = week.days[0];
    if (!first) return;

    const date = new Date(`${first.date}T00:00:00Z`);
    const month = date.toLocaleString("en-US", {
      month: "short",
      timeZone: "UTC",
    });

    // Skip the first column so a partial month doesn't crowd the label row.
    if (month !== previous && index > 0) labels.set(index, month);
    previous = month;
  });

  return labels;
}
