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
import { Button } from "@/components/ui/button";
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
      <Navbar showSignOut userName={session.data.user?.name} userImage={session.data.user?.image} />
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

  // generate a table for the results
  const tableRows = topArtists?.items?.map((artist, index) => {
    return (
      <TableRow key={artist.id}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>
          <img
            className="rounded"
            height={artist.images[2].height}
            width={artist.images[2].width}
            src={artist.images[2].url}
            alt={artist.name + " image"}
          />
        </TableCell>
        <TableCell>{artist.name}</TableCell>
      </TableRow>
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

      <div className="h-[500px] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">#</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{tableRows}</TableBody>
        </Table>
      </div>
    </>
  );
}
