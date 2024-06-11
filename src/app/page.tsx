"use client";

import { Artist, Page, SpotifyApi, Track } from "@spotify/web-api-ts-sdk"; // use "@spotify/web-api-ts-sdk" in your own project
import sdk from "@/lib/spotify-sdk/ClientInstance";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/ui/navbar";
import { CopyButton } from "@/components/ui/copy-button";

export default function Home() {
  const session = useSession();

  if (!session || session.status !== "authenticated") {
    return (
      <main className="flex flex-col gap-8 p-6 md:p-12">
        <Navbar />
        <div className="flex p-24 justify-center">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Spotify Web API Typescript SDK in Next.js</CardTitle>
              <CardDescription>
                Share your top artists and tracks with your friends!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <button
                  className="border border-foreground p-4 rounded"
                  onClick={() => signIn("spotify")}
                >
                  Sign in with Spotify
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    // gap-8 same as mobi navbar gap
    <main className="flex flex-col gap-8 p-6 md:p-12 md:gap-12">
      <Navbar
        showSignOut
        userName={session.data.user?.name}
        userImage={session.data.user?.image}
      />
      <SpotifySearch sdk={sdk} />
    </main>
  );
}

function SpotifySearch({ sdk }: { sdk: SpotifyApi }) {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const limit = 5;

  const [topArtists, setTopArtists] = useState<Page<Artist>>(
    {} as Page<Artist>
  );

  const [topTracks, setTopTracks] = useState<Page<Track>>({} as Page<Track>);

  useEffect(() => {
    (async () => {
      // For now, just short term top artists
      // TODO: make these requests in parallel

      const topArtists: Page<Artist> = await sdk.currentUser.topItems(
        "artists",
        "short_term",
        limit
      );
      setTopArtists(() => topArtists);

      const topTracks: Page<Track> = await sdk.currentUser.topItems(
        "tracks",
        "short_term",
        limit
      );

      setTopTracks(() => topTracks);
    })();
  }, [sdk]);

  // Generate a table for the artists
  const artistTable = topArtists?.items?.map((artist, index) => {
    return (
      <>
        <li key={artist.id} className="flex items-center gap-4">
          <span>{index + 1}</span>
          <div className="w-[50px] h-[50px] mask inline-block rounded-[50%] overflow-hidden ">
            <img
              className="max-w-[100%]"
              height={artist.images[2].height}
              width={artist.images[2].width}
              src={artist.images[2].url}
              alt={artist.name + " image"}
            />
          </div>

          <span>{artist.name}</span>
        </li>
      </>
    );
  });

  // Generate a table for the artists
  const trackTable = topTracks?.items?.map((track, index) => {
    return (
      <>
        <li key={track.id} className="flex items-center gap-4">
          <span>{index + 1}</span>
          <span>{track.name}</span>
        </li>
      </>
    );
  });

  const artistsTracksTable = [];

  if (
    artistTable &&
    trackTable &&
    artistTable.length === limit &&
    trackTable.length === limit
  ) {
    let artistI = 0;
    let trackI = 0;
    for (let i = 0; i < limit * 2; i++) {
      if (i % 2 === 0) {
        artistsTracksTable.push(artistTable[artistI++]);
      } else {
        artistsTracksTable.push(trackTable[trackI++]);
      }
    }
  }

  return (
    <>
      <section className="mx-auto">
        <div
          id="split-card"
          className="relative gap-8 flex flex-col border-2 border-neutral-700 rounded-xl p-12"
          aria-label="Splist Card"
        >
          <CopyButton className="absolute top-6 right-6">
            Copy to Clipboard
          </CopyButton>

          {/* Header */}
          <div className="flex gap-4">
            <div>
              <img
                width={80}
                height={80}
                src="/splist-logo.png"
                alt="splist logo"
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-3xl md:text-4xl">Splist</div>
              <div>splist.com</div>
            </div>
          </div>
          {/* Date information */}
          <div className="text-xl opacity-80">
            Past four weeks as of {month}/{day}/{year}
          </div>
          {/* Table */}
          <ol className="grid grid-cols-2 gap-x-8 gap-y-4">
            {artistsTracksTable}
          </ol>
        </div>
      </section>
    </>
  );
}
