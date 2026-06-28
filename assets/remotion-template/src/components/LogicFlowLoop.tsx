import { useCurrentFrame } from "remotion";
import { stagger } from "./animations";
import { theme } from "../theme";

type FlowStep = {
  title: string;
  subtitle?: string;
  icon?: string;
  tone?: "blue" | "gold" | "green" | "red";
};

type Props = {
  title: string;
  subtitle?: string;
  steps?: FlowStep[];
  loop?: boolean;
};

const colorFor = (tone?: FlowStep["tone"]) => {
  if (tone === "gold") return theme.gold;
  if (tone === "green") return theme.green;
  if (tone === "red") return theme.red;
  return theme.blue;
};

export const LogicFlowLoop = ({ title, subtitle, steps = [], loop = false }: Props) => {
  const frame = useCurrentFrame();
  const visibleSteps = steps.slice(0, 5);
  const containerLeft = 96;
  const containerWidth = 1728;
  const safePaddingX = 96;
  const cardCount = Math.max(1, visibleSteps.length);
  const arrowCount = Math.max(0, cardCount - 1);
  const baseStepWidth = visibleSteps.length <= 4 ? 330 : 276;
  const baseGap = visibleSteps.length <= 4 ? 86 : 58;
  const maxContentWidth = containerWidth - safePaddingX * 2;
  const rawContentWidth = cardCount * baseStepWidth + arrowCount * baseGap * 2;
  const widthScale = Math.min(1, maxContentWidth / rawContentWidth);
  const stepWidth = Math.max(220, Math.round(baseStepWidth * widthScale));
  const gap = Math.max(20, Math.round(baseGap * widthScale));
  const cardHeight = Math.max(300, Math.round(382 * Math.min(1, 0.92 + widthScale * 0.08)));
  const titleSize = Math.max(32, Math.round(48 * widthScale));
  const subtitleSize = Math.max(14, Math.round(20 * widthScale));
  const arrowSize = Math.max(42, Math.round(78 * widthScale));
  const topMargin = Math.max(180, Math.round(288 * Math.min(1, 0.9 + widthScale * 0.1)));

  return (
    <div
      style={{
        position: "absolute",
        left: containerLeft,
        top: 76,
        width: containerWidth,
        fontFamily: theme.font,
        color: theme.textPrimary,
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: theme.blue,
          fontSize: 40,
          lineHeight: 1,
          fontWeight: 950,
          letterSpacing: 12,
          textShadow: `0 0 30px ${theme.blue}55`,
          ...stagger(frame, 0, 1),
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            marginTop: 16,
            textAlign: "center",
            color: "rgba(255,255,255,0.62)",
            fontSize: 24,
            lineHeight: 1,
            fontWeight: 850,
            letterSpacing: 4,
            ...stagger(frame, 1, 1),
          }}
        >
          {subtitle}
        </div>
      ) : null}

      <div
        style={{
          marginTop: topMargin,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap,
          width: maxContentWidth,
          paddingLeft: safePaddingX / 2,
          paddingRight: safePaddingX / 2,
          boxSizing: "content-box",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {visibleSteps.map((step, index) => {
          const color = colorFor(step.tone);
          const iconText = step.icon ?? String(index + 1);
          const iconLength = Array.from(iconText).length;
          const iconBoxWidth = Math.max(84, Math.round((iconLength > 1 ? 132 : 114) * widthScale));
          const iconBoxHeight = Math.max(84, Math.round(114 * widthScale));
          const iconTextSize =
            iconLength <= 1
              ? Math.max(30, Math.round(58 * widthScale))
              : iconLength === 2
                ? Math.max(24, Math.round(40 * widthScale))
                : Math.max(18, Math.round(28 * widthScale));
          return (
            <div key={`${step.title}-${index}`} style={{ display: "flex", alignItems: "center", gap }}>
              <div
                style={{
                  width: stepWidth,
                  height: cardHeight,
                  borderRadius: Math.max(28, Math.round(38 * widthScale)),
                  display: "grid",
                  gridTemplateRows: `${Math.max(104, Math.round(150 * widthScale))}px 1fr ${Math.max(50, Math.round(70 * widthScale))}px`,
                  placeItems: "center",
                  padding: `${Math.max(20, Math.round(34 * widthScale))}px ${Math.max(18, Math.round(28 * widthScale))}px ${Math.max(18, Math.round(30 * widthScale))}px`,
                  boxSizing: "border-box",
                  background: `linear-gradient(145deg, rgba(8,10,14,0.84), rgba(12,14,18,0.72), ${color}14)`,
                  border: `2px solid ${color}66`,
                  boxShadow: `0 26px 82px rgba(0,0,0,0.42), inset 0 1px 1px rgba(255,255,255,0.12), 0 0 58px ${color}1f`,
                  overflow: "hidden",
                  ...stagger(frame, index, 6),
                }}
              >
                <div
                  style={{
                    width: iconBoxWidth,
                    height: iconBoxHeight,
                    borderRadius: Math.max(18, Math.round(26 * widthScale)),
                    display: "grid",
                    placeItems: "center",
                    color,
                    fontSize: iconTextSize,
                    lineHeight: iconLength > 1 ? 1.05 : 1,
                    fontWeight: 950,
                    textAlign: "center",
                    background: `${color}18`,
                    border: `2px solid ${color}4f`,
                    boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.08), 0 0 38px ${color}22`,
                    padding: iconLength > 1 ? "6px 10px" : 0,
                    boxSizing: "border-box",
                  }}
                >
                  {iconText}
                </div>
                <div
                  style={{
                    alignSelf: "end",
                    color: theme.textPrimary,
                    fontSize: titleSize,
                    lineHeight: 1.05,
                    fontWeight: 950,
                    textAlign: "center",
                    letterSpacing: 0,
                    whiteSpace: "nowrap",
                    maxWidth: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {step.title}
                </div>
                {step.subtitle ? (
                  <div
                    style={{
                      alignSelf: "end",
                      color,
                      fontSize: subtitleSize,
                      lineHeight: 1,
                      fontWeight: 950,
                      letterSpacing: Math.max(2, Math.round(5 * widthScale)),
                      textAlign: "center",
                      whiteSpace: "nowrap",
                      maxWidth: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {step.subtitle}
                  </div>
                ) : null}
              </div>
              {index < visibleSteps.length - 1 ? (
                <div
                  style={{
                    color: "rgba(255,255,255,0.74)",
                    fontSize: arrowSize,
                    lineHeight: 1,
                    fontWeight: 300,
                    ...stagger(frame, index + 1, 6),
                  }}
                >
                  →
                </div>
              ) : null}
            </div>
          );
        })}
        {loop && visibleSteps.length > 2 ? (
          <div
            style={{
              position: "absolute",
              left: Math.max(180, Math.round(318 * widthScale)),
              right: Math.max(180, Math.round(318 * widthScale)),
              bottom: -Math.max(54, Math.round(86 * widthScale)),
              height: Math.max(50, Math.round(74 * widthScale)),
              borderBottom: `3px solid ${theme.blue}66`,
              borderLeft: `3px solid ${theme.blue}66`,
              borderRight: `3px solid ${theme.blue}66`,
              borderRadius: "0 0 42px 42px",
              ...stagger(frame, visibleSteps.length + 1, 5),
            }}
          >
            <div
              style={{
                position: "absolute",
                left: -Math.max(12, Math.round(18 * widthScale)),
                top: -Math.max(10, Math.round(16 * widthScale)),
                color: theme.blue,
                fontSize: Math.max(34, Math.round(54 * widthScale)),
                lineHeight: 1,
              }}
            >
              ↑
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
