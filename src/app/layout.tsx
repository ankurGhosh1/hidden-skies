import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ShootingStars } from "../components/ui/shooting-stars";
import { StarsBackground } from "../components/ui/stars-background";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UFO & Conspiracy Theories Blog",
  description: "Explore mysteries of the universe, UFO sightings, and conspiracy theories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
        <div className="relative h-full w-full bg-black">
          <Navbar />

          <StarsBackground
            className="absolute inset-0 z-0"
            starDensity={0.0008}
            twinkleProbability={1}
            minTwinkleSpeed={0.8}
          />

          <ShootingStars
            className="absolute inset-0 z-0"
            minSpeed={5}
            maxSpeed={20}
            starColor="#797979"
            trailColor="#2EB9DF"
            maxDelay={6000}
          />
          <div className="relative z-10">
            {children}
          </div>

          <Footer />
          <PrismicPreview repositoryName={repositoryName} />
        </div>
      </body>
    </html>
  );
}