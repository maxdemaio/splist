import { Icons } from "./icons";

export default function MadeBy() {
  return (
    <div className="opacity-80 items-center gap-4 w-full flex flex-col">
      <div className="flex items-center justify-center gap-[0.45rem] flex-wrap">
        <div>
          <a
            className="justify-center flex-wrap border-b-[1px] border-neutral-700 group opacity-80 flex items-center gap-[0.45rem] transition-all duration-300 hover:opacity-50"
            href="https://github.com/sponsors/maxdemaio"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Made by Max DeMaio</span>
            <Icons.heart />
          </a>
        </div>

        <div className="text-center opacity-80 border-b-[1px] border-neutral-950">
          Logo designed by Lauren Susi
        </div>
      </div>

      <a
        href="https://github.com/maxdemaio/splist"
        className="border-b-[1px] border-neutral-700 group opacity-80 flex items-center gap-[0.45rem] transition-all duration-300 hover:opacity-50"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>Star on GitHub</span>
        <Icons.github />
      </a>
    </div>
  );
}
