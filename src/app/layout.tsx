import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Munverricht | Neuro-Digital Matrix",
  description: "High-end digital solutions engineered with precision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        {children}
      </body>
    </html>
  );
}
