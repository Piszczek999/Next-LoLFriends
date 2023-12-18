"use client";

import { useAuth } from "@/app/auth/Auth";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function AddButton({ puuid }: { puuid: string }) {
  const supabase = createClientComponentClient<Database>();
  const [owned, setOwned] = useState(false);

  const { session } = useAuth();

  useEffect(() => {
    const getProfile = async () => {
      const profileRes = await supabase.from("profile").select().single();

      if (profileRes.data?.puuid == puuid) setOwned(true);
    };
    getProfile();
  }, []);
  if (!session) return;

  const AddSummoner = async () => {
    const data = await supabase
      .from("profile")
      .update({ puuid: puuid })
      .eq("id", session.user.id)
      .select();
    if (data.status == 200) setOwned(true);
  };

  const RemoveSummoner = async () => {
    const data = await supabase
      .from("profile")
      .update({ puuid: null })
      .eq("id", session.user.id)
      .select();

    if (data.status == 200) setOwned(false);
  };

  return (
    <div>
      {owned ? (
        <button className="bg-red-700 p-1 rounded-md" onClick={RemoveSummoner}>
          Remove
        </button>
      ) : (
        <button className="bg-blue-700 p-1 rounded-md" onClick={AddSummoner}>
          Add
        </button>
      )}
    </div>
  );
}
