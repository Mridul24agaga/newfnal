import type { Metadata } from "next";
import localFont from "next/font/local";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Get More backlinks - Your AI Powered SEO Partner",
  description: "Get instant traffic on your site, save days of manual work with just one click. Submit Your AI Startup To 100+ Plaƞorms In 7 Days",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </UserProvider>
    </html>
  );
}

