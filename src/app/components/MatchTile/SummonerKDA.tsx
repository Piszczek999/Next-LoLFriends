import { Participant } from "@/types/types";
import { type DetailedHTMLProps, type HTMLAttributes } from "react";

type Props = {
  participant: Participant;
  gameDuration: number;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export default function SummonerKDA({
  participant,
  gameDuration,
  ...props
}: Props) {
  return (
    <div {...props}>
      <p className="font-medium text-slate-200">{`${participant.kills} / ${participant.deaths} / ${participant.assists}`}</p>
      <p className="text-xs text-slate-400">{`${
        participant.totalMinionsKilled
      } CS (${(participant.totalMinionsKilled / (gameDuration / 60)).toFixed(
        1
      )})`}</p>
      <p className="text-xs text-slate-400">{`${Math.round(
        participant.challenges?.killParticipation * 100
      )}% KP`}</p>
    </div>
  );
}
