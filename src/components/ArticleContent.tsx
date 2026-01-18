// Create src/components/ArticleContent.tsx
'use client';

import { TracingBeam } from "@/components/ui/tracing-beam";

export function ArticleContent({ children }: { children: React.ReactNode }) {
  return (
    <TracingBeam className="prose prose-invert max-w-none">
      {children}
    </TracingBeam>
  );
}