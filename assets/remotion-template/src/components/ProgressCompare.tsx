import { interpolate, useCurrentFrame } from "remotion";
import { fadeUp } from "./animations";
import { theme } from "../theme";

type Props = {
  title?: string;
  leftLabel?: string;
  leftValue?: number;
  rightLabel?: string;
  rightValue?: number;
  note?: string;
};

export const ProgressCompare = ({
  title = "80 / 20",
  leftLabel = "AI初筛",
  leftValue = 80,
  rightLabel = "人工判断",
  rightValue = 20,
  note,
}: Props) => {
  const frame = useCurrentFrame();
  const grow = interpolate(frame, [8, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const total = Math.max(1, leftValue + rightValue);
  const leftPct = (leftValue / total) * 100 * grow;

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        top: 300,
        width: 820,
        fontFamily: theme.font,
        ...fadeUp(frame),
      }}
    >
      <div style={{ color: theme.blue, fontSize: 24, fontWeight: 900, letterSpacing: 1 }}>{title}</div>
      <div style={{ marginTop: 24, height: 74, borderRadius: 37, background: "rgba(255,255,255,0.16)", overflow: "hidden", boxShadow: "0 18px 58px rgba(0,0,0,0.34)" }}>
        <div style={{ width: `${leftPct}%`, height: "100%", borderRadius: 37, background: `linear-gradient(90deg, ${theme.yellow}, ${theme.gold})` }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, color: theme.textPrimary, fontWeight: 900 }}>
        <div style={{ fontSize: 32 }}>{leftLabel} {leftValue}%</div>
        <div style={{ fontSize: 28, color: theme.textSecondary }}>{rightLabel} {rightValue}%</div>
      </div>
      {note ? <div style={{ marginTop: 20, color: theme.textSecondary, fontSize: 26, fontWeight: 700 }}>{note}</div> : null}
    </div>
  );
};
