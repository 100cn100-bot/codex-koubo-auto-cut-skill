import { useCurrentFrame } from "remotion";
import { fadeUp } from "./animations";
import { theme } from "../theme";

type Props = {
  title: string;
  subtitle?: string;
  tone?: "light" | "green" | "gold";
};

const backgroundFor = (tone?: Props["tone"]) => {
  if (tone === "green") return "linear-gradient(135deg, rgba(225,255,234,0.98), rgba(213,255,228,0.96))";
  if (tone === "gold") return "linear-gradient(135deg, rgba(255,248,227,0.98), rgba(255,241,205,0.96))";
  return "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(248,248,244,0.96))";
};

const borderFor = (tone?: Props["tone"]) => {
  if (tone === "green") return "rgba(56,217,120,0.42)";
  if (tone === "gold") return "rgba(246,184,63,0.42)";
  return "rgba(255,255,255,0.42)";
};

export const HeadlineBanner = ({ title, subtitle, tone = "light" }: Props) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        left: 58,
        top: 84,
        width: 1580,
        minHeight: 180,
        padding: "34px 46px",
        boxSizing: "border-box",
        borderRadius: 44,
        background: backgroundFor(tone),
        border: `2px solid ${borderFor(tone)}`,
        boxShadow: "0 16px 48px rgba(0,0,0,0.22)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        ...fadeUp(frame, 0, 16),
      }}
    >
      <div
        style={{
          color: "#141414",
          fontFamily: theme.font,
          fontSize: 78,
          lineHeight: 1.02,
          fontWeight: 950,
          letterSpacing: 0,
          maxWidth: "100%",
          overflowWrap: "break-word",
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            marginTop: 18,
            color: "rgba(20,20,20,0.7)",
            fontFamily: theme.font,
            fontSize: 28,
            lineHeight: 1.18,
            fontWeight: 800,
            maxWidth: "100%",
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
};
