import { Composition } from "remotion";
import { Fragment } from "react";
import storyboard from "./data/storyboard.json";
import { StoryboardVideo } from "./StoryboardVideo";
import type { LayerTarget, Storyboard, VideoSpec } from "./types";

const data = storyboard as Storyboard;

const layers: LayerTarget[] = ["titles", "cards", "documents", "kpis"];

const compositionId = (video: VideoSpec) => {
  if (video.compositionId) {
    return video.compositionId;
  }
  return video.id
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
};

const layerId = (base: string, layer: LayerTarget) => `${base}-${layer.charAt(0).toUpperCase()}${layer.slice(1)}`;

const makeVideoComponent = (video: VideoSpec, layer: LayerTarget = "all") => {
  const Component = () => <StoryboardVideo video={video} layer={layer} />;
  return Component;
};

const LayerCompositions = ({ baseId, video }: { baseId: string; video: VideoSpec }) => (
  <>
    {layers.map((layer) => {
      const Component = makeVideoComponent(video, layer);
      return (
        <Composition
          key={layerId(baseId, layer)}
          id={layerId(baseId, layer)}
          component={Component}
          durationInFrames={Math.round(video.duration * data.canvas.fps)}
          fps={data.canvas.fps}
          width={data.canvas.width}
          height={data.canvas.height}
        />
      );
    })}
  </>
);

export const RemotionRoot = () => {
  return (
    <>
      {data.videos.map((video) => {
        const baseId = compositionId(video);
        const Component = makeVideoComponent(video);

        return (
          <Fragment key={baseId}>
            <Composition
              id={baseId}
              component={Component}
              durationInFrames={Math.round(video.duration * data.canvas.fps)}
              fps={data.canvas.fps}
              width={data.canvas.width}
              height={data.canvas.height}
            />
            <LayerCompositions baseId={baseId} video={video} />
          </Fragment>
        );
      })}
    </>
  );
};
