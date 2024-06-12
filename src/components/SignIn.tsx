import { signIn } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Navbar from "./ui/navbar";

export default function SignIn() {
  return (
    <main className="flex flex-col gap-8 p-6 md:p-12">
      <Navbar />
      <div className="flex p-24 justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Spotify Web API Typescript SDK in Next.js</CardTitle>
            <CardDescription>Share your top artists and tracks with your friends!</CardDescription>
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
