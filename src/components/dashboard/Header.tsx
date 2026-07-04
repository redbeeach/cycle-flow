export default function Header() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <header className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-zinc-500">{greeting}</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-zinc-950">
          CycleFlow
        </h1>
      </div>

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
        🌸
      </div>
    </header>
  );
}