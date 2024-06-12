import { ImageResponse } from "next/og";

// Tell the server we want to run this code on the Edge runtime
export const runtime = "edge";

export async function POST(request: Request) {
  console.log("in api request!!")
  const body = await request.json();
  console.log(body);

  try {
    return new ImageResponse(<div>hello world</div>);
  } catch (e: any) {
    return new Response("Failed to generate image.", { status: 500});
  }
};
