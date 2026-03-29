import { XMLParser } from "fast-xml-parser";
import type { SourceConfig, FeedItem } from "@/lib/types";
import {
  getTranscriptUrl,
  getYouTubeVideoUrl,
  getNotebookLmUrl,
} from "@/lib/notebooklm";

const KNOWN_TOOLS: string[] = [
  "ChatGPT", "GPT-4", "GPT-4o", "GPT-5", "OpenAI",
  "Claude", "Anthropic",
  "Gemini", "Google AI", "Google Stitch", "NotebookLM",
  "Copilot", "GitHub Copilot",
  "Cursor", "Windsurf", "Cody",
  "v0", "Bolt", "Replit", "Lovable",
  "LangChain", "LangGraph", "LlamaIndex",
  "Ollama", "Hugging Face", "Mistral", "Llama",
  "Midjourney", "Stable Diffusion", "DALL-E", "Flux", "Ideogram",
  "Suno", "ElevenLabs", "Descript",
  "Perplexity", "SearchGPT",
  "Vercel", "Next.js", "Supabase",
  "MCP", "Model Context Protocol",
  "RAG", "fine-tuning", "prompt engineering",
  "ComfyUI", "Automatic1111", "WebUI",
  "Sora", "Runway", "Pika", "Kling",
  "Devin", "Cline", "Aider",
  "Blender MCP", "Figma", "Framer",
];

function extractTools(text: string): string[] {
  const found = new Set<string>();
  const lower = text.toLowerCase();
  for (const tool of KNOWN_TOOLS) {
    if (lower.includes(tool.toLowerCase())) {
      found.add(tool);
    }
  }
  return Array.from(found);
}

export async function fetchYouTubeFeed(
  source: SourceConfig
): Promise<FeedItem[]> {
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${source.channelId}`;

  const response = await fetch(feedUrl, { next: { revalidate: 3600 } });
  if (!response.ok) {
    console.error(`Failed to fetch feed for ${source.name}: ${response.status}`);
    return [];
  }

  const xml = await response.text();
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
  });
  const parsed = parser.parse(xml);

  const entries = parsed?.feed?.entry;
  if (!entries) return [];

  const entryList = Array.isArray(entries) ? entries : [entries];

  return entryList.slice(0, source.maxItems).map((entry) => {
    const videoId = entry["yt:videoId"];
    const title = entry.title || "";
    const description =
      entry["media:group"]?.["media:description"] || "";
    const thumbnailUrl =
      entry["media:group"]?.["media:thumbnail"]?.["@_url"] ||
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    return {
      id: videoId,
      sourceId: source.id,
      sourceName: source.name,
      title,
      description,
      publishedAt: entry.published || "",
      thumbnailUrl,
      videoUrl: getYouTubeVideoUrl(videoId),
      transcriptUrl: getTranscriptUrl(videoId),
      notebookLmUrl: getNotebookLmUrl(),
      toolsMentioned: extractTools(`${title} ${description}`),
    };
  });
}

export async function fetchAllFeeds(
  sources: SourceConfig[]
): Promise<FeedItem[]> {
  const results = await Promise.all(sources.map(fetchYouTubeFeed));
  const items = results.flat();
  items.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  return items;
}
