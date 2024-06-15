import { signOut } from "next-auth/react";
import { Button } from "./button";
import { Icons } from "../icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

interface INavbarProps {
  showSignOut?: boolean;
  userName?: string | null;
  userImage?: string | null;
}

export default function Navbar(props: INavbarProps) {
  return (
    <nav className="gap-8 items-center text-base md:text-lg flex-wrap flex justify-between">
      <div></div>
      <div className="items-center justify-center flex gap-4">
        {props.showSignOut && (
          <Button size={"lg"} variant={"secondary"} onClick={() => signOut()}>
            Sign out
          </Button>
        )}
        {props.showSignOut && props.userName && (
          <>
            {props.userImage ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <img
                      src={props.userImage}
                      alt="User image"
                      className="rounded-full"
                      width={50}
                      height={50}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>Signed in as {props.userName}</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <Icons.profileDefault />
            )}
          </>
        )}
      </div>
    </nav>
  );
}
