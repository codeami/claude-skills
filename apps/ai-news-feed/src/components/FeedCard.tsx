import type { FeedItem } from "@/lib/types";
import TranscriptLink from "./TranscriptLink";

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

export default function FeedCard({ item }: { item: FeedItem }) {
  const descriptionLines = item.description
    .split("\n")
    .filter((l) => l.trim())
    .slice(0, 3)
    .join(" ");
  const truncated =
    descriptionLines.length > 200
      ? descriptionLines.slice(0, 200) + "..."
      : descriptionLines;

  return (
    <article className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 transition-all hover:border-zinc-700 hover:bg-zinc-900">
      <a
        href={item.videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            src={item.thumbnailUrl}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <span className="rounded-md bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
              YouTube
            </span>
            <span className="text-xs text-zinc-300">
              {timeAgo(item.publishedAt)}
            </span>
          </div>
        </div>
      </a>

      <div className="p-4 space-y-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-blue-400">
            {item.sourceName}
          </p>
          <a
            href={item.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block text-lg font-semibold leading-snug text-white hover:text-blue-400 transition-colors"
          >
            {item.title}
          </a>
        </div>

        {truncated && (
          <p className="text-sm leading-relaxed text-zinc-400">{truncated}</p>
        )}

        {item.toolsMentioned.length > 0 && (
          <div>
            <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-zinc-500">
              Tools & Practices
            </p>
            <div className="flex flex-wrap gap-1.5">
              {item.toolsMentioned.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs font-medium text-emerald-400 border border-zinc-700"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-zinc-800">
          <TranscriptLink
            transcriptUrl={item.transcriptUrl}
            notebookLmUrl={item.notebookLmUrl}
          />
        </div>
      </div>
    </article>
  );
}
