import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import SummonersList from "./SummonersList";
import { useAuth } from "@/app/auth/Auth";
import AddFriend from "./AddFriend";

export const dynamic = "force-dynamic";

export default async function page({
  params: { name },
}: {
  params: { name: string };
}) {
  const supabase = createClientComponentClient<Database>();

  const { data: profile } = await supabase
    .from("profile")
    .select()
    .eq("name", name)
    .single();

  if (!profile) return <div>Profile not found</div>;

  return (
    <main className="flex flex-col gap-2">
      <div className="flex bg-slate-800 p-4 shadow-lg gap-4">
        <Image
          className="rounded-full border-4 border-slate-500"
          src={"/user-icon.png"}
          alt="User Image"
          width={200}
          height={200}
        />
        <div className="flex flex-col gap-2">
          <p className="text-3xl">{profile.name}</p>
          <p className="text-xl text-slate-400">{profile.email}</p>
          <AddFriend />
        </div>
      </div>
      <div className="bg-slate-800 p-2 flex">
        <p>Connected summoners:</p>
      </div>
      <SummonersList profile={profile} />
    </main>
  );
}
