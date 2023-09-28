"use client";

import { Database } from "@/types/supabase";
import { FriendshipDB } from "@/types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";

export default function FriendList(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
  // const supabase = createClientComponentClient<Database>();
  const [friends, setFriends] = useState<FriendshipDB[] | null>(null);

  // useEffect(() => {
  //   const getFriends = async () => {
  //     const { data: friends } = await supabase.from("friendship").select();
  //     setFriends(friends);
  //   };
  //   getFriends();
  // }, []);

  return (
    <aside {...props}>
      <div>
        <h2 className="bg-slate-800 p-1 text-center">Friend List</h2>
        {friends?.map((friend) => (
          <p key={friend.friendshipId}>{friend.receiver_user_id}</p>
        ))}
      </div>
    </aside>
  );
}
