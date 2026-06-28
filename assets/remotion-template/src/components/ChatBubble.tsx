import { useCurrentFrame } from "remotion";
import { stagger } from "./animations";
import { theme } from "../theme";

type Bubble = {
  speaker: string;
  text: string;
  tone?: "dark" | "accent" | "red";
};

type Props = {
  bubbles?: Bubble[];
};

export const ChatBubble = ({ bubbles = [] }: Props) => {
  const frame = useCurrentFrame();
  const list = bubbles.length ? bubbles : [{ speaker: "老板", text: "能不能直接AI剪辑？", tone: "accent" as const }];
  return (
    <div style={{ position: "absolute", left: 80, top: 230, width: 760, fontFamily: theme.font }}>
      {list.map((bubble, index) => {
        const accent = bubble.tone === "accent";
        const red = bubble.tone === "red";
        return (
          <div key={`${bubble.speaker}-${index}`} style={{ marginBottom: 18, padding: "22px 26px", borderRadius: 28, background: accent ? theme.yellow : red ? "rgba(255,75,75,0.22)" : "rgba(12,14,18,0.82)", color: accent ? "#111318" : theme.textPrimary, border: "1px solid rgba(255,255,255,0.16)", boxShadow: "0 18px 58px rgba(0,0,0,0.34)", ...stagger(frame, index, 8) }}>
            <div style={{ fontSize: 21, fontWeight: 900, opacity: 0.72 }}>{bubble.speaker}</div>
            <div style={{ marginTop: 8, fontSize: 36, lineHeight: 1.16, fontWeight: 950 }}>{bubble.text}</div>
          </div>
        );
      })}
    </div>
  );
};
