import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const generalSans = localFont({
  src: "./fonts/general-sans/GeneralSans.woff2",
  variable: "--font-general-sans",
});
const jetbrainsMono = localFont({
  src: "./fonts/JetBrainsMono.woff2",
  variable: "--font-jet-mono",
});

export const metadata: Metadata = {
  title: "Pay",
  description: "Next Gen Online Wallet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${generalSans.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
