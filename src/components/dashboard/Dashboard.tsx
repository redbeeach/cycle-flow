import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { CalendarDays, Droplets, HeartPulse, NotebookPen, Sparkles } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import BottomNav from "@/components/layout/BottomNav";

export default function Dashboard() {
  return (
    <AppShell>
      <div className="flex flex-col gap-5 pb-32">
        <div className="mx-auto flex min-h-screen max-w-md flex-col gap-5 px-5 py-6">
          <Header />

          <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#ff6aaa] via-[#ff8fbd] to-[#ffc1d9] p-6 text-white shadow-[0_24px_60px_rgba(255,105,170,0.28)]">
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/20" />
            <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-white/15" />

            <div className="relative z-10">
              <p className="text-sm font-medium text-white/80">오늘의 주기</p>
              <h2 className="mt-2 text-4xl font-black tracking-tight">생리 2일차</h2>

              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="text-sm text-white/75">다음 생리까지</p>
                  <p className="text-3xl font-black">17일</p>
                </div>

                <div className="rounded-full bg-white/20 px-4 py-2 text-sm font-bold backdrop-blur">
                  2 / 5일
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
              <p className="mt-1 font-bold">좋음</p>
            </div>

            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-100 text-purple-500">
                <Sparkles size={20} />
              </div>
              <p className="text-xs text-muted-foreground">단계</p>
              <p className="mt-1 font-bold">월경기</p>
            </div>

            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-100 text-rose-500">
                <CalendarDays size={20} />
              </div>
              <p className="text-xs text-muted-foreground">예정일</p>
              <p className="mt-1 font-bold">7.22</p>
            </div>
          </section>

          <section className="rounded-[2rem] bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Quick Record</p>
                <h3 className="text-xl font-black">빠른 기록</h3>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Button className="h-24 flex-col gap-2 rounded-[1.35rem] bg-zinc-950 text-white hover:bg-zinc-800">
                <Droplets size={24} />
                <span className="text-sm">생리 시작</span>
              </Button>

              <Button className="h-24 flex-col gap-2 rounded-[1.35rem] bg-pink-50 text-pink-600 hover:bg-pink-100" variant="ghost">
                <CalendarDays size={24} />
                <span className="text-sm">생리 종료</span>
              </Button>

              <Button className="h-24 flex-col gap-2 rounded-[1.35rem] bg-purple-50 text-purple-600 hover:bg-purple-100" variant="ghost">
                <NotebookPen size={24} />
                <span className="text-sm">오늘 기록</span>
              </Button>
            </div>
          </section>
        </div>
      </div>
      <BottomNav />
    </AppShell>
  );
}
