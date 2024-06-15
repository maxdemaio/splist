import { allTimeFrames } from "@/constants";
import { Artist, Page, Track } from "@spotify/web-api-ts-sdk";
import { SearchTerm } from "./utils";

// Generate image on copy
export async function createOgImage(input: {
  topArtists: Page<Artist>;
  topTracks: Page<Track>;
  timeFrame: SearchTerm;
}) {
  const res = await fetch("/api/og", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topArtists: input.topArtists.items,
      topTracks: input.topTracks.items,
      timeFrame: allTimeFrames[input.timeFrame],
    }),
  });

  if (res.ok) {
    const blob = await res.blob();

    // turn blob into base64 image url
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise<string>((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
    });
  }
}
