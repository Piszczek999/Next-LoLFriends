import { Match } from "@/types/types";
import { queues } from "@/utils/constants";
import { type DetailedHTMLProps, type HTMLAttributes, useContext } from "react";
import { MatchContext } from "./MatchTile";
import Tippy from "@tippyjs/react";

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function MatchInfo({ ...props }: Props) {
  const { match } = useContext(MatchContext);
  if (!match) return <p>MatchContext is null</p>;

  function getFormattedTime(match: Match) {
    const totalSeconds = match.info.gameDuration;

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    return formattedTime;
  }

  function timestampToDate(timestamp: number) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDateTime = `${day}.${month}.${year} ${hours}:${minutes}`;

    return formattedDateTime;
  }

  function timestampToDaysAgo(timestamp: number) {
    const currentTime = Math.floor(Date.now() / 1000);
    const timeDifference = currentTime - timestamp / 1000;

    if (timeDifference < 60) {
      return `${timeDifference} second${timeDifference === 1 ? "" : "s"} ago`;
    } else if (timeDifference < 3600) {
      const minutesAgo = Math.floor(timeDifference / 60);
      return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
    } else if (timeDifference < 86400) {
      const hoursAgo = Math.floor(timeDifference / 3600);
      return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
    } else {
      const daysAgo = Math.round(timeDifference / 86400);
      return `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
    }
  }

  return (
    <div {...props}>
      <p className="text-xs text-slate-300">{queues[match.info.queueId]}</p>
      <Tippy content={timestampToDate(match.info.gameEndTimestamp)}>
        <p className="text-xs">
          {timestampToDaysAgo(match.info.gameEndTimestamp)}
        </p>
      </Tippy>
      <p className="text-xs">{getFormattedTime(match)}</p>
    </div>
  );
}
