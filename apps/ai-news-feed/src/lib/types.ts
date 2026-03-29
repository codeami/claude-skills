export interface SourceConfig {
  id: string;
  name: string;
  type: "youtube";
  url: string;
  channelId: string;
  maxItems: number;
  tags?: string[];
}

export interface FeedItem {
  id: string;
  sourceId: string;
  sourceName: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  videoUrl: string;
  transcriptUrl: string;
  notebookLmUrl: string;
  toolsMentioned: string[];
}
