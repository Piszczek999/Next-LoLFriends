import Image from "next/image";
import Searchbar from "./components/Searchbar";

export default function Home() {
  return (
    <main className="flex flex-col p-2">
      <div className="text-center bg-green-500 bg-opacity-30 py-10">
        <header className="text-5xl mt-2">Welcome to LoLFriends</header>
        <p className="text-xl mt-2 text-slate-300">
          Your Premier Destination for League of Legends Match History and
          Friend Connections!
        </p>
      </div>
      <div className="flex flex-col items-center py-10">
        <header className="text-3xl mt-2">
          Type in your summoner name with #tag
        </header>
        <div className="px-5 py-2 bg-green-500 bg-opacity-30 rounded-lg">
          <Searchbar />
        </div>
      </div>
      <div className="py-5 px-2 bg-slate-600">
        <header className="text-3xl text-center py-5">
          Unlock Your Summoner Network:
        </header>
        <div className="grid grid-cols-2 gap-5 items-center">
          <p className="text-xl mt-2 text-slate-300">
            LoLFriends is not just a platform, its a community where League of
            Legends enthusiasts come together to share experiences, strategies,
            and victories. <br />
            <br /> Connect with other summoners, build your friendlist, and
            expand your network in the ever-evolving world of Runeterra.
          </p>
          <Image
            className="grow opacity-80 col-span-2 md:col-span-1 shadow-lg"
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/LoLFriends/homepage1.png`}
            alt="homepage1"
            width={840}
            height={500}
          />
        </div>
      </div>
    </main>
  );
}
