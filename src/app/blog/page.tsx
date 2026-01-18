import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import Link from "next/link";
import { GlowingEffect } from "../../components/ui/glowing-effect";
import { PrismicText } from "@prismicio/react";

export const revalidate = 300;

export default async function BlogPage() {
  const client = createClient();
  const posts = await client.getAllByType("blog_post", {
    orderings: [
      { field: "my.blog_post.publication_date", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
    lang: "*",
  });
  return (
    <section className="relative z-10 py-16 md:py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12 tracking-wide">
        Recent Revelations
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="relative h-full rounded-xl">
            <GlowingEffect variant="default" blur={1} spread={30} borderWidth={2} />
            <div className="group bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-transparent transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 h-full relative z-10">
              {post.data.featured_image?.url && (
                <PrismicNextImage
                  field={post.data.featured_image}
                  className="h-48 w-full object-cover"
                  fallback="Featured image"
                />
              )}

              <div className="p-6">
                <div className="flex items-center text-sm text-white/60 mb-3">
                  <span>{new Date(post.data.publication_date || post.first_publication_date).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>{post.data.category || "UFO"}</span>
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-purple-300 transition-colors">
                  <PrismicText field={post.data.title} />
                </h3>

                <p className="text-white/70 mb-6 line-clamp-3">
                  <PrismicText field={post.data.content} />
                </p>

                <Link
                  href={`/blog/${post.uid}`}
                  className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium"
                >
                  Read the Full Disclosure →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}