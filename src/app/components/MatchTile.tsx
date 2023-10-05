"use client";

import { Match, MatchData, Participant } from "@/types/types";
import { queues, regions, runes, spells } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import { ITEMS } from "@/utils/LoL-data";

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
      <div className="flex flex-col gap-2 basis-24 z-[1]">
        <p className="text-xs">{queues[match.info.queueId]}</p>

        <p className="text-xs">{getGameDuration(match)}</p>
        <p className="text-xs">{getDate(match.info.gameEndTimestamp)}</p>
      </div>

      <div className="flex gap-1 basis-20 shrink-0 z-[1]">
        <div>
          <Image
            className={`rounded-full`}
            src={`https://dtneqrqtsogjewiotxnf.supabase.co/storage/v1/object/public/lolassets/champion/${participant.championName}.png`}
            alt={"image of" + participant.championName}
            width={48}
            height={48}
          />
          <div className="flex gap-1 items-center justify-center">
            <Image
              className="bg-slate-800 rounded-full"
              src={`https://dtneqrqtsogjewiotxnf.supabase.co/storage/v1/object/public/lolassets/Styles/${
                runes[getPrimaryRune(participant)]
              }`}
              alt=""
              width={20}
              height={20}
            />
            <Image
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
        <div className="flex flex-col gap-1 z-[1]">
          <Image
            className={`rounded summoner-${participant.summoner1Id}-24`}
            src={
              "https://dtneqrqtsogjewiotxnf.supabase.co/storage/v1/object/public/lolassets/fond_sprite.png"
            }
            alt=""
            width={24}
            height={24}
          />
          <Image
            className={`rounded summoner-${participant.summoner2Id}-24`}
            src={
              "https://dtneqrqtsogjewiotxnf.supabase.co/storage/v1/object/public/lolassets/fond_sprite.png"
            }
            alt=""
            width={24}
            height={24}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-[2px] shrink-0 z-[1]">
        {playerItems.map((item) =>
          item ? (
            <Tippy
              key={item}
              content={
                ITEMS.find((itemData) => itemData.id == item.toString())?.name
              }
              placement="top"
            >
              <Image
                className={`item-${item}-24`}
                src={`https://dtneqrqtsogjewiotxnf.supabase.co/storage/v1/object/public/lolassets/fond_sprite.png`}
                alt=""
                width={24}
                height={24}
              />
            </Tippy>
          ) : (
            <div
              key={item}
              className="h-[24px] bg-slate-800 border-2 border-slate-750"
            ></div>
          )
        )}
      </div>

      <div className="text-center basis-24 shrink-0 z-[1]">
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

      <div className="sm:flex flex-col basis-56 grow hidden">
        <div className="flex gap-px">
          {match.info.participants
            .filter((player) => player.teamId === 100)
            .map((player, r) => (
              <Tippy key={r} content={player.summonerName} placement="top">
                <div className="flex items-center gap-1">
                  <Link
                    className="relative"
                    href={`/summoners/${Object.keys(regions).find(
                      (key) =>
                        regions[key] === match.info.platformId.toLowerCase()
                    )}/${player.summonerName}`}
                  >
                    <Image
                      className={`rounded champion-${player.championId}-24`}
                      src={`https://dtneqrqtsogjewiotxnf.supabase.co/storage/v1/object/public/lolassets/fond_sprite.png`}
                      alt=""
                      width={16}
                      height={16}
                      key={player.championName}
                    />
                    {player.summonerId == participant.summonerId && (
                      <div className="absolute w-[24px] h-[24px] top-0 border-2 border-slate-300 rounded"></div>
                    )}
                  </Link>
                </div>
              </Tippy>
            ))}
        </div>
        <div className="flex gap-px">
          {match.info.participants
            .filter((player) => player.teamId === 200)
            .map((player, r) => (
              <Tippy key={r} content={player.summonerName} placement="top">
                <div className="flex items-center gap-1">
                  <Link
                    className="relative"
                    href={`/summoners/${Object.keys(regions).find(
                      (key) =>
                        regions[key] === match.info.platformId.toLowerCase()
                    )}/${player.summonerName}`}
                  >
                    <Image
                      className={`rounded champion-${player.championId}-24`}
                      src={`https://dtneqrqtsogjewiotxnf.supabase.co/storage/v1/object/public/lolassets/fond_sprite.png`}
                      alt=""
                      width={16}
                      height={16}
                      key={player.championName}
                    />
                    {player.summonerId == participant.summonerId && (
                      <div className="absolute w-[24px] h-[24px] top-0 border-2 border-slate-300 rounded"></div>
                    )}
                  </Link>
                </div>
              </Tippy>
            ))}
        </div>
      </div>
    </div>
  );
}
