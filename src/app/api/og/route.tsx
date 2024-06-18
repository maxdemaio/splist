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
    process.env.NODE_ENV === "production" ? "https://splist.fm" : "http://localhost:3000";

  const body = await request.json();
  const { topArtists, topTracks, timeFrame } = body;

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
            lineClamp: 2,
            display: "block",
            width: "167px",
          }}
          tw="w-[167px]"
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
        tw="h-[50px] w-[270px] flex items-center"
      >
        <span>{index + 1}</span>
        <div tw="flex flex-col">
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "167px",
            }}
          >
            {track.name}
          </span>
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            tw="opacity-80 text-xs max-w-[167px]"
          >
            {track.artists[0].name}
          </span>
        </div>
      </li>
    );
  });

  try {
    return new ImageResponse(
      (
        <div
          style={{
            gap: "32px",
            backgroundColor: "rgb(10, 10, 10)",
          }}
          tw="relative text-white h-full flex flex-col p-12"
        >
          <div tw="w-full flex justify-center items-center absolute bottom-8 opacity-80">
            <span>https://splist.fm</span>
          </div>
          {/* Header */}
          <div
            style={{
              gap: "16px",
            }}
            tw="flex items-center"
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 6C0 2.68629 2.68629 0 6 0H74C77.3137 0 80 2.68629 80 6V74C80 77.3137 77.3137 80 74 80H6C2.68629 80 0 77.3137 0 74V6Z"
                fill="#171717"
              />
              <path
                d="M28.62 39.39C32.42 42.3 35.78 45.8 40.08 48.03C46.3 51.26 54.23 51.44 60.61 48.5C57.13 47.57 52.98 47.24 49.83 45.29C45.5 42.6 44.23 39.16 40.01 36.34C36.95 34.3 33.27 33.14 29.52 32.89C26.98 32.72 20.95 32.95 17.24 34.46C21.62 35.21 25.16 36.73 28.62 39.39Z"
                fill="url(#paint0_linear_66_319)"
              />
              <path
                opacity="0.33"
                d="M20.05 47.09L44.18 59.93L74.99 32.79L20.99 8.34998L20.05 47.09Z"
                fill="url(#paint1_linear_66_319)"
              />
              <path
                d="M24.7501 51.25C27.9901 53.73 30.8501 56.71 34.5201 58.62C39.8201 61.37 46.5701 61.53 52.0101 59.02C49.0501 58.23 45.5101 57.95 42.8301 56.29C39.1401 54 38.0601 51.07 34.4601 48.66C31.8601 46.92 28.7101 45.93 25.5301 45.72C23.3701 45.58 18.2301 45.77 15.0601 47.06C18.7901 47.7 21.8001 49 24.7601 51.26L24.7501 51.25Z"
                fill="#CEF2D0"
              />
              <path
                d="M33.3801 24.42C37.8301 27.83 41.76 31.92 46.8 34.54C54.08 38.32 63.3601 38.54 70.8301 35.09C66.7601 34 61.9 33.62 58.21 31.33C53.14 28.18 51.66 24.16 46.71 20.85C43.13 18.46 38.8101 17.1 34.43 16.81C31.46 16.61 24.4 16.88 20.05 18.65C25.18 19.53 29.3201 21.31 33.3801 24.42Z"
                fill="url(#paint2_linear_66_319)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_66_319"
                  x1="58.8277"
                  y1="53.3879"
                  x2="22.4643"
                  y2="31.6403"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.14" stopColor="#39B54A" />
                  <stop offset="0.77" stopColor="#9AE5A1" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_66_319"
                  x1="48.79"
                  y1="18.96"
                  x2="31.1"
                  y2="54.65"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.31" stopColor="white" stopOpacity="0" />
                  <stop offset="0.86" stopColor="white" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_66_319"
                  x1="68.7562"
                  y1="40.8039"
                  x2="26.1799"
                  y2="15.3509"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.31" stopColor="#39B55B" />
                  <stop offset="0.86" stopColor="#75DB7E" />
                </linearGradient>
              </defs>
            </svg>

            <div
              style={{
                gap: "8px",
              }}
              tw="flex flex-col"
            >
              <div tw="text-3xl md:text-4xl">Splist</div>
              <div tw="opacity-80">Discover and share your top artists and songs</div>
            </div>
          </div>
          {/* Date information */}
          <div tw="flex text-xl opacity-80">
            Past {timeFrame} as of {month}/{day}/{year}
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
      ),
      {
        width: 578,
        height: 679,
      }
    );
  } catch (e: any) {
    return new Response("Failed to generate image.", { status: 500 });
  }
}
