import { interpolate, useCurrentFrame } from "remotion";
import { fadeUp } from "./animations";
import { theme } from "../theme";

type Props = {
  value: number;
  label?: string;
  title: string;
  subtitle?: string;
  tone?: "green" | "gold" | "blue" | "red";
};

const colorFor = (tone?: Props["tone"]) => {
  if (tone === "gold") return theme.gold;
  if (tone === "blue") return theme.blue;
  if (tone === "red") return theme.red;
  return theme.green;
};

export const PercentDonutStat = ({
  value,
  label = "FIXED",
  title,
  subtitle,
  tone = "green",
}: Props) => {
  const frame = useCurrentFrame();
  const color = colorFor(tone);
  const progress = interpolate(frame, [8, 42], [0, Math.max(0, Math.min(100, value))], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 72,
        top: 260,
        width: 1120,
        height: 360,
        display: "grid",
        gridTemplateColumns: "360px 1fr",
        alignItems: "center",
        gap: 54,
        fontFamily: theme.font,
        color: theme.textPrimary,
        ...fadeUp(frame),
      }}
    >
      <div
        style={{
          position: "relative",
          width: 326,
          height: 326,
          borderRadius: 999,
          display: "grid",
          placeItems: "center",
          background: `conic-gradient(${color} ${progress * 3.6}deg, rgba(255,255,255,0.13) 0deg)`,
          boxShadow: `0 0 64px ${color}55`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 42,
            borderRadius: 999,
            background: "rgba(2,4,6,0.92)",
            boxShadow: "inset 0 0 34px rgba(0,0,0,0.55)",
          }}
        />
        <div
          style={{
            position: "relative",
            color,
            fontSize: 108,
            lineHeight: 1,
            fontWeight: 950,
            letterSpacing: 0,
            textShadow: `0 0 34px ${color}66`,
          }}
        >
          {Math.round(progress)}%
        </div>
      </div>
      <div>
        <div
          style={{
            color: "rgba(255,255,255,0.72)",
            fontSize: 30,
            lineHeight: 1,
            fontWeight: 950,
            letterSpacing: 10,
          }}
        >
          {label}
        </div>
        <div
          style={{
            marginTop: 28,
            color: theme.textPrimary,
            fontSize: 64,
            lineHeight: 1.08,
            fontWeight: 950,
            letterSpacing: 0,
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              marginTop: 22,
              color,
              fontSize: 30,
              lineHeight: 1,
              fontWeight: 900,
              letterSpacing: 3,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
    </div>
  );
};
