import { signOut } from "next-auth/react";
import { Button } from "./button";
import { Icons } from "../icons";

interface INavbarProps {
  showSignOut?: boolean;
  userName?: string | null;
  userImage?: string | null;
}

export default function Navbar(props: INavbarProps) {
  return (
    <nav className="gap-8 items-center text-base md:text-lg flex-wrap flex justify-between">
      <div className="flex gap-4">
        <img width={80} height={80} src="/splist-logo.png" alt="splist logo" />
        <div className="flex items-center text-3xl md:text-4xl">Splist</div>
      </div>
      {props.showSignOut && props.userName && (
        <div className="flex items-center justify-center gap-4">
          {props.userImage ? (
            <img
              src={props.userImage}
              alt="User image"
              className="rounded-full"
              width={50}
              height={50}
            />
          ) : (
            <Icons.profileDefault />
          )}
          <span>Signed in as {props.userName}</span>
        </div>
      )}
      {props.showSignOut && (
        <div className="flex items-center justify-end md:gap-12 gap-4">
          <a
            href="https://github.com/maxdemaio/splist"
            className="flex gap-2 items-center underline transition-all duration-300 hover:opacity-80"
          >
            <Icons.github />
            <span className="hidden sm:flex">GitHub</span>
          </a>
          <Button
            size={"lg"}
            variant={"secondary"}
            className="text-base md:text-lg"
            onClick={() => signOut()}
          >
            Sign out
          </Button>
        </div>
      )}
    </nav>
  );
}
