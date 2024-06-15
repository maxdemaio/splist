"use client";

import sdk from "@/lib/spotify-sdk/ClientInstance";
import { createOgImage } from "@/lib/og-util";
import { Artist, Page, Track } from "@spotify/web-api-ts-sdk";
import { useEffect, useState } from "react";

async function fetchAllTracks() {
  const topArtists: Page<Artist> = await sdk.currentUser.topItems("artists", "short_term", 5);
  const topTracks: Page<Track> = await sdk.currentUser.topItems("tracks", "short_term", 5);

  return { topArtists, topTracks };
}

const Preview = ({ isProd }: { isProd: boolean }) => {
  const [spotifyData, setSpotifyData] = useState<{
    topArtists: Page<Artist>;
    topTracks: Page<Track>;
  }>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const dateTime = Date.now();

  // FETCH data once the component is mounted
  useEffect(() => {
    if (isProd) return;

    (async () => {
      setSpotifyData(await fetchAllTracks());
    })();
  }, []);

  // if date changed generate a new base64 url image
  useEffect(() => {
    (async () => {
      if (isProd) return;
      if (!spotifyData) return;

      const previewImageUrl = await createOgImage({
        topTracks: spotifyData.topTracks,
        topArtists: spotifyData.topArtists,
        timeFrame: "short_term",
      });

      if (previewImageUrl) {
        setImageUrl(previewImageUrl);
      }
    })();
  }, [dateTime]);
    
  if (isProd) return <div>this for dev bro, GTFO</div>

  return (
    <div>
      <div suppressHydrationWarning className="hidden">
        {dateTime}
      </div>
      <h2 className="text-2xl">Preview of the dynamic image</h2>
      {!imageUrl ? <p>Loading...</p> : <img src={imageUrl} alt="Preview" />}
    </div>
  );
};

export default Preview;
