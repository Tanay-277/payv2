import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Providers } from "../providers";
import AppBar from "./components/AppBar";

const generalSans = localFont({
    src: "./fonts/general-sans/GeneralSans.woff2",
    variable: "--font-general-sans",
    display: "swap"
});

const jetbrainsMono = localFont({
    src: "./fonts/JetBrainsMono.woff2",
    variable: "--font-jet-mono",
    display: "swap"
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
            <Providers>
                <body className={`${generalSans.variable} ${jetbrainsMono.variable}`}>
                    <AppBar />
                    {children}
                </body>
            </Providers>
        </html>
    );
}
