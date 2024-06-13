import { signIn } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Navbar from "./ui/navbar";
import { Button } from "./ui/button";
import MadeBy from "./MadeBy";

export default function SignIn() {
  return (
    <main className="flex flex-col gap-8">
      <Navbar />
      <div className="flex justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <div className="flex items-center gap-4">
              <img width={80} height={80} src="/splist-logo.png" alt="splist logo" />

              <div className="flex flex-col gap-2">
                <div className="text-3xl md:text-4xl">Splist</div>
              </div>
            </div>
            <CardDescription className="text-lg">
              Share your top artists and tracks with your friends!
            </CardDescription>
            <CardDescription className="text-lg">
              (Currently in closed beta)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <Button size={"lg"} onClick={() => signIn("spotify")}>
                Sign in with Spotify
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full flex justify-center">
        <MadeBy />
      </div>
    </main>
  );
}
