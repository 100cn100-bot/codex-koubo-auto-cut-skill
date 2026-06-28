export type Tone = "green" | "orange" | "blue" | "red" | "dark" | "light" | "accent";

export type Overlay = {
  type:
    | "price_kpi"
    | "info_card_stack"
    | "chapter_number"
    | "document_overlay"
    | "final_verdict"
    | "progress_compare"
    | "funnel_select"
    | "before_after_compare"
    | "risk_warning"
    | "calendar_output"
    | "slider_gauge"
    | "chat_bubble"
    | "cta_comment"
    | "glass_concept_card"
    | "data_metric_card"
    | "concept_agenda_list"
    | "platform_icon_compare"
    | "logic_flow_loop"
    | "percent_donut_stat"
    | "metric_flow_compare"
    | "headline_banner"
    | "speech_bubble_card"
    | "focus_list_stack";
  props: Record<string, unknown>;
  animation?: string;
  layer?: LayerTarget;
  placement?: {
    x?: number;
    y?: number;
    scale?: number;
  };
  safeBounds?: {
    enabled?: boolean;
    marginX?: number;
    marginY?: number;
  };
};

export type LayerTarget =
  | "all"
  | "titles"
  | "cards"
  | "documents"
  | "kpis"
  | "debug";

export type Scene = {
  id: string;
  start: number;
  duration: number;
  voiceover: string;
  subtitle?: {
    zh: string;
    en?: string;
  };
  overlays: Overlay[];
  keywords?: string[];
};

export type VideoSpec = {
  id: string;
  compositionId?: string;
  title: string;
  duration: number;
  baseVideo?: Overlay;
  scenes: Scene[];
};

export type Storyboard = {
  canvas: {
    width: number;
    height: number;
    fps: number;
  };
  videos: VideoSpec[];
};
