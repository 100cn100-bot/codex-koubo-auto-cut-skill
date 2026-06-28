import { interpolate, useCurrentFrame } from "remotion";
import { fadeUp } from "./animations";
import { theme } from "../theme";

type Props = {
  title?: string;
  left?: string;
  middle?: string;
  right?: string;
  value?: number;
};

export const SliderGauge = ({ title = "美化程度", left = "原图", middle = "合理美化", right = "过度失真", value = 58 }: Props) => {
  const frame = useCurrentFrame();
  const knob = interpolate(frame, [8, 42], [0, value], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: 80, top: 330, width: 840, fontFamily: theme.font, ...fadeUp(frame) }}>
      <div style={{ color: theme.blue, fontSize: 24, fontWeight: 900, marginBottom: 26 }}>{title}</div>
      <div style={{ position: "relative", height: 18, borderRadius: 999, background: "linear-gradient(90deg, rgba(255,255,255,0.25), #F6B83F, #FF4B4B)" }}>
        <div style={{ position: "absolute", left: `${knob}%`, top: -18, width: 54, height: 54, marginLeft: -27, borderRadius: 999, background: theme.yellow, boxShadow: "0 14px 42px rgba(246,184,63,0.48)" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, color: theme.textSecondary, fontSize: 24, fontWeight: 850 }}>
        <span>{left}</span><span style={{ color: theme.gold }}>{middle}</span><span>{right}</span>
      </div>
    </div>
  );
};
