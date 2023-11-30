import { Participant } from "@/types/types";
import { SUMMONERS } from "@/utils/LoL-data";
import { runes } from "@/utils/constants";
import Tippy from "@tippyjs/react";
import Image from "next/image";
import { useContext, type DetailedHTMLProps, type HTMLAttributes } from "react";
import { MatchContext } from "./MatchTile";

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function SummonerLoadout({ ...props }: Props) {
  const { participant } = useContext(MatchContext);
  if (!participant) return <p>Context is null</p>;

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
        <Tippy content={participant.championName}>
          <Image
            className={`rounded-full`}
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/LoLFriends/champion/${participant.championName}.png`}
            alt={"image of" + participant.championName}
            width={48}
            height={48}
          />
        </Tippy>

        <div className="flex gap-1 items-center justify-center">
          <Image
            className="bg-slate-800 rounded-full"
            src={`${
              process.env.NEXT_PUBLIC_SUPABASE_URL
            }/storage/v1/object/public/LoLFriends/Styles/${
              runes[getPrimaryRune(participant)]
            }`}
            alt=""
            width={20}
            height={20}
          />
          <Image
            className="bg-slate-800 rounded-full p-1"
            src={`${
              process.env.NEXT_PUBLIC_SUPABASE_URL
            }/storage/v1/object/public/LoLFriends/Styles/${
              runes[getSecondaryRune(participant)]
            }`}
            alt=""
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 z-[1]">
        <Tippy
          content={
            <>
              <p>
                {
                  SUMMONERS.find(
                    (spell) => spell.key == participant.summoner1Id.toString()
                  )?.name
                }
              </p>
              <p className="text-slate-400">
                {
                  SUMMONERS.find(
                    (spell) => spell.key == participant.summoner1Id.toString()
                  )?.description
                }
              </p>
            </>
          }
          placement="top"
        >
          <Image
            className={`rounded summoner-${participant.summoner1Id}-24`}
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/LoLFriends/fond_sprite.png`}
            alt=""
            width={24}
            height={24}
          />
        </Tippy>
        <Tippy
          content={
            <>
              <p>
                {
                  SUMMONERS.find(
                    (spell) => spell.key == participant.summoner2Id.toString()
                  )?.name
                }
              </p>
              <p className="text-slate-400">
                {
                  SUMMONERS.find(
                    (spell) => spell.key == participant.summoner2Id.toString()
                  )?.description
                }
              </p>
            </>
          }
          placement="top"
        >
          <Image
            className={`rounded summoner-${participant.summoner2Id}-24`}
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/LoLFriends/fond_sprite.png`}
            alt=""
            width={24}
            height={24}
          />
        </Tippy>
      </div>
    </div>
  );
}
