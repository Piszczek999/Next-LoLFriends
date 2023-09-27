import Link from "next/link";
import Searchbar from "./Searchbar";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-slate-900 p-1 shadow-lg px-3 py-3 h-[68px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-2">
          <Link className="border-r-2 border-slate-700 p-2 text-xl" href={"/"}>
            LoLFriends
          </Link>

          <Searchbar />
        </div>
        <div className="flex items-center">
          <div className="flex items-center ml-3">
            <div>User menu</div>
          </div>
        </div>
      </div>
    </nav>
  );
}
