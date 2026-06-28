import { useCurrentFrame } from "remotion";
import { fadeUp } from "./animations";
import { theme } from "../theme";

type Props = {
  title: string;
  subtitle?: string;
  tone?: "green" | "gold" | "light";
};

const backgroundFor = (tone?: Props["tone"]) => {
  if (tone === "green") return "linear-gradient(135deg, rgba(208,255,218,0.98), rgba(196,255,210,0.96))";
  if (tone === "gold") return "linear-gradient(135deg, rgba(255,248,216,0.98), rgba(255,239,190,0.96))";
  return "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(247,247,242,0.96))";
};

export const SpeechBubbleCard = ({ title, subtitle, tone = "green" }: Props) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        left: 82,
        top: 160,
        width: 1220,
        minHeight: 320,
        padding: "42px 50px 72px",
        boxSizing: "border-box",
        borderRadius: 48,
        background: backgroundFor(tone),
        boxShadow: "0 18px 54px rgba(0,0,0,0.24)",
        ...fadeUp(frame, 0, 16),
      }}
    >
      <div
        style={{
          color: "#153523",
          fontFamily: theme.font,
          fontSize: 76,
          lineHeight: 1.06,
          fontWeight: 950,
          maxWidth: "100%",
          overflowWrap: "break-word",
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            marginTop: 20,
            color: "rgba(21,53,35,0.74)",
            fontFamily: theme.font,
            fontSize: 28,
            lineHeight: 1.2,
            fontWeight: 800,
            maxWidth: "92%",
          }}
        >
          {subtitle}
        </div>
      ) : null}
      <div
        style={{
          position: "absolute",
          left: 320,
          bottom: -62,
          width: 184,
          height: 126,
          background: backgroundFor(tone),
          clipPath: "polygon(0 0, 100% 0, 48% 100%)",
          filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.12))",
        }}
      />
    </div>
  );
};
