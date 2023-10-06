import { Match } from "@/types/types";
import { queues } from "@/utils/constants";
import { type DetailedHTMLProps, type HTMLAttributes } from "react";

type Props = {
  match: Match;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function MatchInfo({ match, ...props }: Props) {
  function getFormattedTime(match: Match) {
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

  return (
    <div {...props}>
      <p className="text-xs">{queues[match.info.queueId]}</p>

      <p className="text-xs">{getFormattedTime(match)}</p>
      <p className="text-xs">{getDate(match.info.gameEndTimestamp)}</p>
    </div>
  );
}
