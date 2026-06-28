import { useCurrentFrame, useVideoConfig } from "remotion";
import { scalePop } from "./animations";
import { theme } from "../theme";

type Props = {
  verdict?: string;
  title?: string;
  subtitle?: string;
  badges?: string[];
};

export const FinalVerdict = ({ verdict, title, subtitle, badges = [] }: Props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 76,
          top: 154,
          width: 900,
          fontFamily: theme.font,
          transformOrigin: "left top",
          ...scalePop(frame, fps),
        }}
      >
        <div style={{ color: theme.yellow, fontSize: 30, fontWeight: 950, letterSpacing: 1.2 }}>{verdict}</div>
        <div style={{ marginTop: 12, color: theme.textPrimary, fontSize: 92, lineHeight: 1.02, fontWeight: 950 }}>{title}</div>
        {subtitle ? <div style={{ marginTop: 24, color: theme.textSecondary, fontSize: 32, fontWeight: 780 }}>{subtitle}</div> : null}
      </div>
      <div style={{ position: "absolute", left: 80, top: 650, display: "flex", gap: 14, flexWrap: "wrap", width: 760, fontFamily: theme.font }}>
        {badges.map((label, index) => (
          <div
            key={label}
            style={{
              padding: "13px 20px",
              borderRadius: 999,
              background: index === 1 ? theme.yellow : "rgba(255,255,255,0.14)",
              color: index === 1 ? "#111318" : theme.textPrimary,
              fontSize: 23,
              fontWeight: 950,
              boxShadow: "0 16px 40px rgba(0,0,0,0.28)",
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </>
  );
};
