import supabase from "@/utils/supabase";

async function getSummoner(name: string) {
  const db = await supabase
    .from("summoner")
    .select<"*", Summoner>()
    .like("name", name)
    .single();

  if (db.data) return db.data;

  const res = await fetch(
    `https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${process.env.RIOT_API_KEY}`
  );
  return (await res.json()) as Summoner;
}

type Route = {
  region: string;
  id: string;
};

export default async function page({ params }: { params: Route }) {
  const summoner = await getSummoner(params.id);

  return <div>{summoner.name}</div>;
}
