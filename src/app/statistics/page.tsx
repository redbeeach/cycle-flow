import AppShell from "@/components/layout/AppShell";
import BottomNav from "@/components/layout/BottomNav";

export default function StatisticsPage() {
  return (
    <AppShell>
      <div className="pb-32">
        <h1 className="text-3xl font-bold">통계</h1>
        <p className="mt-2 text-zinc-500">
          주기와 그래프를 표시하는 페이지입니다.
        </p>
      </div>

      <BottomNav />
    </AppShell>
  );
}