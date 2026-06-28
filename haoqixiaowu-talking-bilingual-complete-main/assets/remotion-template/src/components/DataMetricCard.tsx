import { useCurrentFrame } from "remotion";
import { stagger } from "./animations";
import { theme } from "../theme";

type MetricRow = {
  label: string;
  sublabel?: string;
  value: string;
  icon?: string;
};

type Props = {
  rows?: MetricRow[];
  totalLabel?: string;
  totalValue: string;
  unitLabel?: string;
  accent?: "green" | "gold" | "blue";
};

const accentColor = (accent: Props["accent"]) => {
  if (accent === "gold") return theme.gold;
  if (accent === "blue") return theme.blue;
  return theme.green;
};

export const DataMetricCard = ({
  rows = [],
  totalLabel = "TOTAL",
  totalValue,
  unitLabel,
  accent = "green",
}: Props) => {
  const frame = useCurrentFrame();
  const color = accentColor(accent);

  return (
    <div
      style={{
        position: "absolute",
        left: 96,
        top: 178,
        width: 850,
        minHeight: 520,
        padding: "48px 54px 50px",
        boxSizing: "border-box",
        borderRadius: 42,
        fontFamily: theme.font,
        color: theme.textPrimary,
        background:
          "linear-gradient(145deg, rgba(5,9,8,0.94), rgba(12,18,16,0.90) 54%, rgba(4,8,7,0.96))",
        border: `2px solid ${color}66`,
        boxShadow: `0 26px 90px rgba(0,0,0,0.48), inset 0 1px 1px rgba(255,255,255,0.12), 0 0 72px ${color}22`,
        overflow: "hidden",
        ...stagger(frame, 0, 1),
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -140,
          top: -130,
          width: 420,
          height: 420,
          borderRadius: 999,
          background: `${color}1f`,
          filter: "blur(52px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -120,
          bottom: -150,
          width: 360,
          height: 360,
          borderRadius: 999,
          background: "rgba(255,255,255,0.06)",
          filter: "blur(54px)",
        }}
      />
      <div style={{ position: "relative" }}>
        {rows.slice(0, 3).map((row, index) => (
          <div
            key={`${row.label}-${index}`}
            style={{
              display: "grid",
              gridTemplateColumns: "72px 1fr auto",
              alignItems: "center",
              gap: 24,
              marginBottom: 34,
              ...stagger(frame, index, 5),
            }}
          >
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: 17,
                display: "grid",
                placeItems: "center",
                color,
                fontSize: 34,
                fontWeight: 900,
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.16)",
                boxShadow: `inset 0 0 0 1px ${color}33`,
              }}
            >
              {row.icon ?? "↗"}
            </div>
            <div>
              <div style={{ fontSize: 38, lineHeight: 1, fontWeight: 950 }}>{row.label}</div>
              {row.sublabel ? (
                <div
                  style={{
                    marginTop: 12,
                    color: "rgba(255,255,255,0.58)",
                    fontSize: 18,
                    lineHeight: 1.08,
                    fontWeight: 900,
                    letterSpacing: 5,
                  }}
                >
                  {row.sublabel}
                </div>
              ) : null}
            </div>
            <div
              style={{
                color,
                fontSize: 62,
                lineHeight: 0.9,
                fontWeight: 950,
                textShadow: `0 0 34px ${color}44`,
                whiteSpace: "nowrap",
              }}
            >
              {row.value}
            </div>
          </div>
        ))}
        <div
          style={{
            height: 2,
            margin: "4px 0 34px",
            background: `linear-gradient(90deg, ${color}99, rgba(255,255,255,0.08))`,
          }}
        />
        <div style={{ display: "grid", gridTemplateColumns: "170px 1fr", alignItems: "end", gap: 30, ...stagger(frame, 4, 5) }}>
          <div>
            <div
              style={{
                color: "rgba(255,255,255,0.68)",
                fontSize: 24,
                lineHeight: 1,
                fontWeight: 950,
                letterSpacing: 8,
              }}
            >
              {totalLabel}
            </div>
            {unitLabel ? (
              <div style={{ marginTop: 26, fontSize: 35, lineHeight: 1, fontWeight: 950 }}>
                {unitLabel}
              </div>
            ) : null}
          </div>
          <div
            style={{
              color,
              fontSize: 92,
              lineHeight: 0.9,
              fontWeight: 950,
              textAlign: "right",
              textShadow: `0 0 44px ${color}55`,
              whiteSpace: "nowrap",
            }}
          >
            {totalValue}
          </div>
        </div>
      </div>
    </div>
  );
};
