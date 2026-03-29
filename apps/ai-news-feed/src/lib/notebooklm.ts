export function getNotebookLmUrl(): string {
  return "https://notebooklm.google.com/";
}

export function getTranscriptUrl(videoId: string): string {
  return `https://youtubetranscript.com/?v=${videoId}`;
}

export function getYouTubeVideoUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}
