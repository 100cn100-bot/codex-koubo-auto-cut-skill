import { useCurrentFrame, useVideoConfig } from "remotion";
import { scalePop, stagger } from "./animations";
import { theme } from "../theme";

type Props = {
  title?: string;
  subtitle?: string;
  actions?: string[];
};

export const CTAComment = ({ title = "你的工作流，哪里最适合AI？", subtitle = "留言或私信，一起拆一个能落地的提效点。", actions = ["留言", "私信", "工作流诊断"] }: Props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: 80, top: 160, width: 920, fontFamily: theme.font }}>
      <div style={{ color: theme.textPrimary, fontSize: 76, lineHeight: 1.04, fontWeight: 950, transformOrigin: "left top", ...scalePop(frame, fps) }}>{title}</div>
      <div style={{ marginTop: 24, color: theme.textSecondary, fontSize: 31, fontWeight: 800 }}>{subtitle}</div>
      <div style={{ marginTop: 38, display: "flex", gap: 16 }}>
        {actions.map((action, index) => (
          <div key={action} style={{ padding: "16px 24px", borderRadius: 999, background: index === 1 ? theme.yellow : "rgba(255,255,255,0.14)", color: index === 1 ? "#111318" : theme.textPrimary, fontSize: 25, fontWeight: 950, ...stagger(frame, index, 6) }}>{action}</div>
        ))}
      </div>
    </div>
  );
};
