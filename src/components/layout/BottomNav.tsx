"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  ChartNoAxesColumn,
  Home,
  Plus,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "홈", icon: Home, href: "/" },
  { label: "달력", icon: CalendarDays, href: "/calendar" },
  { label: "기록", icon: Plus, href: "/record", center: true },
  { label: "통계", icon: ChartNoAxesColumn, href: "/statistics" },
  { label: "설정", icon: Settings, href: "/settings" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-32px)] max-w-[398px] -translate-x-1/2 rounded-[2rem] bg-white/90 px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.1)] backdrop-blur">
      <div className="flex items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          if (item.center) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className="-mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#FF5C93] text-white shadow-[0_12px_30px_rgba(255,92,147,0.45)]"
              >
                <Icon size={30} />
              </Link>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-1 text-xs font-semibold ${
                active ? "text-[#FF5C93]" : "text-zinc-400"
              }`}
            >
              <Icon size={22} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}