import { useCurrentFrame } from "remotion";
import { stagger } from "./animations";
import { theme } from "../theme";

type Props = {
  title?: string;
  count?: string;
  cards?: string[];
};

export const CalendarOutput = ({ title = "一天完成", count = "2-3条预告", cards = ["预告 A", "预告 B", "预告 C"] }: Props) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", left: 80, top: 230, width: 820, fontFamily: theme.font }}>
      <div style={{ color: theme.blue, fontSize: 24, fontWeight: 900 }}>{title}</div>
      <div style={{ marginTop: 8, color: theme.gold, fontSize: 78, lineHeight: 1, fontWeight: 950 }}>{count}</div>
      <div style={{ marginTop: 34, display: "flex", gap: 16 }}>
        {cards.map((card, index) => (
          <div key={card} style={{ width: 190, height: 150, borderRadius: 24, padding: 22, background: index < 2 ? "rgba(255,255,255,0.9)" : theme.yellow, color: "#111318", boxShadow: "0 20px 62px rgba(0,0,0,0.35)", ...stagger(frame, index, 5) }}>
            <div style={{ fontSize: 46, fontWeight: 950 }}>✓</div>
            <div style={{ marginTop: 12, fontSize: 24, fontWeight: 900 }}>{card}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
