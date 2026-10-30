import React from 'react';
import {
  Sequence,
  Video,
  OffthreadVideo,
  Audio,
  staticFile,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig
} from 'remotion';

export interface SceneToken {
  word: string;
  start: number;
  end: number;
}

export interface TikTokSceneItem {
  id: number;
  title?: string;
  narration?: string;
  captionText?: string;
  duration?: number; // in seconds
  videoUrl?: string;
  customVideoUrl?: string;
  audioUrl?: string;
  textConfig?: {
    position?: 'top' | 'center' | 'bottom';
    highlightColor?: string;
    stylePreset?: string;
    fontSize?: 'sm' | 'md' | 'lg' | 'xl';
    timedWords?: SceneToken[];
    highlightWords?: string[];
    hookTitle?: string;
    showHookTitle?: boolean;
    emojis?: string;
  };
}

export interface TikTokCompositionProps {
  scenes: TikTokSceneItem[];
  bgmUrl?: string;
  bgmVolume?: number;
}

/**
 * Animated dynamic procedural background when no raw video is uploaded
 */
const ProceduralBackground = React.forwardRef<HTMLDivElement, {
  title: string;
  sceneId: number;
  durationInFrames: number;
}>(({ title, sceneId, durationInFrames }, ref) => {
  const frame = useCurrentFrame();

  // Subtle floating scale and pan
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.08]);
  const hueShift = (sceneId * 45 + frame * 0.3) % 360;

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        width: '100%', height: '100%',
        background: `radial-gradient(circle at 50% 40%, hsl(${hueShift}, 70%, 18%) 0%, #060911 80%)`,
        overflow: 'hidden',
        transform: `scale(${scale})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Decorative ambient blurred glow */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37, 244, 238, 0.25) 0%, rgba(254, 44, 85, 0.15) 50%, transparent 70%)',
          filter: 'blur(80px)',
          transform: `translate(${Math.sin(frame * 0.03) * 60}px, ${Math.cos(frame * 0.03) * 60}px)`,
        }}
      />

      {/* Grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
});
ProceduralBackground.displayName = 'ProceduralBackground';

const RemotionKineticCaption = React.forwardRef<HTMLDivElement, {
  scene: TikTokSceneItem;
  durationInFrames: number;
}>(({ scene, durationInFrames }, ref) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  const tc = scene.textConfig || {};
  const highlightColor = tc.highlightColor || '#25F4EE';
  const position = tc.position || 'center';
  const hookTitle = tc.hookTitle || (scene.title || '').toUpperCase();
  const showHookTitle = tc.showHookTitle !== false && Boolean(hookTitle);

  // Spring animation for initial pop-in
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 120 }
  });

  // Calculate words and active highlight strictly following narration
  const rawSpeechText = (scene.narration && scene.narration.trim())
    ? scene.narration.trim()
    : (scene.captionText || '');

  const wordsList = rawSpeechText.split(/\s+/).filter(Boolean);
  const wordCount = wordsList.length || 1;
  const sceneDurSec = scene.duration || 10;

  // Natural speech cadence: Indonesian narration speaks at ~2.8 - 3.2 words/sec (~0.33s/word).
  // Narration starts after a short 0.25s breath and leaves ~1-2s visual hold before transition.
  const speechStartOffset = 0.25;
  const targetPerWord = 0.34;
  const maxSpeechDur = Math.max(1.5, sceneDurSec - 0.6);
  const totalEstimatedSpeech = Math.min(maxSpeechDur, Math.max(1.5, wordCount * targetPerWord));
  const perWord = (totalEstimatedSpeech - speechStartOffset) / wordCount;

  const timedWords = tc.timedWords && tc.timedWords.length > 0
    ? tc.timedWords
    : wordsList.map((w, idx) => {
        return {
          word: w.toUpperCase(),
          start: speechStartOffset + idx * perWord,
          end: speechStartOffset + (idx + 1) * perWord,
        };
      });

  // Determine which word is currently spoken (with smooth latching)
  let activeWordIdx = timedWords.findIndex(
    w => currentTime >= w.start && currentTime < w.end
  );
  if (activeWordIdx === -1) {
    if (currentTime >= (speechStartOffset + totalEstimatedSpeech)) {
      // Speech has finished for this scene, keep the final punchy chunk visible
      activeWordIdx = timedWords.length - 1;
    } else {
      for (let i = timedWords.length - 1; i >= 0; i--) {
        if (currentTime >= timedWords[i].start) {
          activeWordIdx = i;
          break;
        }
      }
      if (activeWordIdx === -1) activeWordIdx = 0;
    }
  }

  // Group into chunks of 4 words to avoid overflowing the TikTok 9:16 screen
  const chunkSize = 4;
  const currentChunkIdx = Math.floor(activeWordIdx / chunkSize);
  const currentChunk = timedWords.slice(
    currentChunkIdx * chunkSize,
    (currentChunkIdx + 1) * chunkSize
  );

  // Vertical placement
  let topPosition = '45%';
  if (position === 'top') topPosition = '18%';
  if (position === 'bottom') topPosition = '72%';

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
      }}
    >
      {/* Top Hook Badge */}
      {showHookTitle && (
        <div
          style={{
            position: 'absolute',
            top: '8%',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            transform: `scale(${enterSpring})`,
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              border: '2px solid rgba(255, 255, 255, 0.25)',
              borderRadius: 16,
              padding: '10px 24px',
              color: '#FFFFFF',
              fontFamily: '"Montserrat", "Plus Jakarta Sans", sans-serif',
              fontWeight: 900,
              fontSize: 28,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            {hookTitle}
          </div>
        </div>
      )}

      {/* Center Kinetic Typography */}
      <div
        style={{
          position: 'absolute',
          top: topPosition,
          left: '6%',
          right: '6%',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px 16px',
          transform: `scale(${interpolate(enterSpring, [0, 1], [0.85, 1])})`,
        }}
      >
        {currentChunk.map((item, idx) => {
          const globalIdx = currentChunkIdx * chunkSize + idx;
          const isActive = globalIdx === activeWordIdx;
          const isPast = globalIdx < activeWordIdx;

          // Word pop scale when spoken
          const wordScale = isActive ? 1.18 : 1.0;
          const fontSizes = { sm: 40, md: 54, lg: 68, xl: 80 };
          const chosenFontSize = fontSizes[tc.fontSize || 'md'] || 54;
          const stylePreset = tc.stylePreset || 'capcut_bold';

          let wordStyle: React.CSSProperties = {
            fontFamily: '"Montserrat", "Plus Jakarta Sans", sans-serif',
            fontWeight: 900,
            fontSize: chosenFontSize,
            textTransform: 'uppercase',
            transform: `scale(${wordScale})`,
            transition: 'transform 0.08s ease-out, color 0.08s ease-out',
            display: 'inline-block',
            letterSpacing: '-0.02em',
          };

          if (stylePreset === 'neon_glow') {
            wordStyle = {
              ...wordStyle,
              color: isActive ? highlightColor : isPast ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
              WebkitTextStroke: '4px rgba(0, 0, 0, 0.95)',
              paintOrder: 'stroke fill',
              textShadow: isActive 
                ? `0 0 10px ${highlightColor}, 0 0 20px ${highlightColor}, 0 0 35px ${highlightColor}` 
                : '0 0 8px rgba(255,255,255,0.4)',
            };
          } else if (stylePreset === 'retro_yellow') {
            wordStyle = {
              ...wordStyle,
              color: isActive ? '#000000' : isPast ? '#FFE600' : 'rgba(255,230,0,0.65)',
              backgroundColor: isActive ? highlightColor : 'rgba(0, 0, 0, 0.85)',
              borderRadius: 8,
              padding: '2px 10px',
              WebkitTextStroke: '0px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
            };
          } else if (stylePreset === 'clean_modern') {
            wordStyle = {
              ...wordStyle,
              color: isActive ? highlightColor : isPast ? '#FFFFFF' : 'rgba(255,255,255,0.65)',
              WebkitTextStroke: '0px',
              textShadow: '0 4px 18px rgba(0,0,0,0.95), 0 2px 4px rgba(0,0,0,0.85)',
            };
          } else {
            // Default: CapCut Bold Pop (Viral TikTok)
            wordStyle = {
              ...wordStyle,
              color: isActive ? highlightColor : isPast ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
              WebkitTextStroke: isActive ? '6px #000000' : '5px #000000',
              paintOrder: 'stroke fill',
              textShadow: isActive ? `0 0 24px ${highlightColor}cc, 0 4px 14px #000000` : '0 4px 14px #000000',
            };
          }

          return (
            <span
              key={`${item.word}-${globalIdx}`}
              style={wordStyle}
            >
              {item.word}
            </span>
          );
        })}
      </div>
    </div>
  );
});
RemotionKineticCaption.displayName = 'RemotionKineticCaption';

