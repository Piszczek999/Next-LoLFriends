"use client";

import { useEffect, useState } from "react";
import type { Match, MatchData } from "@/types/types";
import { servers } from "@/utils/constants";
import MatchTile from "./MatchTile/MatchTile";

async function fetchMatches(matchIds: string[], region: string) {
  const res = await fetch(
    `/api/match/${servers[region]}/?matchIds=${matchIds.join(",")}`
  );

  if (!res.ok) {
    return [];
  }

  const { matches, error }: MatchData = await res.json();
  if (error) console.error(error);
  if (matches) return matches;
  else null;
}

export default function MatchHistory({
  puuid,
  matchIds,
  region,
}: {
  puuid: string;
  matchIds: string[];
  region: string;
}) {
  const [visibleMatches, setVisibleMatches] = useState(5);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loadingMatches, setLoadingMatches] = useState(true);

  const loadMoreMatches = () => {
    setVisibleMatches((prevVisibleMatches) => prevVisibleMatches + 5);
  };

  useEffect(() => {
    const fetchAndSetMatches = async () => {
      setLoadingMatches(true);
      const additionalMatchesData = await fetchMatches(
        matchIds.slice(visibleMatches - 5, visibleMatches),
        region
      );
      if (additionalMatchesData) {
        setMatches((prevMatches) => [...prevMatches, ...additionalMatchesData]);
        setLoadingMatches(false);
      }
    };

    fetchAndSetMatches();
  }, [matchIds, region, visibleMatches]);

  return (
    <div className="flex flex-col gap-1 grow max-h-[70vh] overflow-y-scroll">
      {matches
        .sort((a, b) => b.info.gameEndTimestamp - a.info.gameEndTimestamp)
        .map((match, index) => (
          <MatchTile key={index} puuid={puuid} match={match} />
        ))}
      {loadingMatches &&
        [...Array(5)].map((_, index) => (
          <div key={index} className="loading-placeholder"></div>
        ))}
      <button
        className="bg-blue-500 text-white w-full mt-2 py-2 rounded-md hover:bg-blue-600 transition"
        onClick={loadMoreMatches}
      >
        Load More
      </button>
    </div>
  );
}
