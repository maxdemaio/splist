import { signOut } from "next-auth/react";
import { Button } from "./button";
import { Icons } from "../icons";

interface INavbarProps {
  showSignOut?: boolean;
  userName?: string | null;
  userImage?: string | null;
}

export default function Navbar(props: INavbarProps) {
  console.log(props);
  return (
    <div className="flex flex-col gap-8">
      <nav className="text-lg grid grid-cols-2 lg:grid-cols-3 md:p-0">
        <div className="flex items-center text-3xl md:text-4xl">Splist~</div>
        {props.userName && (
          <div className="hidden lg:flex items-center justify-center gap-4">
            {props.userImage ? (
              <img
                src={props.userImage}
                alt="User image"
                className="rounded-full"
              />
            ) : (
              <Icons.profileDefault />
            )}
            <span>Signed in as {props.userName}</span>
          </div>
        )}

        {props.showSignOut && (
          <div className="flex items-center justify-end md:gap-12 gap-4">
            <div className="flex gap-2 items-center">
              <Icons.github />
              <span className="hidden md:flex">GitHub</span>
            </div>
            <Button
              variant={"secondary"}
              className="text-lg"
              onClick={() => signOut()}
            >
              Sign out
            </Button>
          </div>
        )}
      </nav>
      <div className="lg:hidden flex items-center justify-start gap-4">
        {props.userImage ? (
          <img
            src={props.userImage}
            alt="User image"
            className="rounded-full"
          />
        ) : (
          <Icons.profileDefault />
        )}

        <span>Signed in as {props.userName}</span>
      </div>
    </div>
  );
}
