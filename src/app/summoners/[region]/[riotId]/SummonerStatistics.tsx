import { League, LeagueDB } from "@/types/types";
import Image from "next/image";
import LeagueEntry from "./LeagueEntry";

const unrankedSolo = {
  queueType: "Ranked Solo",
  tier: "UNRANKED",
  rank: "",
  created_at: "",
  freshBlood: false,
  hotStreak: false,
  inactive: false,
  leagueId: "",
  leaguePoints: 0,
  losses: 0,
  miniSeries: null,
  summonerId: "",
  summonerName: "",
  veteran: false,
  wins: 0,
};

const unrankedFlex = {
  queueType: "Ranked Flex",
  tier: "UNRANKED",
  rank: "",
  created_at: "",
  freshBlood: false,
  hotStreak: false,
  inactive: false,
  leagueId: "",
  leaguePoints: 0,
  losses: 0,
  miniSeries: null,
  summonerId: "",
  summonerName: "",
  veteran: false,
  wins: 0,
};

function initLeagues(leagueData: League[]) {
  let newLeagueData: League[] = [];

  const solo = leagueData.find(
    (league) => league.queueType === "RANKED_SOLO_5x5"
  );
  const flex = leagueData.find(
    (league) => league.queueType === "RANKED_FLEX_SR"
  );

  newLeagueData.push({ ...(solo || unrankedSolo), queueType: "Ranked Solo" });
  newLeagueData.push({ ...(flex || unrankedFlex), queueType: "Ranked Flex" });

  return newLeagueData;
}

export default async function SummonerStatistics({
  leagues,
}: {
  leagues: LeagueDB[];
}) {
  const leagueData = initLeagues(leagues);

  return (
    <div className="flex flex-col gap-1 max-h-[68vh] overflow-y-scroll no-scroll">
      {leagueData.map((queue, i) => (
        <LeagueEntry key={i} queue={queue} />
      ))}
    </div>
  );
}
