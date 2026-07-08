import AppShell from "@/components/layout/AppShell";
import BottomNav from "@/components/layout/BottomNav";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="pb-32">
        <h1 className="text-3xl font-bold">설정</h1>
        <p className="mt-2 text-zinc-500">
          알림, 다크모드, 백업 등을 설정합니다.
        </p>
      </div>

      <BottomNav />
    </AppShell>
  );
}