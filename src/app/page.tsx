import Link from 'next/link';
import { createClient } from '@/prismicio';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicText } from '@prismicio/react';

// UI Components
import { ShootingStars } from '@/components/ui/shooting-stars';
import { StarsBackground } from '@/components/ui/stars-background';
import { GlowingEffect } from '@/components/ui/glowing-effect';

// ────────────────────────────────────────────────
export const revalidate = 300; // ISR: revalidate every 5 minutes

export default async function Home() {
  // Server-side data fetching
  const client = createClient();

  let posts: any[] = [];
  try {
    posts = await client.getAllByType('blog_post', {
      pageSize: 6,
      orderings: [
        { field: 'my.blog_post.publication_date', direction: 'desc' },
        { field: 'first_publication_date', direction: 'desc' },
      ],
      fetch: [
        'blog_post.title',
        'blog_post.excerpt',
        'blog_post.publication_date',
        'blog_post.category',
        'blog_post.featured_image',
      ],
    });
  } catch (err) {
    console.error('Failed to fetch posts for homepage:', err);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Full-screen starry background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <StarsBackground
          className="absolute inset-0 z-0"
          starDensity={0.001}
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
      </div>

      {/* Optional subtle overlay to improve text contrast */}
      <div className="fixed inset-0 bg-black/40 z-0 pointer-events-none" />

      {/* Main content – higher z-index */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Hero */}
        <section className="flex-grow flex items-center justify-center py-48 px-6">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-lg">
              Unveiling the Hidden Truths
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl text-white/85 mb-12 max-w-4xl mx-auto">
              Explore UFO sightings, government cover-ups, ancient mysteries, and the secrets they don’t want you to know.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center px-10 py-5 text-xl font-semibold bg-white text-black rounded-full hover:bg-white/90 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                Explore Latest Revelations
              </Link>

            </div>
          </div>
        </section>

        {/* Recent Posts Grid */}
        <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12 tracking-wide">
            Recent Revelations
          </h2>

          {posts.length === 0 ? (
            <p className="text-center text-white/70 text-xl py-12">
              No disclosures yet… checking the skies…
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div key={post.id} className="relative h-full">
                  <GlowingEffect
                    spread={40}
                    blur={1.2}
                    borderWidth={2.5}
                    variant="default"
                    glow={false}
                    disabled={false}
                    inactiveZone={0.55}
                    proximity={50}
                  />
                  <div className="group bg-gradient-to-b from-black/60 to-black/80 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 shadow-2xl hover:shadow-purple-900/30 h-full flex flex-col relative z-10">
                    {/* Image */}
                    {post.data.featured_image?.url ? (
                      <PrismicNextImage
                        field={post.data.featured_image}
                        className="w-full h-52 object-cover"
                        imgixParams={{ auto: ['compress', 'format'], fit: 'crop', ar: '16:9' }}
                        fallbackAlt=""
                      />
                    ) : (
                      <div className="h-52 bg-gradient-to-br from-purple-950/70 to-indigo-950/70 flex items-center justify-center">
                        <span className="text-7xl opacity-40">🛸</span>
                      </div>
                    )}

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center text-sm text-white/60 mb-3">
                        <time>
                          {new Date(
                            post.data.publication_date || post.first_publication_date
                          ).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </time>
                        <span className="mx-3">•</span>
                        <span>{post.data.category || 'Mystery'}</span>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors line-clamp-2">
                        <PrismicText field={post.data.title} />
                      </h3>

                      <p className="text-white/75 mb-6 line-clamp-3 flex-grow">
                        <PrismicText field={post.data.excerpt} />
                      </p>

                      <Link
                        href={`/blog/${post.uid}`}
                        className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium mt-auto"
                      >
                        Read Disclosure →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {posts.length === 6 && (
            <div className="mt-16 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center px-10 py-5 text-lg font-medium text-white border-2 border-purple-500/50 hover:bg-purple-900/30 rounded-full transition-all duration-300 hover:border-purple-400"
              >
                View All Revelations →
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}