import { Participant } from "@/types/types";
import { useContext, type DetailedHTMLProps, type HTMLAttributes } from "react";
import { MatchContext } from "./MatchTile";

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export default function SummonerKDA({ ...props }: Props) {
  const { participant, match } = useContext(MatchContext);
  if (!participant || !match) return <p>Context is null</p>;

  return (
    <div {...props}>
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
  );
}
