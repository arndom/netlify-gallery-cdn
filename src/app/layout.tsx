import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";

const font = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Net Gala",
  description: "A Curated Image Gallery showcasing Netlify's Image CDN",
  keywords: ["met gala", "gallery", "demo", "dev.to", "netlify", "cdn", "netlify image cdn", "arndom"],
  metadataBase: new URL("https://net-gala.netlify.app/"),
  openGraph: {
    title: "Net Gala",
    description: "A Curated Image Gallery showcasing Netlify's Image CDN",
    url: "https://net-gala.netlify.app/",
    siteName: "Net Gala",
    locale: "en_US",
    type: "website",
    images: "/banner.png"
  },
  twitter: {
    title: "Net Gala",
    description: "A Curated Image Gallery showcasing Netlify's Image CDN",
    card: "summary_large_image",
    images: "/banner.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
