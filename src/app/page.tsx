"use client";

import { Artist, Page, SpotifyApi, Track } from "@spotify/web-api-ts-sdk"; // use "@spotify/web-api-ts-sdk" in your own project

import sdk from "@/lib/spotify-sdk/ClientInstance";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/ui/navbar";
import { CopyButton } from "@/components/ui/copy-button";
// TODO: add later
import Image from "next/image";
import { ImageResponse } from "next/og";
import SignIn from "@/components/SignIn";

export default function Home() {
  const session = useSession();

  if (!session || session.status !== "authenticated") {
    return <SignIn />;
  }

  return (
    // gap-8 same as mobi navbar gap
    <main className="flex flex-col gap-8 p-6 md:p-12 md:gap-12">
      <Navbar showSignOut userName={session.data.user?.name} userImage={session.data.user?.image} />
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

  const [topArtists, setTopArtists] = useState<Page<Artist>>({} as Page<Artist>);

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

      const topTracks: Page<Track> = await sdk.currentUser.topItems("tracks", "short_term", limit);

      setTopTracks(() => topTracks);
    })();
  }, [sdk]);

  // Generate a table for the artists
  const artistTable = topArtists?.items?.map((artist, index) => {
    return (
      <>
        <li key={"artist " + artist.id} className="h-[50px] flex items-center gap-4">
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
        <li key={"track " + track.id} className="h-[50px] flex items-center gap-4">
          <span>{index + 1}</span>
          <div className="flex flex-col">
            <span>{track.name}</span>
            <span className="opacity-80 text-xs">{track.artists[0].name}</span>
          </div>
        </li>
      </>
    );
  });

  // Generate image on copy
  async function getAndCopyImage() {
    const splistCard: HTMLDivElement = document
      .getElementById("splist-card")
      ?.cloneNode(true) as HTMLDivElement;

    const copyButton = splistCard.querySelector("#copy-button");
    if (copyButton) {
      copyButton.parentNode?.removeChild(copyButton);
    }

    console.log("splist Card", splistCard);

    fetch("/api/og", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        html: splistCard.outerHTML,
        topArtists: topArtists.items,
        topTracks: topTracks.items,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          // TODO: Show a toast that the image was copied
          const blob = await res.blob();
          await navigator.clipboard.write([
            new ClipboardItem({
              [blob.type]: blob,
            }),
          ]);
          
        }
      })
      .catch((err) => {
        console.error(err);
        // TODO: Show a toast that something went wrong
      });
  }

  return (
    <>
      <section className="mx-auto">
        <div
          id="splist-card"
          className="relative gap-8 flex flex-col border-2 border-neutral-700 rounded-xl p-12"
          aria-label="Splist Card"
        >
          <CopyButton id="copy-button" className="absolute top-6 right-6" onClick={getAndCopyImage}>
            Copy to Clipboard
          </CopyButton>

          {/* Header */}
          <div className="flex items-center gap-4">
            <div>
              <img width={80} height={80} src="/splist-logo.png" alt="splist logo" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-3xl md:text-4xl">Splist</div>
              <div>https://splist.com</div>
            </div>
          </div>
          {/* Date information */}
          <div className="text-xl opacity-80">
            Past four weeks as of {month}/{day}/{year}
          </div>
          {/* Table */}
          <div className="flex gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="opacity-80 text-lg">Top Artists</h3>
              <ol key={"artistTable"} className="flex flex-col gap-4">
                {artistTable}
              </ol>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="opacity-80 text-lg">Top Songs</h3>
              <ol key={"trackTable"} className="flex flex-col gap-4 ">
                {trackTable}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
