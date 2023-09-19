import Link from "next/link";
import Searchbar from "./Searchbar";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 p-1 shadow-lg">
      <div className="flex items-center gap-4">
        <Link className="border-r-2 border-slate-700 p-2 text-xl" href={"/"}>
          LoLStats
        </Link>

        <Searchbar />
      </div>
    </nav>
  );
}