/**
 * Resilient video background with automatic fallback to procedural background on playback error
 */
const SafeVideoBackground = React.forwardRef<HTMLDivElement, {
  videoSrc?: string;
  scene: TikTokSceneItem;
  durationInFrames: number;
}>(({ videoSrc, scene, durationInFrames }, ref) => {
  const [videoError, setVideoError] = React.useState(false);

  // Normalize video URL using Remotion's staticFile() for same-origin streaming
  const normalizedSrc = React.useMemo(() => {
    if (!videoSrc) return '';
    if (videoSrc.startsWith('blob:') || videoSrc.startsWith('data:')) {
      return videoSrc;
    }
    if (videoSrc.startsWith('/') || !videoSrc.includes('://')) {
      const cleanPath = videoSrc.replace(/^\/+/, '');
      try {
        return staticFile(cleanPath);
      } catch (_) {
        return videoSrc;
      }
    }
    return videoSrc;
  }, [videoSrc]);

  React.useEffect(() => {
    setVideoError(false);
  }, [normalizedSrc]);

  // If no video or video threw an error, render beautiful ProceduralBackground
  if (!normalizedSrc || videoError) {
    return (
      <ProceduralBackground
        ref={ref}
        title={scene.title || 'Scene'}
        sceneId={scene.id}
        durationInFrames={durationInFrames}
      />
    );
  }

  const videoFilter = (scene as any).videoFilter || 'none';
  let filterStyle = 'none';
  if (videoFilter === 'cinematic') filterStyle = 'contrast(1.15) brightness(0.96) saturate(1.1)';
  if (videoFilter === 'warm') filterStyle = 'sepia(0.2) saturate(1.2) hue-rotate(-8deg)';
  if (videoFilter === 'vibrant') filterStyle = 'saturate(1.4) contrast(1.1)';
  if (videoFilter === 'moody') filterStyle = 'contrast(1.2) brightness(0.9) saturate(0.85)';

  return (
    <div
      ref={ref}
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
    >
      <OffthreadVideo
        src={normalizedSrc}
        crossOrigin="anonymous"
        volume={1.0}
        pauseWhenBuffering={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: filterStyle,
        }}
        onError={(e) => {
          console.warn(`Video playback error on scene ${scene.id}, falling back:`, e);
          setVideoError(true);
        }}
      />
    </div>
  );
});
SafeVideoBackground.displayName = 'SafeVideoBackground';

