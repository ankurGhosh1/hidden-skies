// src/app/blog/[uid]/page.tsx
import Image from "next/image";
import { createClient } from "@/prismicio";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { TracingBeam } from "@/components/ui/tracing-beam";

export async function generateStaticParams() {
  const client = createClient();
  const posts = await client.getAllByType("blog_post", {
    // optional: limit fields if you want faster builds
    fetch: ["blog_post.title", "blog_post.uid"],
  });

  return posts.map((post) => ({
    uid: post.uid,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ uid: string }> }) {
  const { uid } = await params;
  const client = createClient();

  const post = await client.getByUID("blog_post", uid, {});

  if (!post) {
    return <div className="py-32 text-center text-white text-3xl">Post not found</div>;
  }

  return (
    <article className="relative z-10 py-32 px-6 max-w-4xl mx-auto prose prose-invert prose-headings:text-white prose-p:text-white/90">
      {post.data.featured_image?.url && (
        <PrismicNextImage
          field={post.data.featured_image}
          className="w-full h-64 object-cover rounded-xl mb-10 shadow-2xl"
          imgixParams={{ auto: ["compress", "format"] }}
        />
      )}

      <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
        <PrismicText field={post.data.title} />
      </h1>

      <p className="text-white/60 mb-12 text-lg">
        {new Date(post.first_publication_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>


      <div className="prose prose-invert max-w-none">
        <PrismicRichText
          field={post.data.content}
          components={{

            paragraph: ({ children, key }) => (
              <p key={key} className="text-white/90 leading-relaxed mb-6 text-lg">
                {children}
              </p>
            ),
            // H2 – larger, bolder, accent color, more top margin
            heading2: ({ children, key }) => (
              <h2 key={key} className="text-3xl md:text-4xl font-bold text-purple-300 mt-12 mb-6 tracking-tight">
                {children}
              </h2>
            ),

            heading3: ({ children, key }) => (
              <h3 key={key} className="text-2xl md:text-3xl font-semibold text-purple-400 mt-10 mb-4">
                {children}
              </h3>
            ),

            strong: ({ children, key }) => (
              <strong key={key} className="text-white font-semibold">
                {children}
              </strong>
            ),

            hyperlink: ({ children, key, node }) => (
              <a
                key={key}
                href={node.data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors"
              >
                {children}
              </a>
            ),
            image: ({ node }) => (
              <div className="my-12">
                <PrismicNextImage
                  field={node}
                  className="w-full h-auto rounded-xl shadow-2xl"
                  imgixParams={{ auto: ["compress", "format"] }}
                />
              </div>
            )
          }}
        />
      </div>

      {/* <SliceZone slices={post.data.content} components={components} /> */}
      <div>

        <p className="text-2xl font-bold text-white mb-3 mt-12">About the Author</p>
        <div className="flex items-start gap-4">
          <Image src="/ascension.jpg" alt="Aritra Kumar Sinha" width={40} height={40} className="rounded-full mt-2" />
          <div>
            <p className="text-white/60 text-lg">Aritra Kumar Sinha</p>
            <p className="text-white/60 mb-12 text-lg">Believes some UFOs are of non-human origin and that the U.S. government is suppressing this information. </p>
          </div>
        </div>
      </div>
    </article>
  );
}