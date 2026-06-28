import { useCurrentFrame } from "remotion";
import { stagger } from "./animations";
import { theme } from "../theme";

type Props = {
  title?: string;
  from?: string;
  to?: string;
  items?: string[];
};

export const FunnelSelect = ({ title = "筛选漏斗", from = "8个方向", to = "3条预告", items = [] }: Props) => {
  const frame = useCurrentFrame();
  const list = items.length ? items : ["方向01", "方向02", "方向03", "方向04", "方向05", "方向06", "方向07", "方向08"];

  return (
    <div style={{ position: "absolute", left: 80, top: 250, width: 900, fontFamily: theme.font }}>
      <div style={{ color: theme.blue, fontSize: 24, fontWeight: 900, marginBottom: 18 }}>{title}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, width: 650 }}>
        {list.slice(0, 8).map((item, index) => (
          <div key={item} style={{ padding: "17px 18px", borderRadius: 18, background: index < 3 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.16)", color: index < 3 ? "#101114" : theme.textPrimary, fontSize: 22, fontWeight: 900, textAlign: "center", ...stagger(frame, index, 3) }}>
            {item}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 18, ...stagger(frame, 9, 3) }}>
        <div style={{ color: theme.textSecondary, fontSize: 30, fontWeight: 900 }}>{from}</div>
        <div style={{ width: 150, height: 54, background: theme.yellow, clipPath: "polygon(0 0, 78% 0, 100% 50%, 78% 100%, 0 100%, 18% 50%)" }} />
        <div style={{ color: theme.gold, fontSize: 44, fontWeight: 950 }}>{to}</div>
      </div>
    </div>
  );
};
