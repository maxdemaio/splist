"use client";

import {
  Artist,
  Page,
  SearchResults,
  SpotifyApi,
  UserProfile,
} from "@spotify/web-api-ts-sdk"; // use "@spotify/web-api-ts-sdk" in your own project
import sdk from "@/lib/spotify-sdk/ClientInstance";
import { useSession, signOut, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Navbar from "@/components/ui/navbar";
import { CopyButton } from "@/components/ui/copy-button";

export default function Home() {
  const session = useSession();

  if (!session || session.status !== "authenticated") {
    return (
      <main>
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
    <main className="flex flex-col gap-8 p-6 md:p-12">
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
  const [topArtists, setTopArtists] = useState<Page<Artist>>(
    {} as Page<Artist>
  );

  useEffect(() => {
    (async () => {
      // TODO: make these requests in parallel

      // For now, just short term top artists
      const topArtists: Page<Artist> = await sdk.currentUser.topItems(
        "artists",
        "short_term"
      );
      setTopArtists(() => topArtists);
    })();
  }, [sdk]);

  // generate a table for the artists
  const artistTableRows = topArtists?.items?.map((artist, index) => {
    return (
      <>
        <li key={artist.id} className="flex gap-4">
          <span>{index + 1}</span>
          <img
            className=""
            height={artist.images[2].height}
            width={artist.images[2].width}
            src={artist.images[2].url}
            alt={artist.name + " image"}
          />
          <span>{artist.name}</span>
        </li>
      </>
    );
  });

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  return (
    <>
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl">
          Past four weeks as of {month}/{day}/{year}
        </h2>
        <div>
          <CopyButton className="flex-shrink-0">Copy to Clipboard</CopyButton>
        </div>
      </div>

      <section>
        <div
          className="gap-8 flex flex-col border border-neutral-800 rounded-lg p-8"
          aria-label="Splist Card"
        >
          {/* Header */}
          <div className="flex gap-4">
            <div>image</div>
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
          <div className="flex gap-12">
            <ol>
              {artistTableRows}
            </ol>
            <ol>
              <li>example song</li>
              <li>example song</li>
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
