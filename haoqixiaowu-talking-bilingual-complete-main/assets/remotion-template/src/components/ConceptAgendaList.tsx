import { useCurrentFrame } from "remotion";
import { stagger } from "./animations";
import { theme } from "../theme";

type ConceptItem = {
  number?: string;
  title: string;
  subtitle?: string;
  icon?: string;
  tone?: "blue" | "gold" | "red" | "green";
  status?: "none" | "cross" | "check";
};

type Props = {
  items?: ConceptItem[];
  compact?: boolean;
};

const colorFor = (tone?: ConceptItem["tone"]) => {
  if (tone === "gold") return theme.gold;
  if (tone === "red") return theme.red;
  if (tone === "green") return theme.green;
  return theme.blue;
};

export const ConceptAgendaList = ({ items = [], compact = false }: Props) => {
  const frame = useCurrentFrame();
  const visibleItems = items.slice(0, compact ? 1 : 4);
  const maxHeight = compact ? 300 : 760;
  const outerTop = compact ? 390 : 230;
  const outerWidth = compact ? 930 : 1040;
  const itemCount = Math.max(1, visibleItems.length);
  const baseGap = compact ? 24 : 34;
  const defaultCardHeight = compact ? 210 : 210;
  const totalDefaultHeight = itemCount * defaultCardHeight + (itemCount - 1) * baseGap;
  const heightScale = Math.min(1, maxHeight / totalDefaultHeight);
  const gap = Math.max(compact ? 18 : 16, Math.round(baseGap * heightScale));
  const cardHeight = Math.max(compact ? 180 : 142, Math.round(defaultCardHeight * heightScale));
  const numberSize = Math.max(52, Math.round(82 * heightScale));
  const titleSize = Math.max(compact ? 42 : 34, Math.round(58 * heightScale));
  const subtitleSize = Math.max(compact ? 18 : 16, Math.round((compact ? 24 : 25) * heightScale));
  const gridTemplateColumns = compact
    ? `${Math.max(84, Math.round(96 * heightScale))}px 1fr ${Math.max(96, Math.round(112 * heightScale))}px`
    : `${Math.max(112, Math.round(160 * heightScale))}px ${Math.max(104, Math.round(128 * heightScale))}px 1fr`;
  const horizontalPadding = compact
    ? `${Math.max(22, Math.round(34 * heightScale))}px`
    : `${Math.max(24, Math.round(42 * heightScale))}px`;

  return (
    <div
      style={{
        position: "absolute",
        left: 76,
        top: outerTop,
        width: outerWidth,
        display: "flex",
        flexDirection: "column",
        gap,
        fontFamily: theme.font,
        maxHeight,
        overflow: "hidden",
      }}
    >
      {visibleItems.map((item, index) => {
        const color = colorFor(item.tone);
        const iconText = item.icon ?? "?";
        const iconLength = Array.from(iconText).length;
        const iconBoxWidth = compact
          ? Math.max(78, Math.round((iconLength > 1 ? 94 : 74) * heightScale))
          : Math.max(96, Math.round((iconLength > 1 ? 118 : 88) * heightScale));
        const iconBoxHeight = Math.max(compact ? 66 : 74, Math.round((compact ? 74 : 88) * heightScale));
        const iconFontSize =
          iconLength <= 1
            ? Math.max(compact ? 34 : 30, Math.round((compact ? 42 : 46) * heightScale))
            : iconLength === 2
              ? Math.max(24, Math.round(34 * heightScale))
              : Math.max(18, Math.round(26 * heightScale));
        return (
          <div
            key={`${item.title}-${index}`}
            style={{
              position: "relative",
              height: cardHeight,
              borderRadius: compact ? 34 : 28,
              display: "grid",
              gridTemplateColumns,
              alignItems: "center",
              gap: Math.max(compact ? 18 : 20, Math.round((compact ? 24 : 30) * heightScale)),
              padding: `0 ${horizontalPadding}`,
              boxSizing: "border-box",
              color: theme.textPrimary,
              overflow: "hidden",
              background: `linear-gradient(100deg, rgba(4,7,10,0.92), rgba(12,14,18,0.86), ${color}18)`,
              border: `1.5px solid ${color}55`,
              boxShadow: `0 22px 76px rgba(0,0,0,0.38), inset 0 1px 1px rgba(255,255,255,0.08), 0 0 58px ${color}18`,
              ...stagger(frame, index, 6),
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.015) 40%, rgba(255,255,255,0.04))",
              }}
            />
            {compact ? null : (
              <div
                style={{
                  position: "relative",
                  color,
                  fontSize: numberSize,
                  lineHeight: 1,
                  fontWeight: 950,
                  opacity: 0.86,
                  textShadow: `0 0 34px ${color}44`,
                }}
              >
                {item.number ?? String(index + 1).padStart(2, "0")}
              </div>
            )}
            <div
                style={{
                  position: "relative",
                  width: iconBoxWidth,
                  height: iconBoxHeight,
                  borderRadius: Math.max(18, Math.round(22 * heightScale)),
                  display: "grid",
                  placeItems: "center",
                  color,
                  fontSize: iconFontSize,
                  fontWeight: 950,
                  lineHeight: iconLength > 1 ? 1.05 : 1,
                  textAlign: "center",
                  background: `${color}18`,
                  border: `2px solid ${color}55`,
                  boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.08), 0 0 34px ${color}22`,
                  padding: iconLength > 1 ? "6px 8px" : 0,
                  boxSizing: "border-box",
                }}
              >
                {iconText}
              </div>
              <div style={{ position: "relative", minWidth: 0 }}>
                <div
                  style={{
                    fontSize: titleSize,
                    lineHeight: 1,
                    fontWeight: 950,
                    letterSpacing: 0,
                    whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.title}
              </div>
              {item.subtitle ? (
                <div
                  style={{
                    marginTop: Math.max(10, Math.round(18 * heightScale)),
                    color,
                    fontSize: subtitleSize,
                    lineHeight: 1,
                    fontWeight: 950,
                    letterSpacing: Math.max(2, Math.round(7 * heightScale)),
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.subtitle}
                </div>
              ) : null}
            </div>
            {compact && item.status !== "none" ? (
              <div
                style={{
                  position: "relative",
                  width: Math.max(68, Math.round(88 * heightScale)),
                  height: Math.max(68, Math.round(88 * heightScale)),
                  borderRadius: 999,
                  display: "grid",
                  placeItems: "center",
                  justifySelf: "end",
                  background: item.status === "check" ? theme.green : theme.red,
                  color: "#fff",
                  fontSize: Math.max(38, Math.round(58 * heightScale)),
                  lineHeight: 1,
                  fontWeight: 950,
                  boxShadow: `0 0 38px ${item.status === "check" ? theme.green : theme.red}88`,
                }}
              >
                {item.status === "check" ? "✓" : "×"}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
