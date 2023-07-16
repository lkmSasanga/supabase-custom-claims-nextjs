"use client";
import { useEffect } from "react";
import styles from "./page.module.css";
import { createClient } from "@supabase/supabase-js";

export default function Home() {
  const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_ANON_KEY;

  useEffect(() => {
    console.log("supabaseURL", supabaseURL);
    console.log("anonKey", anonKey);
  }, []);

  const supabase = createClient(supabaseURL, anonKey);

  // useEffect(() => {
  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     if (session?.user) {
  //       console.log("session", session?.user); // show custom claims
  //     }
  //   });
  // },[]);

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: "lkmsasanga@gmail.com",
      password: "example-password",
    });

    console.log("data", data);
    console.log("error", error);
  };

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "lkmsasanga@gmail.com",
      password: "example-password",
    });

    console.log("login", data);
    console.log("error", error);
  };

  const handleClaims = async () => {
    const { data, error } = await supabase.rpc("set_claim", {
      uid: "aa07c48f-03e8-4f29-9264-8c261e5bd35d",
      claim: "role",
      value: "gi-member",
    });

    // const { data, error } = await supabase
    //   .rpc('get_my_claims', {});

    console.log("set claim", data);
    console.log("set claim err", error);
  };

  return (
    <main className={styles.main}>
      <button onClick={handleSignup}>signup</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleClaims}>set claims</button>
    </main>
  );
}

// Updated "set_claim" Supabase function

// BEGIN
//   IF value = '"gi-member"' THEN
//     update auth.users set raw_app_meta_data =
//       raw_app_meta_data ||
//         json_build_object(claim, value)::jsonb where id = uid;
//     return 'OK';
//   ELSIF NOT is_claims_admin() OR  THEN
//       RETURN 'error: access denied';
//   ELSE
//     update auth.users set raw_app_meta_data =
//       raw_app_meta_data ||
//         json_build_object(claim, value)::jsonb where id = uid;
//     return 'OK';
//   END IF;
// END;
