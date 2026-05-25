"use client";

/**
 * LeadTrendChart — client SVG sparkline chart for daily lead counts.
 * Zero external chart dependencies. Pure SVG rendered on client.
 */

interface DataPoint {
  date: string;
  count: number;
}

interface Props {
  data: DataPoint[];
}

export function LeadTrendChart({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/40 text-xs text-zinc-600">
        No trend data available
      </div>
    );
  }

  const WIDTH = 600;
  const HEIGHT = 120;
  const PAD_X = 8;
  const PAD_Y = 12;

  const max = Math.max(...data.map((d) => d.count), 1);
  const points = data.map((d, i) => {
    const x = PAD_X + (i / (data.length - 1 || 1)) * (WIDTH - PAD_X * 2);
    const y = PAD_Y + (1 - d.count / max) * (HEIGHT - PAD_Y * 2);
    return { x, y, ...d };
  });

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  const fillD = [
    pathD,
    `L ${points[points.length - 1].x.toFixed(1)} ${HEIGHT}`,
    `L ${points[0].x.toFixed(1)} ${HEIGHT}`,
    "Z",
  ].join(" ");

  const totalLeads = data.reduce((s, d) => s + d.count, 0);
  const peakDay = data.reduce((a, b) => (a.count >= b.count ? a : b));

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-bold tabular-nums text-zinc-100">{totalLeads}</span>
          <span className="text-xs text-zinc-500">total leads in period</span>
        </div>
        {peakDay.count > 0 && (
          <span className="text-xs text-zinc-600">
            Peak: {peakDay.count} on{" "}
            <span className="font-bold text-zinc-100" suppressHydrationWarning>
            {new Date(peakDay.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
            </span>
          </span>
        )}
      </div>
      <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="h-32 w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={fillD} fill="url(#leadGrad)" />
          <path
            d={pathD}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {points.map((p) =>
            p.count > 0 ? (
              <circle
                key={p.date}
                cx={p.x}
                cy={p.y}
                r="3"
                fill="#3b82f6"
                stroke="#0f172a"
                strokeWidth="1.5"
                className="group relative cursor-pointer"
              >
              </circle>
            ) : null
          )}
        </svg>

        {/* X-axis labels */}
        <div className="flex justify-between px-2 pb-2 text-[10px] text-zinc-700">
          {data
            .filter((_, i) => i === 0 || i === Math.floor(data.length / 2) || i === data.length - 1)
            .map((d) => (
              <span key={d.date} suppressHydrationWarning>
                {new Date(d.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
