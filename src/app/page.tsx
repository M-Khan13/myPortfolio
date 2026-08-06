import { Column, Divider } from "@/components/frame";
import { Contributions } from "@/components/sections/contributions";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { Nav } from "@/components/sections/nav";
import { Outro } from "@/components/sections/outro";
import { Projects } from "@/components/sections/projects";
import { Stack } from "@/components/sections/stack";

/**
 * Rebuild hourly so the server-rendered clock seed and time-of-day greeting
 * aren't stale for visitors arriving with JS disabled. The contribution fetch
 * caches for a day independently of this.
 */
export const revalidate = 3600;

export default function Home() {
  // One timestamp for the whole render, so the clock and greeting agree.
  const now = new Date();

  return (
    <>
      <Nav />

      <main className="flex-1">
        <Column>
          <Hero now={now} />
          <Divider />
          <Contributions />
          <Divider />
          <Intro now={now} />
          <Divider />
          <Stack />
          <Divider />
          <Experience />
          <Divider />
          <Projects />
          <Divider />
          <Education />
          <Divider />
          <Outro />
          <Divider />
          <Footer />
        </Column>
      </main>
    </>
  );
}
