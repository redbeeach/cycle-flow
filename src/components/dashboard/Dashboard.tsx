"use client";

import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import { getAverageCycleLength, getDaysUntilNextPeriod } from "@/utils/cycle";
import {
  CalendarDays,
  Droplets,
  HeartPulse,
  NotebookPen,
  Sparkles,
} from "lucide-react";
type Cycle = {
  id: string;
  start_date: string;
  end_date: string | null;
};

type DashboardProps = {
  latestCycle: Cycle | null;
  cycles: Cycle[];
  todayLog: {
    mood: string | null;
    pain_level: number | null;
    bleeding: string | null;
    memo: string | null;
  } | null;
};

export default function Dashboard({ latestCycle, cycles, todayLog }: DashboardProps) {
  const averageCycle = getAverageCycleLength(cycles);
  const daysUntilNextPeriod = getDaysUntilNextPeriod(cycles);
  const handleStartCycle = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert("로그인이 필요합니다.");
      return;
    }

    const { error } = await supabase.from("cycles").insert({
      user_id: user.id,
      start_date: new Date().toISOString().split("T")[0],
    });

    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }

    alert("생리 시작");
    location.reload();
  };
  const handleEndCycle = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("cycles")
      .update({
        end_date: new Date().toISOString().split("T")[0],
      })
      .eq("user_id", user.id)
      .is("end_date", null);

    if (error) {
      alert(error.message);
      return;
    }

    alert("생리 종료");
    location.reload();
  };
  const cycleDay = latestCycle
    ? Math.floor(
        (new Date().getTime() - new Date(latestCycle.start_date).getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1
    : null;
  const isCycling = latestCycle?.end_date === null;
  return (
    <div className="flex flex-col gap-5 pb-32">
      <Header />

      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#ff6aaa] via-[#ff8fbd] to-[#ffc1d9] p-6 text-white shadow-[0_24px_60px_rgba(255,105,170,0.28)]">
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/20" />
        <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-white/15" />

        <div className="relative z-10">
          <p className="text-sm font-medium text-white/80">오늘의 주기</p>
          <h2 className="mt-2 text-4xl font-black tracking-tight">{cycleDay ? `생리 ${cycleDay}일차` : "기록이 없어요"}</h2>

          <div className="mt-6 flex items-end justify-between">
            <div>
              <p className="text-sm text-white/75">다음 생리까지</p>
              <p className="text-3xl font-black">
                {daysUntilNextPeriod !== null ? `${daysUntilNextPeriod}일` : "-"}
              </p>
            </div>

            <div className="rounded-full bg-white/20 px-4 py-2 text-sm font-bold backdrop-blur">
              {cycleDay ?? "-"} / 5일
            </div>
          </div>

          <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-white/25">
            <div className="h-full w-2/5 rounded-full bg-white" />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-3">
        <div className="rounded-[1.5rem] bg-white p-4 shadow-sm">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-100 text-pink-500">
            <HeartPulse size={20} />
          </div>
          <p className="text-xs text-muted-foreground">컨디션</p>
          <p className="mt-1 font-bold">{todayLog?.mood ?? "-"}</p>
        </div>

        <div className="rounded-[1.5rem] bg-white p-4 shadow-sm">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-100 text-purple-500">
            <Sparkles size={20} />
          </div>
          <p className="text-xs text-muted-foreground">단계</p>
          <p className="mt-1 font-bold">통증 {todayLog?.pain_level ?? 0}</p>
        </div>

        <div className="rounded-[1.5rem] bg-white p-4 shadow-sm">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-100 text-rose-500">
            <CalendarDays size={20} />
          </div>
          <p className="text-xs text-muted-foreground">예정일</p>
          <p className="mt-1 font-bold">{todayLog?.bleeding ?? "-"}</p>
        </div>
      </section>

      <section className="rounded-[2rem] bg-white p-5 shadow-sm">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">Quick Record</p>
          <h3 className="text-xl font-black">빠른 기록</h3>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Button
            onClick={isCycling ? handleEndCycle : handleStartCycle}
            className="h-24 flex-col gap-2 rounded-[1.35rem] bg-zinc-950 text-white hover:bg-zinc-800"
          >
            <Droplets size={24} />
            <span className="text-sm">
              {isCycling ? "생리 종료" : "생리 시작"}
            </span>
          </Button>

          <Button
            className="h-24 flex-col gap-2 rounded-[1.35rem] bg-pink-50 text-pink-600 hover:bg-pink-100"
            variant="ghost"
          >
            <CalendarDays size={24} />
            <span className="text-sm">생리 종료</span>
          </Button>

          <Button
            className="h-24 flex-col gap-2 rounded-[1.35rem] bg-purple-50 text-purple-600 hover:bg-purple-100"
            variant="ghost"
          >
            <NotebookPen size={24} />
            <span className="text-sm">오늘 기록</span>
          </Button>
        </div>
      </section>
    </div>
  );
}