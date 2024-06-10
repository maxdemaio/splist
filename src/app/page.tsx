"use client";

import {
  Artist,
  Page,
  SearchResults,
  SpotifyApi,
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
    <main>
      <Navbar showSignOut userName={session.data.user?.name} />
      <div className="p-8">
        <SpotifySearch sdk={sdk} />
      </div>
    </main>
  );
}

function SpotifySearch({ sdk }: { sdk: SpotifyApi }) {
  const [topArtists, setTopArtists] = useState<Page<Artist>>(
    {} as Page<Artist>
  );

  useEffect(() => {
    (async () => {
      // TODO: parallel requests for short, medium, and long term top artists
      const topArtists: Page<Artist> = await sdk.currentUser.topItems(
        "artists",
        "short_term"
      );
      setTopArtists(() => topArtists);
      console.log(topArtists);
    })();
  }, [sdk]);

  // generate a table for the results
  const tableRows = topArtists?.items?.map((artist, index) => {
    return (
      <TableRow key={artist.id}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>
          <img
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

  return (
    <>
      <h2 className="text-4xl">4 weeks</h2>
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

      <h2 className="text-4xl">6 months</h2>
    </>
  );
}
