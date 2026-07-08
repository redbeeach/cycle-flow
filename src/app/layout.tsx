import "./globals.css";
import "pretendard/dist/web/static/pretendard.css";

import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";
import BottomNav from "@/components/layout/BottomNav";

export const metadata: Metadata = {
  title: "Luna",
  description: "Period Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <AppShell>
          {children}
          <BottomNav />
        </AppShell>
      </body>
    </html>
  );
}