import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ReactQueryProvider from "./components/ReactQueryProvider";
import IdleTimer from "./components/idleTimer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Customer Account Dashboard",
  description: "Core-banking Customer Account Dashboard By InterSwitch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${montserrat.variable} font-montserrat antialiased`}>
        <Toaster position="top-center" richColors />
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <IdleTimer />
      </body>
    </html>
  );
}
