import type { SourceConfig } from "@/lib/types";

/**
 * Configure your AI news sources here.
 *
 * To find a YouTube channel ID:
 * 1. Go to the channel page
 * 2. View page source (Ctrl+U)
 * 3. Search for "channel_id" or "externalId"
 *
 * Or use: https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID
 */
export const sources: SourceConfig[] = [
  {
    id: "nate-b-jones",
    name: "Nate B Jones",
    type: "youtube",
    url: "https://youtube.com/@natebjones",
    channelId: "UCojFMaYKMfVZYaxPRBbHNuQ",
    maxItems: 3,
    tags: ["ai-tools", "design", "workflows"],
  },
  {
    id: "fireship",
    name: "Fireship",
    type: "youtube",
    url: "https://youtube.com/@Fireship",
    channelId: "UCsBjURrPoezykLs9EqgamOA",
    maxItems: 3,
    tags: ["web-dev", "ai", "tutorials"],
  },
  {
    id: "matt-wolfe",
    name: "Matt Wolfe",
    type: "youtube",
    url: "https://youtube.com/@maboroshi",
    channelId: "UCJMQEDAiEFOCEIaNmKvmSWg",
    maxItems: 3,
    tags: ["ai-news", "tools", "weekly-roundup"],
  },
];
