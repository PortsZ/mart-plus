import "./globals.css";
import type { Metadata } from "next";
import SessionProviderFunction from "./providers/SessionProviderFunction";

export const metadata: Metadata = {
  title: "MartPlus",
  description: "Your Local Friend",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProviderFunction>
          {children}
          </SessionProviderFunction>
      </body>
    </html>
  );
}
