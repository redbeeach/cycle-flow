export default function RecordPage() {
  return (

      <div className="space-y-6 pb-32">
        <div>
          <p className="text-sm text-zinc-500">오늘의 기록</p>
          <h1 className="text-3xl font-black">Health Log</h1>
        </div>

        <section className="rounded-[28px] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold">오늘 기분</h2>

          <div className="grid grid-cols-4 gap-3">
            {["😄","🙂","😐","😭"].map((emoji)=>(
              <button
                key={emoji}
                className="flex aspect-square items-center justify-center rounded-3xl bg-pink-50 text-3xl transition hover:scale-105"
              >
                {emoji}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold">오늘 통증</h2>

          <input
            type="range"
            min="0"
            max="10"
            className="w-full accent-pink-500"
          />
        </section>

        <section className="rounded-[28px] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold">메모</h2>

          <textarea
            className="h-32 w-full rounded-2xl bg-pink-50 p-4 outline-none"
            placeholder="오늘의 컨디션을 기록해보세요."
          />
        </section>
      </div>

  );
}