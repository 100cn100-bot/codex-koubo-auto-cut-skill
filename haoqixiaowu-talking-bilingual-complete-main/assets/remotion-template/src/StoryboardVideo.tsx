import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { FinalVerdict } from "./components/FinalVerdict";
import { InfoCardStack } from "./components/InfoCardStack";
import { PriceKpi } from "./components/PriceKpi";
import { DocumentOverlay } from "./components/DocumentOverlay";
import { ProgressCompare } from "./components/ProgressCompare";
import { FunnelSelect } from "./components/FunnelSelect";
import { BeforeAfterCompare } from "./components/BeforeAfterCompare";
import { RiskWarning } from "./components/RiskWarning";
import { CalendarOutput } from "./components/CalendarOutput";
import { SliderGauge } from "./components/SliderGauge";
import { ChatBubble } from "./components/ChatBubble";
import { CTAComment } from "./components/CTAComment";
import { GlassConceptCard } from "./components/GlassConceptCard";
import { DataMetricCard } from "./components/DataMetricCard";
import { ConceptAgendaList } from "./components/ConceptAgendaList";
import { PlatformIconCompare } from "./components/PlatformIconCompare";
import { LogicFlowLoop } from "./components/LogicFlowLoop";
import { PercentDonutStat } from "./components/PercentDonutStat";
import { MetricFlowCompare } from "./components/MetricFlowCompare";
import { HeadlineBanner } from "./components/HeadlineBanner";
import { SpeechBubbleCard } from "./components/SpeechBubbleCard";
import { FocusListStack } from "./components/FocusListStack";
import type { LayerTarget, Overlay, Scene, VideoSpec } from "./types";

const overlayLayer = (type: Overlay["type"]): LayerTarget => {
  switch (type) {
    case "chapter_number":
    case "final_verdict":
    case "glass_concept_card":
    case "headline_banner":
      return "titles";
    case "info_card_stack":
    case "concept_agenda_list":
    case "platform_icon_compare":
    case "logic_flow_loop":
    case "speech_bubble_card":
    case "focus_list_stack":
      return "cards";
    case "document_overlay":
      return "documents";
    case "price_kpi":
    case "progress_compare":
    case "risk_warning":
    case "calendar_output":
    case "slider_gauge":
    case "data_metric_card":
    case "percent_donut_stat":
    case "metric_flow_compare":
      return "kpis";
    case "funnel_select":
    case "before_after_compare":
    case "chat_bubble":
    case "cta_comment":
      return "cards";
    default:
      return "debug";
  }
};

const shouldRenderOverlay = (overlay: Overlay, layer: LayerTarget) => {
  if (layer === "all") {
    return true;
  }
  return (overlay.layer ?? overlayLayer(overlay.type)) === layer;
};

const renderOverlay = (overlay: Overlay) => {
  const props = overlay.props as Record<string, unknown>;

  switch (overlay.type) {
    case "info_card_stack":
      return <InfoCardStack {...(props as Parameters<typeof InfoCardStack>[0])} />;
    case "document_overlay":
      return <DocumentOverlay {...(props as Parameters<typeof DocumentOverlay>[0])} />;
    case "price_kpi":
      return <PriceKpi {...(props as Parameters<typeof PriceKpi>[0])} />;
    case "final_verdict":
      return <FinalVerdict {...(props as Parameters<typeof FinalVerdict>[0])} />;
    case "progress_compare":
      return <ProgressCompare {...(props as Parameters<typeof ProgressCompare>[0])} />;
    case "funnel_select":
      return <FunnelSelect {...(props as Parameters<typeof FunnelSelect>[0])} />;
    case "before_after_compare":
      return <BeforeAfterCompare {...(props as Parameters<typeof BeforeAfterCompare>[0])} />;
    case "risk_warning":
      return <RiskWarning {...(props as Parameters<typeof RiskWarning>[0])} />;
    case "calendar_output":
      return <CalendarOutput {...(props as Parameters<typeof CalendarOutput>[0])} />;
    case "slider_gauge":
      return <SliderGauge {...(props as Parameters<typeof SliderGauge>[0])} />;
    case "chat_bubble":
      return <ChatBubble {...(props as Parameters<typeof ChatBubble>[0])} />;
    case "cta_comment":
      return <CTAComment {...(props as Parameters<typeof CTAComment>[0])} />;
    case "glass_concept_card":
      return <GlassConceptCard {...(props as Parameters<typeof GlassConceptCard>[0])} />;
    case "data_metric_card":
      return <DataMetricCard {...(props as Parameters<typeof DataMetricCard>[0])} />;
    case "concept_agenda_list":
      return <ConceptAgendaList {...(props as Parameters<typeof ConceptAgendaList>[0])} />;
    case "platform_icon_compare":
      return <PlatformIconCompare {...(props as Parameters<typeof PlatformIconCompare>[0])} />;
    case "logic_flow_loop":
      return <LogicFlowLoop {...(props as Parameters<typeof LogicFlowLoop>[0])} />;
    case "percent_donut_stat":
      return <PercentDonutStat {...(props as Parameters<typeof PercentDonutStat>[0])} />;
    case "metric_flow_compare":
      return <MetricFlowCompare {...(props as Parameters<typeof MetricFlowCompare>[0])} />;
    case "headline_banner":
      return <HeadlineBanner {...(props as Parameters<typeof HeadlineBanner>[0])} />;
    case "speech_bubble_card":
      return <SpeechBubbleCard {...(props as Parameters<typeof SpeechBubbleCard>[0])} />;
    case "focus_list_stack":
      return <FocusListStack {...(props as Parameters<typeof FocusListStack>[0])} />;
    case "chapter_number":
      return (
        <div
          style={{
            position: "absolute",
            left: 70,
            top: 120,
            color: "rgba(255,255,255,0.12)",
            fontSize: 220,
            fontWeight: 950,
            fontFamily: "Inter, Arial, sans-serif",
          }}
        >
          {(overlay.props as { number?: string }).number}
        </div>
      );
    default:
      return null;
  }
};

