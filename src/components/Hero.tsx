import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import Link from "next/link";

export default function Hero() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background - already in layout, but we can layer extras if needed */}
      <div className="absolute inset-0 pointer-events-none">
        <StarsBackground />
        <ShootingStars />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-tight">
          Unveiling the Hidden Truths
        </h1>

        <p className="text-xl sm:text-2xl md:text-3xl text-white/80 mb-10 max-w-3xl mx-auto">
          Explore UFO sightings, government cover-ups, ancient mysteries, and the secrets they don't want you to know.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-10 py-5 text-xl font-medium text-black bg-white hover:bg-white/90 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white/30"
          >
            Dive into the Latest Posts
          </Link>

          <Link
            href="/about"
            className="inline-flex items-center justify-center px-10 py-5 text-xl font-medium text-white border-2 border-white/60 hover:bg-white/10 rounded-full transition-all duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Optional subtle overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />
    </main>
  );
}