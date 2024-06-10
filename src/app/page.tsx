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

export default function Home() {
  const session = useSession();

  if (!session || session.status !== "authenticated") {
    return (
      <main className="flex p-24 justify-center">
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
      </main>
    );
  }

  return (
    <div>
      <p>Logged in as {session.data.user?.name}</p>
      <button onClick={() => signOut()}>Sign out</button>
      <SpotifySearch sdk={sdk} />
    </div>
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
      <tr key={artist.id}>
        <td>{index + 1}</td>
        <td>
          <img
            height={artist.images[2].height}
            width={artist.images[2].width}
            src={artist.images[2].url}
            alt={artist.name + " image"}
          />
        </td>
        <td>{artist.name}</td>
      </tr>
    );
  });

  return (
    <>
      <h1>Top Spotify Artists</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </>
  );
}
