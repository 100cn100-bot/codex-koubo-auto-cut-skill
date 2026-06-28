import { useCurrentFrame, useVideoConfig } from "remotion";
import { scalePop } from "./animations";
import { theme } from "../theme";

type Props = {
  eyebrow?: string;
  title: string;
  secondary?: string;
  variant?: "pill" | "square";
  position?: "center" | "left";
};

export const GlassConceptCard = ({
  eyebrow,
  title,
  secondary,
  variant = "pill",
  position = "center",
}: Props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const isPill = variant === "pill";
  const width = isPill ? 1040 : 610;
  const height = isPill ? 220 : 430;
  const left = position === "left" ? 92 : (1920 - width) / 2;
  const top = isPill ? 410 : 315;

  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
        borderRadius: isPill ? 999 : 78,
        padding: isPill ? "0 82px" : "54px 64px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: isPill ? "row" : "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isPill ? 34 : 18,
        fontFamily: theme.font,
        color: theme.textPrimary,
        overflow: "hidden",
        background:
          "linear-gradient(120deg, rgba(18,74,150,0.50), rgba(45,180,218,0.36) 46%, rgba(246,184,63,0.34))",
        border: "2px solid rgba(255,255,255,0.35)",
        boxShadow:
          "inset 0 1px 2px rgba(255,255,255,0.58), inset 0 -28px 90px rgba(255,255,255,0.08), 0 28px 90px rgba(0,0,0,0.38), 0 0 80px rgba(78,163,255,0.18)",
        backdropFilter: "blur(22px) saturate(145%)",
        WebkitBackdropFilter: "blur(22px) saturate(145%)",
        transformOrigin: "center",
        ...scalePop(frame, fps),
      }}
    >
      <div
        style={{
          position: "absolute",
          left: -120,
          top: -90,
          width: 430,
          height: 430,
          borderRadius: 999,
          background: "rgba(78,163,255,0.38)",
          filter: "blur(44px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -90,
          bottom: -120,
          width: 400,
          height: 360,
          borderRadius: 999,
          background: "rgba(246,184,63,0.24)",
          filter: "blur(46px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(155deg, rgba(255,255,255,0.28), rgba(255,255,255,0.04) 38%, rgba(255,255,255,0.13))",
          pointerEvents: "none",
        }}
      />
      {eyebrow ? (
        <div
          style={{
            position: "relative",
            fontSize: isPill ? 78 : 54,
            lineHeight: 1,
            fontWeight: 950,
            letterSpacing: 0,
            textShadow: "0 4px 18px rgba(0,0,0,0.34)",
            whiteSpace: "nowrap",
          }}
        >
          {eyebrow}
        </div>
      ) : null}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: isPill ? "row" : "column",
          alignItems: "center",
          gap: isPill ? 26 : 10,
          minWidth: 0,
        }}
      >
        <div
          style={{
            fontSize: isPill ? 76 : 60,
            lineHeight: 1.04,
            fontWeight: 930,
            letterSpacing: 0,
            whiteSpace: isPill ? "nowrap" : "normal",
            textAlign: "center",
            textShadow: "0 4px 18px rgba(0,0,0,0.34)",
          }}
        >
          {title}
        </div>
        {secondary ? (
          <div
            style={{
              fontSize: isPill ? 70 : 48,
              lineHeight: 1.08,
              fontWeight: 420,
              letterSpacing: 0,
              whiteSpace: isPill ? "nowrap" : "normal",
              color: "rgba(255,255,255,0.82)",
              textAlign: "center",
              textShadow: "0 4px 16px rgba(0,0,0,0.3)",
            }}
          >
            {secondary}
          </div>
        ) : null}
      </div>
    </div>
  );
};
