import { Participant } from "@/types/types";
import { runes } from "@/utils/constants";
import Image from "next/image";
import { type DetailedHTMLProps, type HTMLAttributes } from "react";

type Props = {
  participant: Participant;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function SummonerLoadout({ participant, ...props }: Props) {
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

  return (
    <div {...props}>
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
  );
}
