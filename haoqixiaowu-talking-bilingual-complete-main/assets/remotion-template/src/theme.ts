export const theme = {
  bgDark: "#050608",
  panelDark: "rgba(12, 14, 18, 0.72)",
  panelLight: "rgba(255, 255, 255, 0.88)",
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255,255,255,0.72)",
  muted: "rgba(255,255,255,0.46)",
  yellow: "#F6B83F",
  gold: "#FFCC52",
  blue: "#4EA3FF",
  red: "#FF4B4B",
  green: "#38D978",
  font: '"PingFang SC", "Hiragino Sans GB", "Inter", "Arial", sans-serif',
};

export const toneColor = (tone?: string) => {
  switch (tone) {
    case "green":
      return theme.green;
    case "orange":
    case "gold":
      return theme.gold;
    case "blue":
      return theme.blue;
    case "red":
      return theme.red;
    case "accent":
      return theme.yellow;
    case "dark":
      return "#111318";
    case "light":
      return "rgba(255,255,255,0.9)";
    default:
      return theme.yellow;
  }
};
