"use client";

import { ProfileDB } from "@/types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session, User } from "@supabase/supabase-js";
import { useContext, useState, useEffect, createContext } from "react";

// create a context for authentication
const AuthContext = createContext<{
  session: Session | null | undefined;
  profile: ProfileDB | null | undefined;
}>({ session: null, profile: null });

export const AuthProvider = ({ children }: any) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<ProfileDB | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      setSession(session);
      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
      }
    );

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    if (!session) setProfile(null);
    const getProfile = async () => {
      const { data } = await supabase
        .from("profile")
        .select()
        .eq("id", session?.user.id)
        .single();
      if (data) setProfile(data);
    };
    getProfile();
  }, [session, supabase]);

  const value = {
    session,
    profile,
  };

  // use a provider to pass down the value
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// export the useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};
