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
        <div tw="relative gap-8 flex flex-col border-2 border-neutral-700 rounded-xl p-12">
          {/* Header */}
          <div tw="flex items-center gap-4">
            <div>
              <img width={80} height={80} src="/splist-logo.png" alt="splist logo" />
            </div>

            <div tw="flex flex-col gap-2">
              <div tw="text-3xl md:text-4xl">Splist</div>
              <div>https://splist.com</div>
            </div>
          </div>
          {/* Date information */}
          <div tw="text-xl opacity-80">
            Past four weeks as of {month}/{day}/{year}
          </div>
          {/* Table */}
          <div tw="flex gap-8">
            <div tw="flex flex-col gap-4">
              <h3 tw="opacity-80 text-lg">Top Artists</h3>
              <ol key={"artistTable"} tw="flex flex-col gap-4">
                {artistTable}
              </ol>
            </div>
            <div tw="flex flex-col gap-4">
              <h3 tw="opacity-80 text-lg">Top Songs</h3>
              <ol key={"trackTable"} tw="flex flex-col gap-4 ">
                {trackTable}
              </ol>
            </div>
          </div>
        </div>
      )
    );
  } catch (e: any) {
    return new Response("Failed to generate image.", { status: 500 });
  }
}
