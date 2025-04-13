import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata = {
  title: "Creccal Investments Ltd",
  description: "A simple CRUD example using Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
