type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <main className="min-h-screen bg-[#fff8fb]">
      <div className="mx-auto min-h-screen w-full max-w-[430px] px-5 py-6">
        {children}
      </div>
    </main>
  );
}