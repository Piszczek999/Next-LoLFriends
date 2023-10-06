"use client";

import { Match, MatchData, Participant } from "@/types/types";
import { queues, regions, runes, spells } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import { ITEMS } from "@/utils/LoL-data";
import MatchInfo from "./MatchInfo";
import SummonerLoadout from "./SummonerLoadout";
import SummonerItems from "./SummonerItems";
import SummonerKDA from "./SummonerKDA";
import MatchParticipants from "./MatchParticipants";

function getPlayer(match: Match, puuid: string) {
  return match.info.participants.find((player) => player.puuid == puuid);
}

export default function MatchTile({
  matchData,
  puuid,
}: {
  matchData: MatchData;
  puuid: string;
}) {
  if (matchData.error)
    return <pre>{JSON.stringify(matchData.error, null, 2)}</pre>;

  const match = matchData.match!;
  const participant = getPlayer(match, puuid);

  if (!participant) return null;

  return (
    <div className="relative flex gap-4 shadow px-2 bg-slate-700 items-center h-[80px] text-slate-400 overflow-hidden">
      {participant.win ? (
        <p className="absolute left-0 text-8xl text-green-500 text-opacity-20 font-bold">
          VICTORY
        </p>
      ) : (
        <p className="absolute left-0 text-8xl text-red-500 text-opacity-20 font-bold">
          DEFEAT
        </p>
      )}

      <MatchInfo match={match} className="flex flex-col gap-2 basis-24 z-[1]" />

      <SummonerLoadout
        participant={participant}
        className="flex gap-1 basis-20 shrink-0 z-[1]"
      />

      <SummonerItems
        participant={participant}
        className="grid grid-cols-4 gap-[2px] shrink-0 z-[1]"
      />

      <SummonerKDA
        gameDuration={match.info.gameDuration}
        participant={participant}
        className="text-center basis-24 shrink-0 z-[1]"
      />

      <MatchParticipants
        match={match}
        participant={participant}
        className="sm:flex flex-col basis-56 grow hidden"
      />
    </div>
  );
}
