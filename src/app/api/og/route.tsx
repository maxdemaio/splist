import { Artist, Track } from "@spotify/web-api-ts-sdk";
import { ImageResponse } from "next/og";

// Tell the server we want to run this code on the Edge runtime
export const runtime = "edge";

export async function POST(request: Request) {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const HOST =
    process.env.NODE_ENV === "production"
      ? "https://splist-lac.vercel.app"
      : "http://localhost:3000";

  const body = await request.json();
  const { topArtists, topTracks } = body;

  // Generate a table for the artists
  const artistTable = topArtists?.map((artist: Artist, index: number) => {
    return (
      <li
        key={"artist " + artist.id}
        style={{ gap: "16px" }}
        tw="h-[50px] max-w-[270px] flex items-center"
      >
        <span>{index + 1}</span>
        <div
          style={{ overflow: "hidden", borderRadius: "50%" }}
          tw="flex justify-center items-center w-[50px] h-[50px]"
        >
          <img width={50} src={artist.images[2].url} alt={artist.name + " image"} />
        </div>

        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          tw="max-w-[167px]"
        >
          {artist.name}
        </span>
      </li>
    );
  });

  // Generate a table for the artists
  const trackTable = topTracks?.map((track: Track, index: number) => {
    return (
      <li
        key={"track " + track.id}
        style={{ gap: "16px" }}
        tw="h-[50px] max-w-[270px] flex items-center"
      >
        <span>{index + 1}</span>
        <div tw="flex flex-col">
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            tw=" max-w-[270px]"
          >
            {track.name}
          </span>
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            tw="opacity-80 text-xs max-w-[270px]"
          >
            {track.artists[0].name}
          </span>
        </div>
      </li>
    );
  });

  console.log("artistTable", artistTable);

  try {
    return new ImageResponse(
      (
        <div
          style={{
            gap: "32px",
            backgroundColor: "rgb(10, 10, 10)",
          }}
          tw="text-white h-full relative flex flex-col rounded-xl p-12"
        >
          {/* Header */}
          <div
            style={{
              gap: "16px",
            }}
            tw="flex items-center"
          >
            <img
              style={{ width: "80px", height: "80px" }}
              src={`${HOST}/splist-logo.png`}
              alt="splist logo"
            />

            <div
              style={{
                gap: "8px",
              }}
              tw="flex flex-col"
            >
              <div tw="text-3xl md:text-4xl">Splist</div>
              <div>https://splist-lac.vercel.app/</div>
            </div>
          </div>
          {/* Date information */}
          <div tw="flex text-xl opacity-80">
            Past four weeks as of {month}/{day}/{year}
          </div>
          {/* Table */}
          <div style={{ gap: "32px" }} tw="flex">
            <div style={{ gap: "8px" }} tw="flex flex-col">
              <h3 tw="opacity-80 text-lg">Top Artists</h3>
              <ol key={"artistTable"} style={{ gap: "16px" }} tw="flex flex-col">
                {artistTable}
              </ol>
            </div>
            <div style={{ gap: "8px" }} tw="flex flex-col">
              <h3 tw="opacity-80 text-lg">Top Songs</h3>
              <ol key={"trackTable"} style={{ gap: "16px" }} tw="flex flex-col ">
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
