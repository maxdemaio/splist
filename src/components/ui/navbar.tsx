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
        <Button
          size={"lg"}
          variant={"secondary"}
          onClick={() => signOut()}
        >
          Sign out
        </Button>
      )}
    </nav>
  );
}
