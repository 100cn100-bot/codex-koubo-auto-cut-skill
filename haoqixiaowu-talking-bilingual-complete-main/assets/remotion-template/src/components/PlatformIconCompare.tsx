import { useCurrentFrame } from "remotion";
import { stagger } from "./animations";
import { theme } from "../theme";

type Platform = {
  name: string;
  icon?: string;
  brandColor?: string;
  background?: string;
};

type Props = {
  platforms?: Platform[];
  relation?: "x" | "plus" | "arrow";
  title: string;
  highlight?: string;
  subtitle?: string;
};

const relationSymbol = (relation: Props["relation"]) => {
  if (relation === "plus") return "+";
  if (relation === "arrow") return "→";
  return "×";
};

const iconFor = (platform: Platform) => {
  const normalized = platform.name.toLowerCase();
  if (platform.icon) return platform.icon;
  if (normalized.includes("youtube")) return "▶";
  if (normalized.includes("google")) return "G";
  if (normalized.includes("chatgpt") || normalized.includes("openai")) return "AI";
  if (normalized.includes("剪映") || normalized.includes("capcut")) return "剪";
  if (normalized.includes("notion")) return "N";
  if (normalized.includes("midjourney")) return "MJ";
  return platform.name.slice(0, 2).toUpperCase();
};

const colorFor = (platform: Platform) => {
  const normalized = platform.name.toLowerCase();
  if (platform.brandColor) return platform.brandColor;
  if (normalized.includes("youtube")) return "#ff2b1c";
  if (normalized.includes("google")) return "#4d8df7";
  if (normalized.includes("chatgpt") || normalized.includes("openai")) return "#10a37f";
  if (normalized.includes("剪映") || normalized.includes("capcut")) return "#00d6ff";
  if (normalized.includes("notion")) return "#111111";
  if (normalized.includes("midjourney")) return "#8f7cff";
  return theme.blue;
};

export const PlatformIconCompare = ({
  platforms = [],
  relation = "x",
  title,
  highlight,
  subtitle,
}: Props) => {
  const frame = useCurrentFrame();
  const visiblePlatforms = platforms.slice(0, 4);
  const symbol = relationSymbol(relation);

  return (
    <div
      style={{
        position: "absolute",
        left: 72,
        top: 126,
        width: 1020,
        fontFamily: theme.font,
        color: theme.textPrimary,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 48,
          ...stagger(frame, 0, 1),
        }}
      >
        {visiblePlatforms.map((platform, index) => {
          const color = colorFor(platform);
          const icon = iconFor(platform);
          return (
            <div key={`${platform.name}-${index}`} style={{ display: "flex", alignItems: "center", gap: 48 }}>
              <div
                style={{
                  width: 248,
                  height: 248,
                  borderRadius: 48,
                  display: "grid",
                  placeItems: "center",
                  background: platform.background ?? "#fff",
                  boxShadow: "0 28px 72px rgba(0,0,0,0.42)",
                  border: "1px solid rgba(255,255,255,0.24)",
                  ...stagger(frame, index, 5),
                }}
              >
                {icon === "▶" ? (
                  <div
                    style={{
                      width: 172,
                      height: 122,
                      borderRadius: 28,
                      display: "grid",
                      placeItems: "center",
                      background: color,
                    }}
                  >
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: "31px solid transparent",
                        borderBottom: "31px solid transparent",
                        borderLeft: "50px solid #fff",
                        marginLeft: 12,
                      }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      color,
                      fontSize: icon.length > 1 ? 74 : 148,
                      lineHeight: 1,
                      fontWeight: 950,
                      letterSpacing: 0,
                    }}
                  >
                    {icon}
                  </div>
                )}
              </div>
              {index < visiblePlatforms.length - 1 ? (
                <div
                  style={{
                    color: "rgba(255,255,255,0.54)",
                    fontSize: 72,
                    lineHeight: 1,
                    fontWeight: 300,
                    ...stagger(frame, index + 1, 5),
                  }}
                >
                  {symbol}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 76, ...stagger(frame, 3, 6) }}>
        <div style={{ fontSize: 72, lineHeight: 1.05, fontWeight: 950, letterSpacing: 0 }}>
          {highlight && title.includes(highlight) ? (
            <>
              {title.split(highlight)[0]}
              <span style={{ color: theme.red }}>{highlight}</span>
              {title.split(highlight).slice(1).join(highlight)}
            </>
          ) : (
            title
          )}
        </div>
        {subtitle ? (
          <div
            style={{
              marginTop: 28,
              maxWidth: 860,
              color: "rgba(255,255,255,0.72)",
              fontSize: 34,
              lineHeight: 1.25,
              fontWeight: 850,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
    </div>
  );
};
