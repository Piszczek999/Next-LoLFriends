"use client";

import { Database } from "@/types/supabase";
import { ProfileDB } from "@/types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";
import { useAuth } from "../auth/Auth";
import Friend from "./Friend";

export default function FriendList(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
  const supabase = createClientComponentClient<Database>();
  const [friends, setFriends] = useState<ProfileDB[]>([]);
  const { session } = useAuth();

  useEffect(() => {
    const getFriends = async () => {
      if (!session) return;
      const { data: friendships } = await supabase.from("friendship").select();

      const friendsPromises = friendships?.map((friendship) => {
        let friendId =
          friendship.sender_user_id == session?.user.id
            ? friendship.receiver_user_id
            : friendship.sender_user_id;
        return supabase.from("profile").select().eq("id", friendId).single();
      });
      if (!friendsPromises) return;
      const friendsData = await Promise.all(friendsPromises);
      const friends = friendsData.map((friend) => {
        return friend.data!;
      });
      setFriends([...friends]);
    };
    getFriends();
  }, [session, supabase]);

  return (
    <aside {...props}>
      <div>
        <h2 className="bg-slate-800 p-1 text-center">Friend List</h2>
        {!session && <p>Please log in</p>}
        <div className="flex flex-col gap-1">
          {friends?.map((friend) => (
            <Friend key={friend.id} friend={friend} />
          ))}
        </div>
      </div>
    </aside>
  );
}
