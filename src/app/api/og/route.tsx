import { Artist, Track } from "@spotify/web-api-ts-sdk";
import { ImageResponse } from "next/og";

// Tell the server we want to run this code on the Edge runtime
export const runtime = "edge";

export async function POST(request: Request) {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const body = await request.json();
  const { topArtists, topTracks } = body;

  // Generate a table for the artists
  const artistTable = topArtists?.map((artist: Artist, index: number) => {
    return (
      <>
        <li key={"artist " + artist.id} tw="h-[50px] flex items-center gap-4">
          <span>{index + 1}</span>
          <div tw="w-[50px] h-[50px] mask inline-block rounded-[50%] overflow-hidden ">
            <img
              tw="max-w-[100%]"
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
  const trackTable = topTracks?.map((track: Track, index: number) => {
    return (
      <>
        <li key={"track " + track.id} tw="h-[50px] flex items-center gap-4">
          <span>{index + 1}</span>
          <div tw="flex flex-col">
            <span>{track.name}</span>
            <span tw="opacity-80 text-xs">{track.artists[0].name}</span>
          </div>
        </li>
      </>
    );
  });

  console.log("artistTable", artistTable);

  try {
    return new ImageResponse(
      (
        <div>hello world</div>
      )
    );
  } catch (e: any) {
    return new Response("Failed to generate image.", { status: 500 });
  }
}
