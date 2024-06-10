import { signOut } from "next-auth/react";
import { Button } from "./button";

interface INavbarProps {
  showSignOut?: boolean;
  userName?: string | null;
}

export default function Navbar(props: INavbarProps) {
  return (
    <nav className="flex items-center justify-between px-12 py-6">
      <div className="text-2xl">Splist~</div>
      {props.userName && <div>Signed in as {props.userName}</div>}
      {props.showSignOut && (
        <Button variant={"secondary"} onClick={() => signOut()}>Sign out</Button>
      )}
    </nav>
  );
}
