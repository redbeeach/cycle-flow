"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
export default function RecordPage() {
  const [mood, setMood] = useState("");
  const [painLevel, setPainLevel] = useState(0);
  const [bleeding, setBleeding] = useState("");
  const [medicine, setMedicine] = useState(false);
  const [memo, setMemo] = useState("");
  const router = useRouter();

  const handleSave = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    const { error } = await supabase.from("daily_logs").upsert(
      {
        user_id: user.id,
        log_date: today,
        mood,
        pain_level: painLevel,
        bleeding,
        medicine,
        memo,
      },
      {
        onConflict: "user_id,log_date",
      }
    );

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    alert("오늘 기록 저장 완료");
    router.refresh();
    router.push("/");
  };

  return (
    <div className="space-y-6 pb-32">
      <div>
        <p className="text-sm text-zinc-500">오늘의 기록</p>
        <h1 className="text-3xl font-black">Health Log</h1>
      </div>

      <section className="rounded-[28px] bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold">오늘 기분</h2>

        <div className="grid grid-cols-4 gap-3">
          {["😄", "🙂", "😐", "😭"].map((emoji) => (
            <button
              key={emoji}
              onClick={() => setMood(emoji)}
              className={`flex aspect-square items-center justify-center rounded-3xl text-3xl ${
                mood === emoji ? "bg-pink-500 text-white" : "bg-pink-50"
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold">오늘 통증: {painLevel}</h2>

        <input
          className="w-full accent-pink-500"
          type="range"
          min={0}
          max={10}
          value={painLevel}
          onChange={(e) => setPainLevel(Number(e.target.value))}
        />
      </section>

      <section className="rounded-[28px] bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold">혈량</h2>

        <div className="grid grid-cols-3 gap-3">
          {["적음", "보통", "많음"].map((item) => (
            <button
              key={item}
              onClick={() => setBleeding(item)}
              className={`rounded-2xl py-3 font-bold ${
                bleeding === item
                  ? "bg-pink-500 text-white"
                  : "bg-pink-50 text-pink-500"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] bg-white p-6 shadow-sm">
        <button
          onClick={() => setMedicine(!medicine)}
          className={`w-full rounded-2xl py-4 font-bold ${
            medicine ? "bg-pink-500 text-white" : "bg-white text-zinc-700"
          }`}
        >
          💊 약 복용 {medicine ? "했음" : "안 함"}
        </button>
      </section>

      <section className="rounded-[28px] bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold">메모</h2>

        <textarea
          className="h-32 w-full rounded-2xl bg-pink-50 p-4 outline-none"
          placeholder="오늘의 컨디션을 기록해보세요."
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
      </section>

      <Button
        onClick={handleSave}
        className="h-14 w-full rounded-2xl bg-[#FF5C93]"
      >
        오늘 기록 저장
      </Button>
    </div>
  );
}