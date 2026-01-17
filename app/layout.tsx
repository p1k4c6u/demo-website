import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AP PROJECTS | Systems That Scale",
  description: "Strategy, technology and execution — without noise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
