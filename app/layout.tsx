import type { Metadata } from "next";
import { Inter, Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themes/theme-provider";

// Body font - Inter
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// Heading font - Outfit
const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

// Mono font - keeping Geist Mono for code
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Africa Climate Platform | Accelerating Climate Action Across Africa",
    template: "%s | Africa Climate Platform",
  },
  description:
    "A comprehensive ecosystem designed to accelerate climate action across Africa. Connecting innovators, investors, and partners to create lasting impact through green finance, innovation, and collaboration.",
  keywords: [
    "Africa climate action",
    "green finance Africa",
    "climate innovation",
    "sustainable development Africa",
    "climate SMEs",
    "renewable energy Africa",
    "carbon reduction",
    "climate investment",
    "African climate solutions",
    "climate policy Africa",
  ],
  authors: [{ name: "Africa Climate Platform" }],
  creator: "Africa Climate Platform",
  publisher: "Africa Climate Platform",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://africaclimate.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Africa Climate Platform | Accelerating Climate Action Across Africa",
    description:
      "A comprehensive ecosystem designed to accelerate climate action across Africa. Connecting innovators, investors, and partners to create lasting impact.",
    siteName: "Africa Climate Platform",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Africa Climate Platform - Accelerating Climate Action",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Africa Climate Platform | Accelerating Climate Action Across Africa",
    description:
      "A comprehensive ecosystem designed to accelerate climate action across Africa. Connecting innovators, investors, and partners.",
    images: ["/images/twitter-image.jpg"],
    creator: "@AfricaClimatePlatform",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1E5631" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} ${geistMono.variable} antialiased`}
      >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
