import type { Metadata } from "next";
import { Instrument_Sans, Sora } from "next/font/google";
import "./globals.css";
import Header from "@/Components/UI/Header";
import ThemeProvider from "@/Components/ThemeProvider";
import UrlProvider from "@/Context/UrlProvider";
import { Toaster } from "sonner";
import { AuthProvider } from "@/Context";
import Footer from "@/Components/UI/Footer";
const instrumentSans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Imggen",
  description: "Imggen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSans.variable} ${sora.variable} antialiased flex flex-col min-h-screen`}
      >
        <AuthProvider>
          <ThemeProvider>
            <UrlProvider>
              <Toaster richColors position="top-center" />
              <Header />
              <main className="main w-full flex-1 ">{children}</main>
              <Footer />
            </UrlProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
