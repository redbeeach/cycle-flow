import { CalendarDays, ChartNoAxesColumn, Home, Plus, Settings } from "lucide-react";

const navItems = [
  { label: "홈", icon: Home, active: true },
  { label: "달력", icon: CalendarDays },
  { label: "기록", icon: Plus, center: true },
  { label: "통계", icon: ChartNoAxesColumn },
  { label: "설정", icon: Settings },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-32px)] max-w-[398px] -translate-x-1/2 rounded-[2rem] bg-white/90 px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.1)] backdrop-blur">
      <div className="flex items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;

          if (item.center) {
            return (
              <button
                key={item.label}
                className="-mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#FF5C93] text-white shadow-[0_12px_30px_rgba(255,92,147,0.45)]"
              >
                <Icon size={30} />
              </button>
            );
          }

          return (
            <button
              key={item.label}
              className={`flex flex-col items-center gap-1 text-xs font-semibold ${
                item.active ? "text-[#FF5C93]" : "text-zinc-400"
              }`}
            >
              <Icon size={22} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}