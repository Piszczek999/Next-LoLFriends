"use client";

import { Database } from "@/types/supabase";
import { ProfileDB } from "@/types/types";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { DetailedHTMLProps, HTMLAttributes, useState, useEffect } from "react";

export default function FriendList(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
  const supabase = createClientComponentClient<Database>();
  const [friends, setFriends] = useState<ProfileDB[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  useEffect(() => {
    const getFriends = async () => {
      const { data: friendships } = await supabase.from("friendship").select();
      const friendsPromise = friendships?.map((friendship) => {
        const friendId =
          friendship.sender_user_id == user?.id
            ? friendship.receiver_user_id
            : friendship.sender_user_id;
        return supabase.from("profile").select().eq("id", friendId).single();
      });
      if (!friendsPromise) return;
      const friends = (await Promise.all(friendsPromise)).map((fr) => fr.data!);

      setFriends([...friends]);
    };
    getFriends();
  }, []);

  return (
    <aside {...props}>
      <div>
        <h2 className="bg-slate-800 p-1 text-center">Friend List</h2>
        {!user && <p>Please log in</p>}
        {friends?.map((friend) => (
          <p key={friend.id}>{friend.name}</p>
        ))}
      </div>
    </aside>
  );
}
