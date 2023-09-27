"use client";

import { useEffect, useState } from "react";

import type { Match } from "@/types/types";
import { servers } from "@/utils/constants";
import MatchTile from "./MatchTile";

async function clientGetMatch(matchId: string, region: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOSTNAME}/api/match/${servers[region]}/${matchId}`
  );
  const match = (await res.json()) as Match;

  return match as Match;
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
  const [loading, setLoading] = useState(true);

  const loadMoreMatches = () => {
    setVisibleMatches(visibleMatches + 5);
  };

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      console.log(matchIds.slice(visibleMatches - 5, visibleMatches));
      const additionalMatches = await Promise.all(
        matchIds
          .slice(visibleMatches - 5, visibleMatches)
          .map<Promise<Match>>((matchId) => clientGetMatch(matchId, region))
      );
      setMatches((prevMatches) => [...prevMatches, ...additionalMatches]);
      setLoading(false);
    };
    fetchMatches();
  }, [visibleMatches]);

  return (
    <div className="flex flex-col gap-1 grow">
      {matches.map((match) => (
        <MatchTile key={match.metadata.matchId} puuid={puuid} match={match} />
      ))}
      {loading &&
        [1, 2, 3, 4, 5].map((e) => (
          <div
            key={e}
            className="flex h-24 gap-4 shadow px-2 bg-slate-750 items-center"
          >
            <div className="basis-20 h-5/6 bg-slate-700 rounded"></div>
            <div className="basis-20 h-5/6 bg-slate-700 rounded"></div>
            <div className="basis-32 h-5/6 bg-slate-700 rounded"></div>
            <div className="basis-20 h-5/6 bg-slate-700 rounded"></div>
            <div className="basis-56 h-5/6 bg-slate-700 rounded"></div>
          </div>
        ))}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        onClick={loadMoreMatches}
      >
        Load More
      </button>
    </div>
  );
}
