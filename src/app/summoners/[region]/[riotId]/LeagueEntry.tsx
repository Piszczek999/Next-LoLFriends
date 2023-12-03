import { League } from "@/types/types";
import Image from "next/image";

export default function LeagueEntry({ queue }: { queue: League }) {
  return (
    <div className="bg-slate-700 shadow flex">
      <Image
        src={`${
          process.env.NEXT_PUBLIC_SUPABASE_URL
        }/storage/v1/object/public/LoLFriends/rank/TFT_Regalia_${
          queue.tier.toLowerCase().charAt(0).toUpperCase() +
          queue.tier.slice(1).toLowerCase()
        }.png`}
        alt={queue.tier}
        width={100}
        height={100}
      />
      <div className="flex flex-col justify-center text-slate-400">
        <p className="capitalize text-xs">{queue.queueType}</p>
        <p className="font-bold">{`${queue.tier} ${queue.rank}`}</p>
        {queue.tier === "UNRANKED" || (
          <>
            <p>{`LP: ${queue.leaguePoints}`}</p>
            <div className="text-xs">
              <p>
                Wins: {<span className="text-green-500">{queue.wins}</span>} -
                Losses {<span className="text-red-500">{queue.losses}</span>}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
