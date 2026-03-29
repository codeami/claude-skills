import { sources } from "@/config/sources";
import { fetchAllFeeds } from "@/lib/youtube";
import SourceFilter from "@/components/SourceFilter";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // ISR: rebuild every hour

export default async function HomePage() {
  let items: Awaited<ReturnType<typeof fetchAllFeeds>> = [];
  try {
    items = await fetchAllFeeds(sources);
  } catch {
    // Feed fetch failed - show empty state
  }
  const sourceNames = [...new Set(sources.map((s) => s.name))];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Latest Updates</h2>
        <p className="mt-1 text-sm text-zinc-500">
          {items.length} items from {sources.length} sources &mdash; refreshed
          hourly
        </p>
      </div>
      <SourceFilter items={items} sourceNames={sourceNames} />
    </div>
  );
}
