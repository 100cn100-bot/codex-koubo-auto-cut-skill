import { useCurrentFrame } from "remotion";
import { stagger } from "./animations";
import { theme } from "../theme";

type Item = {
  title: string;
  subtitle?: string;
  icon?: string;
};

type Props = {
  items?: Item[];
  tone?: "green" | "light";
};

export const FocusListStack = ({ items = [], tone = "green" }: Props) => {
  const frame = useCurrentFrame();
  const visible = items.slice(0, 4);
  const bg = tone === "green"
    ? "linear-gradient(135deg, rgba(231,255,235,0.98), rgba(220,255,229,0.96))"
    : "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(247,247,242,0.96))";
  const border = tone === "green" ? "rgba(56,217,120,0.32)" : "rgba(255,255,255,0.42)";

  return (
    <div
      style={{
        position: "absolute",
        left: 54,
        top: 120,
        width: 1600,
        display: "flex",
        flexDirection: "column",
        gap: 28,
        fontFamily: theme.font,
      }}
    >
      {visible.map((item, index) => (
        <div
          key={`${item.title}-${index}`}
          style={{
            minHeight: 180,
            padding: "24px 34px",
            boxSizing: "border-box",
            borderRadius: 36,
            background: bg,
            border: `2px solid ${border}`,
            boxShadow: "0 14px 34px rgba(0,0,0,0.14)",
            display: "grid",
            gridTemplateColumns: "156px 1fr",
            alignItems: "center",
            gap: 28,
            ...stagger(frame, index, 5),
          }}
        >
          <div
            style={{
              width: 128,
              height: 128,
              borderRadius: 28,
              display: "grid",
              placeItems: "center",
              background: "#ffffff",
              boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
              color: "#1b3e2c",
              fontSize: 44,
              fontWeight: 900,
            }}
          >
            {item.icon ?? "AI"}
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                color: "#173828",
                fontSize: 62,
                lineHeight: 1.05,
                fontWeight: 950,
                maxWidth: "100%",
                overflowWrap: "break-word",
              }}
            >
              {item.title}
            </div>
            {subtitleLine(item.subtitle)}
          </div>
        </div>
      ))}
    </div>
  );
};

const subtitleLine = (subtitle?: string) => {
  if (!subtitle) return null;
  return (
    <div
      style={{
        marginTop: 12,
        color: "rgba(23,56,40,0.74)",
        fontSize: 26,
        lineHeight: 1.2,
        fontWeight: 800,
        maxWidth: "100%",
      }}
    >
      {subtitle}
    </div>
  );
};
