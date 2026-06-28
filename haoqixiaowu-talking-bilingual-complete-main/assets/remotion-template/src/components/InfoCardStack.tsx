import { useCurrentFrame } from "remotion";
import { stagger } from "./animations";
import { theme, toneColor } from "../theme";

type Card = {
  title: string;
  body?: string;
  badge?: string;
  tone?: string;
};

export const InfoCardStack = ({ cards = [] as Card[], layout = "grid" }) => {
  const frame = useCurrentFrame();
  const isCascade = layout === "cascade";
  return (
    <div
      style={{
        position: "absolute",
        left: 78,
        top: 430,
        width: 820,
        display: "grid",
        gridTemplateColumns: isCascade ? "1fr" : "repeat(2, 1fr)",
        gap: 16,
        fontFamily: theme.font,
      }}
    >
      {cards.map((card, index) => {
        const accent = card.tone === "accent";
        const dark = card.tone === "dark";
        const bg = accent ? toneColor("accent") : dark ? "rgba(12,14,18,0.88)" : "rgba(255,255,255,0.88)";
        const fg = accent || !dark ? "#111318" : "#fff";
        return (
          <div
            key={`${card.title}-${index}`}
            style={{
              minHeight: 92,
              padding: "20px 24px",
              borderRadius: 22,
              background: bg,
              color: fg,
              border: "1px solid rgba(255,255,255,0.16)",
              boxShadow: "0 18px 48px rgba(0,0,0,0.3)",
              transform: `${stagger(frame, index).transform} rotate(${isCascade ? index * -1.4 : 0}deg)`,
              opacity: stagger(frame, index).opacity,
            }}
          >
            <div style={{ fontSize: 29, fontWeight: 900 }}>{card.title}</div>
            {card.body ? <div style={{ marginTop: 8, fontSize: 20, opacity: 0.72, fontWeight: 700 }}>{card.body}</div> : null}
          </div>
        );
      })}
    </div>
  );
};
