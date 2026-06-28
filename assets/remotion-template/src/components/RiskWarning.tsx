import { useCurrentFrame, useVideoConfig } from "remotion";
import { scalePop } from "./animations";
import { theme } from "../theme";

type Props = {
  title?: string;
  label?: string;
  metric?: string;
};

export const RiskWarning = ({ title = "不能无中生有", label = "风险警告", metric = "退货率↑" }: Props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: 80, top: 190, width: 820, fontFamily: theme.font, transformOrigin: "left top", ...scalePop(frame, fps) }}>
      <div style={{ color: theme.red, fontSize: 28, fontWeight: 950, letterSpacing: 1 }}>{label}</div>
      <div style={{ marginTop: 12, color: theme.textPrimary, fontSize: 86, lineHeight: 1, fontWeight: 950 }}>{title}</div>
      <div style={{ marginTop: 34, display: "inline-flex", alignItems: "center", gap: 18, padding: "18px 26px", borderRadius: 24, background: "rgba(255,75,75,0.18)", border: "1px solid rgba(255,75,75,0.55)" }}>
        <div style={{ color: theme.red, fontSize: 54, fontWeight: 950 }}>×</div>
        <div style={{ color: theme.red, fontSize: 38, fontWeight: 950 }}>{metric}</div>
      </div>
    </div>
  );
};
