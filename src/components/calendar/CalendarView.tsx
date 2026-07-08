import AppShell from "@/components/layout/AppShell";
import BottomNav from "@/components/layout/BottomNav";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Cycle = {
  id: string;
  start_date: string;
  end_date: string | null;
};

type CalendarViewProps = {
  cycles: Cycle[];
};

const days = ["일", "월", "화", "수", "목", "금", "토"];

const dates = Array.from({ length: 35 }, (_, i) => i + 1);

export default function CalendarView({ cycles }: CalendarViewProps) {
  return (
    <AppShell>
      <div className="flex flex-col gap-5 pb-32">
        <header className="flex items-center justify-between">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <ChevronLeft size={20} />
          </button>

          <div className="text-center">
            <p className="text-sm text-zinc-500">Calendar</p>
            <h1 className="text-2xl font-black">2026년 7월</h1>
          </div>

          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <ChevronRight size={20} />
          </button>
        </header>

        <section className="rounded-[2rem] bg-white p-5 shadow-sm">
          <div className="mb-4 grid grid-cols-7 text-center text-xs font-bold text-zinc-400">
            {days.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {dates.map((date) => {
              const currentMonth = "2026-07";

              const dateString = `${currentMonth}-${String(date).padStart(2, "0")}`;

              const isPeriod = cycles.some((cycle) => {
                const start = new Date(cycle.start_date);
                const end = new Date(cycle.end_date ?? cycle.start_date);
                const target = new Date(dateString);

                return target >= start && target <= end;
              });
              const isOvulation = date === 16;
              const isFertile = [12, 13, 14, 15, 17].includes(date);

              return (
                <div
                  key={date}
                  className={`flex aspect-square items-center justify-center rounded-2xl text-sm font-bold ${
                    isPeriod
                      ? "bg-[#FF5C93] text-white"
                      : isOvulation
                      ? "bg-purple-500 text-white"
                      : isFertile
                      ? "bg-purple-100 text-purple-600"
                      : "bg-[#FFF8FB] text-zinc-700"
                  }`}
                >
                  {date}
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-[2rem] bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-black">표시 정보</h2>

          <div className="space-y-3 text-sm font-semibold">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-[#FF5C93]" />
              생리 기간
            </div>
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-purple-500" />
              배란일
            </div>
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-purple-100" />
              가임기
            </div>
          </div>
        </section>
      </div>

      <BottomNav />
    </AppShell>
  );
}