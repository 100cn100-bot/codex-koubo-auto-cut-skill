import { interpolate, useCurrentFrame } from "remotion";
import { fadeUp } from "./animations";
import { theme } from "../theme";

type Props = {
  title?: string;
  lines?: string[];
  highlights?: number[];
  rotate?: number;
};

export const DocumentOverlay = ({ title = "Document", lines = [], highlights = [], rotate = -3 }: Props) => {
  const frame = useCurrentFrame();
  const sweep = interpolate(frame, [12, 54], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        right: 120,
        top: 170,
        width: 610,
        minHeight: 430,
        borderRadius: 28,
        background: "rgba(255,255,255,0.92)",
        color: "#101114",
        padding: 34,
        boxShadow: "0 28px 90px rgba(0,0,0,0.45)",
        fontFamily: theme.font,
        transform: `${fadeUp(frame, 4).transform} rotate(${rotate}deg)`,
        opacity: fadeUp(frame, 4).opacity,
      }}
    >
      <div style={{ fontSize: 26, fontWeight: 950, marginBottom: 26 }}>{title}</div>
      {lines.map((line, index) => {
        const highlighted = highlights.includes(index);
        return (
          <div key={`${line}-${index}`} style={{ position: "relative", marginBottom: 18, fontSize: 23, fontWeight: 760, lineHeight: 1.25 }}>
            {highlighted ? (
              <div
                style={{
                  position: "absolute",
                  left: -8,
                  top: 2,
                  height: 30,
                  width: `${Math.max(14, sweep * 100)}%`,
                  background: "rgba(246,184,63,0.38)",
                  borderRadius: 8,
                }}
              />
            ) : null}
            <span style={{ position: "relative" }}>{line}</span>
          </div>
        );
      })}
    </div>
  );
};