const overlayFootprint = (overlay: Overlay) => {
  switch (overlay.type) {
    case "concept_agenda_list":
      return { width: 1040, height: 740, left: 76, top: 230 };
    case "logic_flow_loop":
      return { width: 1780, height: 760, left: 70, top: 76 };
    case "headline_banner":
      return { width: 1580, height: 220, left: 58, top: 84 };
    case "speech_bubble_card":
      return { width: 1220, height: 420, left: 82, top: 160 };
    case "focus_list_stack":
      return { width: 1600, height: 860, left: 54, top: 120 };
    case "metric_flow_compare":
      return { width: 1776, height: 320, left: 72, top: 354 };
    case "platform_icon_compare":
      return { width: 1020, height: 700, left: 72, top: 126 };
    case "data_metric_card":
      return { width: 850, height: 520, left: 96, top: 178 };
    case "before_after_compare":
      return { width: 930, height: 360, left: 80, top: 230 };
    case "funnel_select":
      return { width: 900, height: 420, left: 80, top: 250 };
    case "chat_bubble":
      return { width: 760, height: 380, left: 80, top: 230 };
    case "final_verdict":
      return { width: 900, height: 620, left: 76, top: 154 };
    case "risk_warning":
      return { width: 820, height: 340, left: 80, top: 190 };
    case "slider_gauge":
      return { width: 840, height: 180, left: 80, top: 330 };
    case "price_kpi":
      return { width: 520, height: 220, left: 84, top: 292 };
    default:
      return null;
  }
};

const overlayWrapperStyle = (overlay: Overlay) => {
  const requestedX = overlay.placement?.x ?? 0;
  const requestedY = overlay.placement?.y ?? 0;
  const requestedScale = overlay.placement?.scale ?? 1;
  const safeEnabled = overlay.safeBounds?.enabled ?? false;
  const marginX = overlay.safeBounds?.marginX ?? 56;
  const marginY = overlay.safeBounds?.marginY ?? 56;
  const footprint = overlayFootprint(overlay);

  let safeScale = 1;

  if (safeEnabled && footprint) {
    const availableWidth = 1920 - marginX * 2;
    const availableHeight = 1080 - marginY * 2;
    const widthScale = availableWidth / footprint.width;
    const heightScale = availableHeight / footprint.height;
    safeScale = Math.min(1, widthScale, heightScale);
  }

  const scale = Math.min(requestedScale, safeScale);
  let x = requestedX;
  let y = requestedY;

  if (safeEnabled && footprint) {
    const scaledLeft = footprint.left * scale;
    const scaledTop = footprint.top * scale;
    const scaledRight = (footprint.left + footprint.width) * scale;
    const scaledBottom = (footprint.top + footprint.height) * scale;

    const minX = marginX - scaledLeft;
    const maxX = 1920 - marginX - scaledRight;
    const minY = marginY - scaledTop;
    const maxY = 1080 - marginY - scaledBottom;

    x = Math.min(Math.max(requestedX, minX), maxX);
    y = Math.min(Math.max(requestedY, minY), maxY);
  }

  return {
    position: "absolute" as const,
    inset: 0,
    transform: `translate(${x}px, ${y}px) scale(${scale})`,
    transformOrigin: "top left",
  };
};

const SceneLayer = ({ scene, layer }: { scene: Scene; layer: LayerTarget }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localSecond = frame / fps;
  const sceneProgress = Math.min(1, Math.max(0, localSecond / scene.duration));
  const overlays = scene.overlays.filter((overlay) => shouldRenderOverlay(overlay, layer));

  return (
    <AbsoluteFill>
      {layer === "debug" ? (
        <div
          style={{
            position: "absolute",
            right: 70,
            top: 50,
            color: "rgba(255,255,255,0.34)",
            fontSize: 18,
            fontFamily: "Inter, Arial, sans-serif",
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          {scene.id.toUpperCase()} · {Math.round(sceneProgress * 100)}%
        </div>
      ) : null}
      {overlays.map((overlay, index) => (
        <div key={`${scene.id}-${overlay.type}-${index}`} style={overlayWrapperStyle(overlay)}>
          {renderOverlay(overlay)}
        </div>
      ))}
    </AbsoluteFill>
  );
};

export const StoryboardVideo = ({ video, layer = "all" }: { video: VideoSpec; layer?: LayerTarget }) => {
  const isTransparentLayer = layer !== "all";

  return (
    <AbsoluteFill style={{ backgroundColor: isTransparentLayer ? "transparent" : "#050608" }}>
      {video.scenes.map((scene) => (
        <Sequence
          key={scene.id}
          from={Math.round(scene.start * 30)}
          durationInFrames={Math.round(scene.duration * 30)}>
          <SceneLayer scene={scene} layer={layer} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
