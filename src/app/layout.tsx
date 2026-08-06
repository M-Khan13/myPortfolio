import type { Metadata } from "next";
import { Caveat, Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

import { meta } from "@/content";
import { THEME_INIT_SCRIPT } from "@/lib/theme";

import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"] });

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    type: "profile",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Dark is the default, so the server renders it and the inline script
      // below only ever has to switch down to light.
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${caveat.variable} h-full`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        {/*
         * Runs while the browser parses the document, before first paint, so a
         * stored light preference never flashes dark.
         */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      {/* Browser extensions commonly stamp attributes on <body> before React
          hydrates; suppressing keeps their noise out of the console. */}
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:border focus:bg-surface focus:px-3 focus:py-2 focus:font-mono focus:text-xs"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
