import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/weather/theme-provider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  icons: {
    icon: "/cloudy.png",
  },

};

const darkModeScript = `
if (!('_updateTheme' in window)) {
  window._updateTheme = function updateTheme(theme) {
    const classList = document.documentElement.classList;
    classList.remove("light", "dark", "system");

    document.querySelectorAll('meta[name="theme-color"]').forEach(el => el.remove());

    const createMeta = (content, media) => {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = content;
      if (media) meta.media = media;
      document.head.appendChild(meta);
    };

    if (theme === 'dark') {
      classList.add('dark');
      createMeta('oklch(.13 .028 261.692)');
    } else if (theme === 'light') {
      classList.add('light');
      createMeta('white');
    } else {
      classList.add('system');
      createMeta('oklch(.13 .028 261.692)', '(prefers-color-scheme: dark)');
      createMeta('white', '(prefers-color-scheme: light)');
    }
  };

  try {
    _updateTheme(localStorage.currentTheme);
  } catch (_) {}

  try {
    if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
      document.documentElement.classList.add('os-macos');
    }
  } catch (_) {}
}
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script id="theme-script" strategy="beforeInteractive">
          {darkModeScript}
        </Script>
      </head>
      <body>
        <ThemeProvider>
          <div className="relative isolate">
            <div className="absolute inset-0 -z-10 h-full w-full bg-[url('/noise.png')] bg-cover bg-center bg-no-repeat bg-blend-multiply opacity-10 dark:opacity-100" />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
