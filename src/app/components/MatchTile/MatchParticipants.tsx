import { Match, Participant } from "@/types/types";
import { regions } from "@/utils/constants";
import Tippy from "@tippyjs/react";
import Image from "next/image";
import Link from "next/link";
import { type DetailedHTMLProps, type HTMLAttributes } from "react";

type Props = {
  participant: Participant;
  match: Match;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function MatchParticipants({
  match,
  participant,
  ...props
}: Props) {
  return (
    <div {...props}>
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
  );
}
