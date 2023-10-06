import { Participant } from "@/types/types";
import { ITEMS } from "@/utils/LoL-data";
import Tippy from "@tippyjs/react";
import Image from "next/image";
import { type DetailedHTMLProps, type HTMLAttributes } from "react";

type Props = {
  participant: Participant;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function SummonerItems({ participant, ...props }: Props) {
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
    <div {...props}>
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
  );
}
