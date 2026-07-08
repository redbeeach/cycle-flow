import Dashboard from "@/components/dashboard/Dashboard";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth");


  const { data: cycles } = await supabase
  .from("cycles")
  .select("*")
  .eq("user_id", user.id)
  .order("start_date", { ascending: true });

  const latestCycle = cycles?.[cycles.length - 1] ?? null;




  const { data: todayLog } = await supabase
    .from("daily_logs")
    .select("*")
    .eq("user_id", user.id)
    .eq("log_date", new Date().toISOString().split("T")[0])
    .maybeSingle();

    
    return (
      <Dashboard
        latestCycle={latestCycle}
        cycles={cycles ?? []}
        todayLog={todayLog}
      />
    );
}