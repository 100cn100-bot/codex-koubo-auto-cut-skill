import { useCurrentFrame } from "remotion";
import { stagger } from "./animations";
import { theme } from "../theme";

type MetricBox = {
  label: string;
  value: string;
  caption?: string;
  tone?: "light" | "green" | "gold" | "blue" | "red";
};

type Props = {
  left: MetricBox;
  right: MetricBox;
  arrowLabel?: string;
};

const colorFor = (tone?: MetricBox["tone"]) => {
  if (tone === "green") return theme.green;
  if (tone === "gold") return theme.gold;
  if (tone === "blue") return theme.blue;
  if (tone === "red") return theme.red;
  return theme.textPrimary;
};

const MetricPanel = ({ box, index }: { box: MetricBox; index: number }) => {
  const frame = useCurrentFrame();
  const color = colorFor(box.tone);
  const isLight = box.tone === "light" || !box.tone;

  return (
    <div
      style={{
        width: 720,
        height: 320,
        borderRadius: 34,
        padding: "44px 50px",
        boxSizing: "border-box",
        fontFamily: theme.font,
        color: theme.textPrimary,
        background: `linear-gradient(145deg, rgba(7,9,13,0.92), rgba(12,14,18,0.78), ${isLight ? "rgba(255,255,255,0.035)" : `${color}16`})`,
        border: `2px solid ${isLight ? "rgba(255,255,255,0.25)" : `${color}66`}`,
        boxShadow: `0 26px 86px rgba(0,0,0,0.44), inset 0 1px 1px rgba(255,255,255,0.12), 0 0 60px ${isLight ? "rgba(255,255,255,0.06)" : `${color}22`}`,
        ...stagger(frame, index, 7),
      }}
    >
      <div
        style={{
          color: isLight ? "rgba(255,255,255,0.62)" : color,
          fontSize: 27,
          lineHeight: 1,
          fontWeight: 950,
          letterSpacing: 7,
        }}
      >
        {box.label}
      </div>
      <div
        style={{
          marginTop: 30,
          color,
          fontSize: 94,
          lineHeight: 0.92,
          fontWeight: 950,
          letterSpacing: -1,
          textShadow: isLight ? "none" : `0 0 40px ${color}55`,
          whiteSpace: "nowrap",
        }}
      >
        {box.value}
      </div>
      {box.caption ? (
        <div
          style={{
            marginTop: 22,
            color: theme.textPrimary,
            fontSize: 36,
            lineHeight: 1,
            fontWeight: 900,
            whiteSpace: "nowrap",
          }}
        >
          {box.caption}
        </div>
      ) : null}
    </div>
  );
};

export const MetricFlowCompare = ({ left, right, arrowLabel }: Props) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        left: 72,
        top: 354,
        width: 1776,
        display: "grid",
        gridTemplateColumns: "720px 180px 720px",
        alignItems: "center",
        gap: 78,
      }}
    >
      <MetricPanel box={left} index={0} />
      <div
        style={{
          color: theme.green,
          fontFamily: theme.font,
          textAlign: "center",
          fontSize: 82,
          lineHeight: 1,
          fontWeight: 800,
          textShadow: `0 0 42px ${theme.green}55`,
          ...stagger(frame, 1, 7),
        }}
      >
        →
        {arrowLabel ? (
          <div
            style={{
              marginTop: 14,
              color: "rgba(255,255,255,0.62)",
              fontSize: 20,
              lineHeight: 1,
              fontWeight: 900,
              letterSpacing: 3,
            }}
          >
            {arrowLabel}
          </div>
        ) : null}
      </div>
      <MetricPanel box={right} index={2} />
    </div>
  );
};
