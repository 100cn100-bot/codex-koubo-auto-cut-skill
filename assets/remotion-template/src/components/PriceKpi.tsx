import { useCurrentFrame, useVideoConfig } from "remotion";
import { scalePop } from "./animations";
import { theme, toneColor } from "../theme";

type Props = {
  value?: string;
  label?: string;
  tone?: string;
};

export const PriceKpi = ({ value, label, tone = "gold" }: Props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        left: 84,
        top: 292,
        fontFamily: theme.font,
        color: toneColor(tone),
        transformOrigin: "left center",
        ...scalePop(frame, fps, 4),
      }}
    >
      <div style={{ fontSize: 122, lineHeight: 0.9, fontWeight: 950 }}>{value}</div>
      {label ? <div style={{ marginTop: 18, color: theme.textSecondary, fontSize: 29, fontWeight: 850 }}>{label}</div> : null}
    </div>
  );
};
