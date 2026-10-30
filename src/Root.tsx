import { NewComposition2 } from "./NewComposition2";
import { NewComposition } from "./NewComposition";
import React from "react";
import { Composition, staticFile, Folder } from "remotion";
import {
  CaptionedVideo,
  calculateCaptionedVideoMetadata,
  captionedVideoSchema,
} from "./CaptionedVideo";
import { TikTokStoryComposition } from "./remotion/TikTokSceneComposition";

import defaultStoryData from "../public/storyData.json";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 1. Multi-Scene AI TikTok Story Composition */}
      <Composition
        id="TikTokStory"
        component={TikTokStoryComposition as unknown as React.ComponentType<any>}
        durationInFrames={30 * 30}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          scenes: (defaultStoryData as any).scenes || [],
        }}
        calculateMetadata={async ({ props }) => {
          const fps = 30;
          const currentProps = props as any;
          const scenes = currentProps.scenes && currentProps.scenes.length > 0 
            ? currentProps.scenes 
            : (defaultStoryData as any).scenes || [];
          const totalDurationSec = (scenes || []).reduce((acc: number, s: any) => acc + (s.duration || 6), 0);
          return {
            durationInFrames: Math.max(30, Math.round(totalDurationSec * fps)),
            fps,
            width: 1080,
            height: 1920,
            props: {
              ...currentProps,
              scenes,
            }
          };
        }}
      />

      {/* 2. Classic Captioned Video Composition */}
      <Composition
        id="CaptionedVideo"
        component={CaptionedVideo}
        calculateMetadata={calculateCaptionedVideoMetadata}
        schema={captionedVideoSchema}
        width={1080}
        height={1920}
        defaultProps={{
          src: staticFile("sample-video.mp4"),
        }}
      />
      <Composition
        id="NewComposition"
        component={NewComposition}
        durationInFrames={120}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="NewComposition2"
        component={NewComposition2}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
