"use client";

import { Match, MatchData, Participant } from "@/types/types";
import MatchInfo from "./MatchInfo";
import MatchParticipants from "./MatchParticipants";
import SummonerItems from "./SummonerItems";
import SummonerKDA from "./SummonerKDA";
import SummonerLoadout from "./SummonerLoadout";
import { createContext } from "react";

export const MatchContext = createContext<{
  match: Match | null;
  participant: Participant | null;
}>({ match: null, participant: null });

function getPlayer(match: Match, puuid: string) {
  return match.info.participants.find((player) => player.puuid == puuid);
}

export default function MatchTile({
  match,
  puuid,
}: {
  match: Match;
  puuid: string;
}) {
  const participant = getPlayer(match, puuid);

  if (!participant) return null;

  return (
    <MatchContext.Provider value={{ match, participant }}>
      <div className="relative flex gap-4 shadow px-2 bg-slate-700 items-center min-h-[80px] text-slate-400 overflow-hidden">
        {participant.win ? (
          <p className="absolute left-0 text-8xl text-green-500 text-opacity-20 font-bold">
            VICTORY
          </p>
        ) : (
          <p className="absolute left-0 text-8xl text-red-500 text-opacity-20 font-bold">
            DEFEAT
          </p>
        )}

        <MatchInfo className="flex flex-col gap-2 basis-24 z-[1]" />

        <SummonerLoadout className="flex gap-1 basis-20 shrink-0 z-[1]" />

        <SummonerItems className="grid grid-cols-4 gap-[2px] shrink-0 z-[1]" />

        <SummonerKDA className="text-center basis-24 shrink-0 z-[1]" />

        <MatchParticipants className="sm:flex flex-col basis-[126px] hidden shrink-0" />
      </div>
    </MatchContext.Provider>
  );
}
