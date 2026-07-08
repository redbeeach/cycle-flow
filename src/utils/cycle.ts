type Cycle = {
  start_date: string;
  end_date: string | null;
};

export function getAverageCycleLength(cycles: Cycle[]) {
  if (cycles.length < 2) return 28;

  const sorted = [...cycles].sort(
    (a, b) =>
      new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
  );

  const diffs = [];

  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1].start_date).getTime();
    const current = new Date(sorted[i].start_date).getTime();

    diffs.push(Math.round((current - prev) / (1000 * 60 * 60 * 24)));
  }

  const recent = diffs.slice(-6);
  return Math.round(recent.reduce((a, b) => a + b, 0) / recent.length);
}

export function getNextPeriodDate(cycles: Cycle[]) {
  if (cycles.length === 0) return null;

  const sorted = [...cycles].sort(
    (a, b) =>
      new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
  );

  const latest = sorted[sorted.length - 1];
  const averageCycle = getAverageCycleLength(cycles);

  const next = new Date(latest.start_date);
  next.setDate(next.getDate() + averageCycle);

  return next;
}

export function getDaysUntilNextPeriod(cycles: Cycle[]) {
  const next = getNextPeriodDate(cycles);
  if (!next) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  next.setHours(0, 0, 0, 0);

  return Math.ceil((next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}