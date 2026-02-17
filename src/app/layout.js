import { Kulim_Park } from "next/font/google";
import "./globals.css";

const kulimPark = Kulim_Park({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700"],
  variable: "--font-kulim",
});

export const metadata = {
  title: "MATI JOB | Find Your Career",
  description: "Professional job marketplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={kulimPark.variable}>{children}</body>
    </html>
  );
}