/**
 * Single Scene Item in Sequence - wrapped with forwardRef for Remotion compatibility
 */
const SingleSceneSequence = React.forwardRef<
  HTMLDivElement,
  {
    scene: TikTokSceneItem;
    durationInFrames: number;
  }
>(({ scene, durationInFrames }, ref) => {
  const videoSrc = scene.customVideoUrl || scene.videoUrl;

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        overflow: 'hidden',
      }}
    >
      {/* Background: Raw Video with Fallback OR Dynamic Procedural Background */}
      <SafeVideoBackground
        videoSrc={videoSrc}
        scene={scene}
        durationInFrames={durationInFrames}
      />

      {/* Narration Audio if valid */}
      {scene.audioUrl && !scene.audioUrl.startsWith('blob:') && (
        <Audio
          src={scene.audioUrl.startsWith('/') ? staticFile(scene.audioUrl.replace(/^\/+/, '')) : scene.audioUrl}
          volume={1.0}
          onError={(e) => console.warn('Audio error on scene:', e)}
        />
      )}

      {/* Kinetic Animated Captions */}
      <RemotionKineticCaption
        scene={scene}
        durationInFrames={durationInFrames}
      />
    </div>
  );
});

SingleSceneSequence.displayName = 'SingleSceneSequence';

/**
 * Main Full Multi-Scene Remotion TikTok Composition
 * Uses forwardRef so Remotion's AbsoluteFillInner/withInteractivitySchema
 * can attach its internal ref without triggering React warnings.
 */
export const TikTokStoryComposition = React.forwardRef<HTMLDivElement, TikTokCompositionProps>(
  ({ scenes = [], bgmUrl, bgmVolume = 0.15 }, ref) => {
    const { fps } = useVideoConfig();

    return (
      <div
        ref={ref}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#060911',
          overflow: 'hidden',
        }}
      >
        {/* Background Music Loop */}
        {bgmUrl && (
          <Audio
            src={bgmUrl.startsWith('/') ? staticFile(bgmUrl.replace(/^\/+/, '')) : bgmUrl}
            volume={bgmVolume}
            loop
            onError={(e) => console.warn('BGM audio error:', e)}
          />
        )}

        {/* Sequential Scenes with Automatic Continuity & Pre-Mounting */}
        {scenes.map((scene, idx) => {
          const sceneDurationSec = scene.duration || 6;
          const sceneFrames = Math.max(1, Math.round(sceneDurationSec * fps));

          // Calculate cumulative start frame
          let startFrame = 0;
          for (let i = 0; i < idx; i++) {
            startFrame += Math.max(1, Math.round((scenes[i].duration || 6) * fps));
          }

          return (
            <Sequence
              key={`scene-seq-${scene.id || idx}`}
              from={startFrame}
              durationInFrames={sceneFrames}
              premountFor={fps}
              name={`Scene ${scene.id}: ${scene.title || ''}`}
            >
              <SingleSceneSequence
                scene={scene}
                durationInFrames={sceneFrames}
              />
            </Sequence>
          );
        })}
      </div>
    );
  }
);

TikTokStoryComposition.displayName = 'TikTokStoryComposition';
