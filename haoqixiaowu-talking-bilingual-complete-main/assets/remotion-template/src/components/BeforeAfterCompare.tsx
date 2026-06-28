import { useCurrentFrame } from "remotion";
import { fadeUp } from "./animations";
import { theme } from "../theme";

type Props = {
  title?: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeText?: string;
  afterText?: string;
};

export const BeforeAfterCompare = ({ title = "前后对比", beforeLabel = "Before", afterLabel = "After", beforeText = "普通图", afterText = "广告级质感" }: Props) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", left: 80, top: 230, width: 930, fontFamily: theme.font, ...fadeUp(frame) }}>
      <div style={{ color: theme.blue, fontSize: 24, fontWeight: 900, marginBottom: 22 }}>{title}</div>
      <div style={{ display: "flex", gap: 22 }}>
        {[{ label: beforeLabel, text: beforeText, accent: false }, { label: afterLabel, text: afterText, accent: true }].map((card) => (
          <div key={card.label} style={{ width: 360, height: 260, borderRadius: 30, padding: 26, background: card.accent ? theme.yellow : "rgba(255,255,255,0.12)", color: card.accent ? "#101114" : theme.textPrimary, boxShadow: "0 24px 72px rgba(0,0,0,0.38)", border: "1px solid rgba(255,255,255,0.16)" }}>
            <div style={{ fontSize: 22, fontWeight: 900, opacity: 0.7 }}>{card.label}</div>
            <div style={{ marginTop: 54, fontSize: 42, lineHeight: 1.1, fontWeight: 950 }}>{card.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
