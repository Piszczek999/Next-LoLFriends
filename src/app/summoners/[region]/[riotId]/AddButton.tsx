"use client";

import { useAuth } from "@/app/auth/Auth";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AddButton() {
  const supabase = createClientComponentClient<Database>();
  const { session } = useAuth();
  if (!session) return;

  const onTrigger = async () => {
    const data = await supabase
      .from("summoner")
      .update({ user_id: session.user.id })
      .match("id")
      .select();
    console.log(data, session.user.id);
  };

  return (
    <div>
      <button className="bg-blue-700 p-1 rounded-md" onClick={onTrigger}>
        Add
      </button>
    </div>
  );
}
