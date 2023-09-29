"use client";

import { Match, MatchData, Participant } from "@/types/types";
import { queues, regions, runes, spells } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";

function getPlayer(match: Match, puuid: string) {
  return match.info.participants.find((player) => player.puuid == puuid);
}
function getPrimaryRune(player: Participant) {
  if (player.perks.styles[0]?.selections[0]?.perk) {
    return player.perks.styles[0].selections[0].perk;
  }
  return 0;
}

function getSecondaryRune(player: Participant) {
  if (player.perks.styles[1]?.style) {
    return player.perks.styles[1].style;
  }
  return 0;
}

function getGameDuration(match: Match) {
  const totalSeconds = match.info.gameDuration;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  return formattedTime;
}

function getDate(timestamp: number) {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  // const hours = date.getHours();
  // const minutes = date.getMinutes();
  // const seconds = date.getSeconds();

  // const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
  const formattedDateTime = `${year}-${month}-${day}`;

  return formattedDateTime;
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

  const playerItems = [
    participant.item0,
    participant.item1,
    participant.item2,
    participant.item6,
    participant.item3,
    participant.item4,
    participant.item5,
  ];

  return (
    <div className="flex gap-4 shadow px-2 bg-slate-700 items-center h-24 text-slate-400">
      <div className="basis-24">
        <p className="text-xs">{queues[match.info.queueId]}</p>
        {participant.win && (
          <p className="text-lg text-green-500 font-medium">Victory</p>
        )}
        {!participant.win && (
          <p className="text-lg text-red-500 font-medium">Defeat</p>
        )}
        <p className="text-xs">{getGameDuration(match)}</p>
        <p className="text-xs">{getDate(match.info.gameEndTimestamp)}</p>
      </div>

      <div className="flex gap-1 basis-20 shrink-0">
        <div>
          <img
            className="rounded-full"
            src={`https://dtneqrqtsogjewiotxnf.supabase.co/storage/v1/object/public/lolassets/champion/${participant.championName}.png`}
            alt={"image of" + participant.championName}
            width={50}
            height={50}
          />
          <div className="flex gap-1 items-center justify-center">
            <img
              className="bg-slate-800 rounded-full"
              src={`https://dtneqrqtsogjewiotxnf.supabase.co/storage/v1/object/public/lolassets/Styles/${
                runes[getPrimaryRune(participant)]
              }`}
              alt=""
              width={20}
              height={20}
            />
            <img
              className="bg-slate-800 rounded-full p-1"
              src={`https://dtneqrqtsogjewiotxnf.supabase.co/storage/v1/object/public/lolassets/Styles/${
                runes[getSecondaryRune(participant)]
              }`}
              alt=""
              width={20}
              height={20}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <img
            className="rounded"
            src={`https://dtneqrqtsogjewiotxnf.supabase.co/storage/v1/object/public/lolassets/spell/${
              spells[participant.summoner1Id]
            }.png`}
            alt=""
            width={25}
            height={25}
          />
          <img
            className="rounded"
            src={`https://dtneqrqtsogjewiotxnf.supabase.co/storage/v1/object/public/lolassets/spell/${
              spells[participant.summoner2Id]
            }.png`}
            alt=""
            width={25}
            height={25}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-[2px] shrink-0">
        {playerItems.map((item) =>
          item ? (
            <img
              key={item}
              src={`https://dtneqrqtsogjewiotxnf.supabase.co/storage/v1/object/public/lolassets/item/${item}.png`}
              alt=""
              width={30}
              height={30}
            />
          ) : (
            <div
              key={item}
              className="h-[30px] bg-slate-800 border-2 border-slate-750"
            ></div>
          )
        )}
      </div>

      <div className="text-center basis-24 shrink-0">
        <p className="font-medium text-slate-200">{`${participant.kills} / ${participant.deaths} / ${participant.assists}`}</p>
        <p className="text-xs text-slate-400">{`${
          participant.totalMinionsKilled
        } CS (${(
          participant.totalMinionsKilled /
          (match.info.gameDuration / 60)
        ).toFixed(1)})`}</p>
        <p className="text-xs text-slate-400">{`${Math.round(
          participant.challenges?.killParticipation * 100
        )}% KP`}</p>
      </div>

      <div className="sm:flex basis-56 grow hidden ">
        <div className="flex flex-col gap-px basis-[80px] grow whitespace-nowrap overflow-hidden mx-1">
          {match.info.participants
            .filter((player) => player.teamId === 100)
            .map((player, r) => (
              <div key={r} className="flex items-center gap-1">
                <img
                  className="rounded"
                  src={`https://dtneqrqtsogjewiotxnf.supabase.co/storage/v1/object/public/lolassets/champion/${player.championName}.png`}
                  alt=""
                  width={16}
                  height={16}
                  key={player.championName}
                />
                <Link
                  href={`/summoners/${Object.keys(regions).find(
                    (key) =>
                      regions[key] === match.info.platformId.toLowerCase()
                  )}/${player.summonerName}`}
                >
                  <p className="text-xs" title={player.summonerName}>
                    {player.summonerName}
                  </p>
                </Link>
              </div>
            ))}
        </div>
        <div className="flex flex-col gap-px basis-[80px] grow whitespace-nowrap overflow-hidden mx-1">
          {match.info.participants
            .filter((player) => player.teamId === 200)
            .map((player, r) => (
              <div key={r} className="flex items-center gap-1">
                <img
                  className="rounded"
                  src={`https://dtneqrqtsogjewiotxnf.supabase.co/storage/v1/object/public/lolassets/champion/${player.championName}.png`}
                  alt=""
                  width={16}
                  height={16}
                  key={player.championName}
                />
                <Link
                  href={`/summoners/${Object.keys(regions).find(
                    (key) =>
                      regions[key] === match.info.platformId.toLowerCase()
                  )}/${player.summonerName}`}
                >
                  <p className="text-xs" title={player.summonerName}>
                    {player.summonerName}
                  </p>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
