"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AuthPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return alert(error.message);

    alert("회원가입 완료. 이제 로그인해줘.");
  };

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return alert(error.message);

    router.push("/");
    router.refresh();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff8fb] px-5">
      <div className="w-full max-w-sm rounded-[2rem] bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-pink-500">Welcome</p>
        <h1 className="mt-2 text-3xl font-black">Luna</h1>

        <div className="mt-8 space-y-3">
          <input
            className="w-full rounded-2xl bg-pink-50 px-4 py-4 outline-none"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full rounded-2xl bg-pink-50 px-4 py-4 outline-none"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={signIn}
            className="w-full rounded-2xl bg-[#FF5C93] py-4 font-bold text-white"
          >
            로그인
          </button>

          <button
            onClick={signUp}
            className="w-full rounded-2xl bg-zinc-100 py-4 font-bold text-zinc-700"
          >
            회원가입
          </button>
        </div>
      </div>
    </main>
  );
}