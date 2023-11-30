import { Participant } from "@/types/types";
import { ITEMS } from "@/utils/LoL-data";
import Tippy from "@tippyjs/react";
import Image from "next/image";
import { useContext, type DetailedHTMLProps, type HTMLAttributes } from "react";
import { MatchContext } from "./MatchTile";

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function SummonerItems({ ...props }: Props) {
  const { participant } = useContext(MatchContext);
  if (!participant) return <p>Context is null</p>;

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
              <>
                <p>
                  {
                    ITEMS.find((itemData) => itemData.id == item.toString())
                      ?.name
                  }
                </p>
                <p className="text-slate-400">
                  {
                    ITEMS.find((itemData) => itemData.id == item.toString())
                      ?.plaintext
                  }
                </p>
              </>
            }
            placement="top"
          >
            <Image
              className={`item-${item}-24`}
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/LoLFriends/fond_sprite.png`}
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
