import { signIn } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Navbar from "./ui/navbar";
import { Button } from "./ui/button";
import MadeBy from "./MadeBy";
import { Icons } from "./icons";

export default function SignIn() {
  return (
    <main className="flex flex-col gap-8 md:p-12 p-6">
      <div className="flex justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Icons.splist />

              <div className="flex flex-col gap-2">
                <div className="text-3xl md:text-4xl">Splist</div>
              </div>
            </div>
            <CardDescription className="text-lg">
              Share your top artists and tracks with your friends!
            </CardDescription>
            <CardDescription className="text-lg">(Currently in closed beta)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-center justify-center">
              <div>
                <img
                  className="opacity-100"
                  src="/Spotify-Icon.png"
                  alt="Spotify Logo"
                />
              </div>
              <Button size={"lg"} onClick={() => signIn("spotify")}>
                Sign in with Spotify
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <MadeBy />
    </main>
  );
}
