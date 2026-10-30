import React, { useMemo } from 'react';

/**
 * Break timedWords into natural, punchy TikTok subtitle cards (chunks):
 * - Maximum 3-5 words per card (fits perfectly in 9:16 mobile canvas without spilling over)
 * - Breaks immediately at sentence terminators: ?, !, .
 * - Breaks at commas/semicolons if card already has >= 3 words
 * - Breaks at natural speech pauses (silence gap >= 0.45s)
 */
export function buildSmartSubtitleChunks(timedWords) {
  if (!timedWords || timedWords.length === 0) return [];

  const chunks = [];
  let currentChunk = [];

  for (let i = 0; i < timedWords.length; i++) {
    const tw = timedWords[i];
    const prevTw = currentChunk.length > 0 ? currentChunk[currentChunk.length - 1] : null;

    // Check if there is an audible pause between words
    const isPauseBreak = prevTw && (tw.start - prevTw.end >= 0.45);
    if (isPauseBreak && currentChunk.length > 0) {
      chunks.push(currentChunk);
      currentChunk = [];
    }

    currentChunk.push({ ...tw, globalIndex: i });

    const trimmed = (tw.word || '').trim();
    const isSentenceEnd = /[.?!]["']?$/.test(trimmed);
    const isCommaEnd = /[,;]$/.test(trimmed);
    const reachedWordLimit = currentChunk.length >= 5;

    // Punctuation or length boundary reached
    if (isSentenceEnd || (isCommaEnd && currentChunk.length >= 3) || reachedWordLimit) {
      chunks.push(currentChunk);
      currentChunk = [];
    }
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }

  return chunks.map(chunkWords => ({
    words: chunkWords,
    startTime: chunkWords[0].start,
    endTime: chunkWords[chunkWords.length - 1].end
  }));
}

/**
 * CapCut Kinetic Text Overlay
 * Replicates high-retention TikTok / CapCut typography:
 * - Strictly bounded inside the 9:16 video frame (never spills over)
 * - Exclusive single-word highlight synchronization (only the active spoken word lights up)
 * - Top Hook Title badge: | TITLE |
 * - Emojis: 👐 📹, 🔥 💡, etc.
 * - Solid black stroke & heavy drop shadows
 */
export default function CapCutTextOverlay({
  hookTitle = '',
  showHookTitle = true,
  emojis = '👐 📹',
  showEmojis = true,
  captionText = '',
  timedWords = [], // Array of { word, start, end }
  currentTime = 0, // Video current time in seconds
  highlightWords = [],
  highlightColor = '#00FF66', // CapCut signature neon lime
  position = 'center', // 'top' | 'center' | 'bottom'
  fontSize = 'lg', // 'sm' | 'md' | 'lg' | 'xl'
  stylePreset = 'capcut_green', // 'capcut_green' | 'fyp_yellow' | 'cyan_cyber' | 'pill_dark'
  isAnimated = true
}) {
  // Normalize highlight words into lower-case set
  const highlightSet = useMemo(() => {
    return new Set(
      (highlightWords || []).map(w => (w || '').toLowerCase().replace(/[^\w]/g, ''))
    );
  }, [highlightWords]);

  // Build smart sentence chunks from timedWords
  const chunks = useMemo(() => {
    return buildSmartSubtitleChunks(timedWords);
  }, [timedWords]);

  // Determine active spoken word index (strictly single word)
  let activeGlobalIndex = -1;
  if (timedWords && timedWords.length > 0) {
    // 1. Exact or near interval match for word
    activeGlobalIndex = timedWords.findIndex(
      w => currentTime >= (w.start - 0.05) && currentTime <= (w.end + 0.08)
    );

    // 2. Smooth inter-word bridge: if gap between words is small (< 0.22s),
    // hold current word until next word begins for continuous visual flow
    if (activeGlobalIndex === -1 && currentTime > 0) {
      for (let i = 0; i < timedWords.length - 1; i++) {
        if (currentTime > timedWords[i].end && currentTime < timedWords[i + 1].start) {
          if (timedWords[i + 1].start - timedWords[i].end <= 0.25) {
            activeGlobalIndex = i;
            break;
          }
        }
      }
    }
  }

  // Determine which subtitle card / chunk is active at currentTime
  let activeChunk = null;
  if (chunks.length > 0) {
    // 1. Direct window match
    activeChunk = chunks.find(c => 
      currentTime >= (c.startTime - 0.12) && currentTime <= (c.endTime + 0.35)
    );

    // 2. If in a small pause between chunks (< 0.5s), hold the earlier chunk
    if (!activeChunk && currentTime > 0) {
      for (let i = chunks.length - 1; i >= 0; i--) {
        if (currentTime >= chunks[i].startTime && currentTime <= (chunks[i].endTime + 0.55)) {
          activeChunk = chunks[i];
          break;
        }
      }
    }

    // 3. Fallback: if before start, show first chunk; if after end, show last chunk
    if (!activeChunk) {
      if (currentTime <= chunks[0].startTime) {
        activeChunk = chunks[0];
      } else {
        activeChunk = chunks[chunks.length - 1];
      }
    }
  }

  // Format active chunk words into 1 or 2 display lines
  let displayLines = [];

  if (activeChunk && activeChunk.words.length > 0) {
    const chunkWords = activeChunk.words;
    if (chunkWords.length <= 3) {
      // 1 single punchy line
      displayLines = [
        chunkWords.map(tw => ({
          word: tw.word,
          globalIndex: tw.globalIndex,
          isSpoken: tw.globalIndex === activeGlobalIndex,
          isKeyHighlight: highlightSet.has((tw.word || '').toLowerCase().replace(/[^\w]/g, ''))
        }))
      ];
    } else {
      // 2 balanced lines
      const mid = Math.ceil(chunkWords.length / 2);
      const line1 = chunkWords.slice(0, mid);
      const line2 = chunkWords.slice(mid);

      displayLines = [
        line1.map(tw => ({
          word: tw.word,
          globalIndex: tw.globalIndex,
          isSpoken: tw.globalIndex === activeGlobalIndex,
          isKeyHighlight: highlightSet.has((tw.word || '').toLowerCase().replace(/[^\w]/g, ''))
        })),
        line2.map(tw => ({
          word: tw.word,
          globalIndex: tw.globalIndex,
          isSpoken: tw.globalIndex === activeGlobalIndex,
          isKeyHighlight: highlightSet.has((tw.word || '').toLowerCase().replace(/[^\w]/g, ''))
        }))
      ].filter(l => l.length > 0);
    }
  } else {
    // Fallback: parse raw captionText when no timedWords are present
    const rawLines = (captionText || '')
      .split(/\r?\n/)
      .map(l => l.trim())
      .filter(Boolean);

    const linesToUse = rawLines.length > 0 ? rawLines : ['SO JANGAN', 'DI SKIP DULU'];
    displayLines = linesToUse.map((line, lIdx) => {
      const words = line.split(/\s+/).filter(Boolean);
      return words.map((w, wIdx) => ({
        word: w,
        globalIndex: lIdx * 10 + wIdx,
        isSpoken: false,
        isKeyHighlight: highlightSet.has(w.toLowerCase().replace(/[^\w]/g, ''))
      }));
    });
  }

  // Responsive font size classes tuned specifically for 9:16 mobile canvas
  const fontSizes = {
    sm: 'text-xs sm:text-sm leading-tight tracking-normal',
    md: 'text-sm sm:text-base leading-tight tracking-tight',
    lg: 'text-base sm:text-lg lg:text-xl leading-snug tracking-tight',
    xl: 'text-lg sm:text-xl lg:text-2xl leading-tight tracking-tighter'
  };

  const chosenFontSize = fontSizes[fontSize] || fontSizes.lg;

  // Safe position zones inside 9:16 smartphone viewport
  const positionClasses = {
    top: 'top-12 sm:top-16',
    center: 'top-1/2 -translate-y-1/2',
    bottom: 'bottom-16 sm:bottom-20'
  };

  const chosenPosition = positionClasses[position] || positionClasses.center;

  // Background box / pill if preset is pill_dark
  const isPill = stylePreset === 'pill_dark';

  return (
    <div 
      className={`absolute inset-x-0 z-30 pointer-events-none flex flex-col items-center justify-center transition-all duration-150 px-2.5 sm:px-4 ${chosenPosition}`}
      style={{ transform: position === 'center' ? 'translateY(-50%)' : undefined }}
    >
      {/* 1. TOP HOOK TITLE BADGE (| JUDUL |) */}
      {showHookTitle && hookTitle && (
        <div className="mb-2 max-w-[85%] text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/85 backdrop-blur-md border border-white/20 shadow-2xl">
            <span className="text-[#25F4EE] font-black text-xs tracking-wider">|</span>
            <span className="capcut-font text-white uppercase text-[11px] sm:text-xs tracking-[0.2em] font-extrabold truncate max-w-[200px]">
              {hookTitle}
            </span>
            <span className="text-[#25F4EE] font-black text-xs tracking-wider">|</span>
          </div>
        </div>
      )}

      {/* 2. EMOJIS ACCENT (👐 📹) */}
      {showEmojis && emojis && (
        <div className="text-xl sm:text-2xl mb-1.5 filter drop-shadow-lg select-none">
          {emojis}
        </div>
      )}

      {/* 3. MULTI-LINE KINETIC TEXT (STRICTLY CONSTRAINED TO 9:16 FRAME) */}
      <div 
        className={`flex flex-col items-center justify-center text-center max-w-[92%] w-full overflow-hidden ${
          isPill 
            ? 'bg-black/80 backdrop-blur-sm px-4 py-2.5 rounded-2xl border border-white/15 shadow-2xl' 
            : ''
        } ${isAnimated ? 'animate-capcut-pop' : ''}`}
      >
        {displayLines.map((lineObjArray, lineIdx) => (
          <div 
            key={lineIdx} 
            className={`capcut-font uppercase ${chosenFontSize} font-black flex flex-wrap justify-center items-center gap-x-2 gap-y-1 my-0.5 max-w-full`}
          >
            {lineObjArray.map((item, wordIdx) => {
              const isSpoken = item.isSpoken;

              // EXCLUSIVE HIGHLIGHT LOGIC:
              // When audio is playing, ONLY the single currently spoken word turns neon green!
              // In static preview (video paused at 0), manual key highlights may show preview color.
              const isStaticPreviewHighlight = !isAnimated && currentTime === 0 && item.isKeyHighlight;
              const shouldIlluminateNeon = isSpoken || isStaticPreviewHighlight;

              return (
                <span
                  key={`${lineIdx}-${wordIdx}-${item.word}`}
                  className={`capcut-stroke capcut-shadow transition-all duration-100 inline-block ${
                    isSpoken 
                      ? 'scale-110 -translate-y-0.5 capcut-stroke-thick z-10' 
                      : ''
                  }`}
                  style={{
                    color: shouldIlluminateNeon ? highlightColor : '#FFFFFF',
                    filter: shouldIlluminateNeon 
                      ? `drop-shadow(0 0 12px ${highlightColor}CC) drop-shadow(0 0 4px ${highlightColor})` 
                      : undefined,
                    textDecoration: (!isSpoken && item.isKeyHighlight) ? 'underline' : 'none',
                    textDecorationColor: (!isSpoken && item.isKeyHighlight) ? `${highlightColor}99` : undefined,
                    textUnderlineOffset: '3px'
                  }}
                >
                  {item.word}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
