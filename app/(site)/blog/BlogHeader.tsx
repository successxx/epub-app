import Link from "next/link";

const slugs = Array.from({ length: 20 }).map((_, i) => `lead-magnet-${i + 1}`);

export default function BlogHeader({ current }: { current: string }) {
  const index = slugs.indexOf(current);
  const prev = index > 0 ? slugs[index - 1] : null;
  const next = index < slugs.length - 1 ? slugs[index + 1] : null;
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <div className="flex gap-2">
        <Link href="/blog" className="underline">All posts</Link>
      </div>
      <div className="flex gap-2">
        {prev ? (
          <Link href={`/blog/${prev}`} className="rounded-full border border-foreground/15 px-3 py-1 hover:border-foreground/30">Prev</Link>
        ) : (
          <span className="opacity-40">Prev</span>
        )}
        {next ? (
          <Link href={`/blog/${next}`} className="rounded-full border border-foreground/15 px-3 py-1 hover:border-foreground/30">Next</Link>
        ) : (
          <span className="opacity-40">Next</span>
        )}
      </div>
    </div>
  );
}


