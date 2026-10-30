// Audio Synthesizer utilizing Native Indonesian Audio TTS (tl=id) and Web Audio API

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.bgmOscs = [];
    this.bgmGain = null;
    this.isPlayingBgm = false;
    this.bgmInterval = null;
    this.activeAudio = null;
    this.audioQueue = [];
    this.isPlayingSpeech = false;
    this.onSpeechEnd = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Play Whoosh SFX for scene transitions
  playWhoosh(volume = 0.2) {
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.6; // 600ms
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.value = 3.0;
      filter.frequency.setValueAtTime(200, now);
      filter.frequency.exponentialRampToValueAtTime(3200, now + 0.25);
      filter.frequency.exponentialRampToValueAtTime(150, now + 0.55);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(volume * 0.9, now + 0.22);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.6);
    } catch (e) {
      console.warn('Whoosh audio play error', e);
    }
  }

  // Play Sub Bass Boom impact
  playBoom(volume = 0.2) {
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.6);

      gain.gain.setValueAtTime(volume * 1.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.8);
    } catch (e) {
      console.warn('Boom audio error', e);
    }
  }

  // Start background atmospheric music loop
  startBGM(musicType = 'misteri_bima', volume = 0.12) {
    this.stopBGM();
    try {
      this.init();
      if (!this.ctx) return;

      this.isPlayingBgm = true;
      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(volume, this.ctx.currentTime);
      this.bgmGain.connect(this.ctx.destination);

      const baseFreqs = musicType === 'gamelan_suspense' 
        ? [55, 110, 165, 247.5] 
        : [65.41, 130.81, 196.00, 293.66];

      this.bgmOscs = baseFreqs.map((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.value = 0.2 + idx * 0.1;
        lfoGain.gain.value = 1.5;
        lfo.connect(osc.frequency);
        lfo.start();

        oscGain.gain.value = 0.25 / baseFreqs.length;
        osc.connect(oscGain);
        oscGain.connect(this.bgmGain);
        osc.start();
        return osc;
      });

      this.bgmInterval = setInterval(() => {
        if (!this.isPlayingBgm || !this.ctx) return;
        this.playMysticBell(this.bgmGain, musicType);
      }, 3500);

    } catch (e) {
      console.warn('BGM start error', e);
    }
  }

  playMysticBell(destinationGain, musicType) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const bellOsc = this.ctx.createOscillator();
    const bellGain = this.ctx.createGain();

    const notes = [440, 523.25, 659.25, 783.99, 987.77];
    const chosenNote = notes[Math.floor(Math.random() * notes.length)];

    bellOsc.type = 'sine';
    bellOsc.frequency.setValueAtTime(chosenNote, now);

    bellGain.gain.setValueAtTime(0.001, now);
    bellGain.gain.linearRampToValueAtTime(0.2, now + 0.05);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    bellOsc.connect(bellGain);
    bellGain.connect(destinationGain);

    bellOsc.start(now);
    bellOsc.stop(now + 2.3);
  }

  setBGMVolume(volume) {
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(volume, this.ctx.currentTime);
    }
  }

  stopBGM() {
    this.isPlayingBgm = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    if (this.bgmOscs.length > 0) {
      this.bgmOscs.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (_) {}
      });
      this.bgmOscs = [];
    }
    if (this.bgmGain) {
      try {
        this.bgmGain.disconnect();
      } catch (_) {}
      this.bgmGain = null;
    }
  }

  // Pure Indonesian Web Speech voice detector (STRICT: Never fallback to English!)
  getIndonesianVoice() {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    // Strict priority: Must be an authentic Indonesian language pack
    const directIndo = voices.find(v => 
      v.lang === 'id-ID' || 
      v.lang === 'id_ID' || 
      v.lang.toLowerCase().startsWith('id')
    );
    if (directIndo) return directIndo;

    const nameIndo = voices.find(v => {
      const n = (v.name || '').toLowerCase();
      return n.includes('indonesia') || n.includes('gadis') || n.includes('ardi') || n.includes('andika');
    });
    if (nameIndo) return nameIndo;

    // NEVER return an English voice to avoid bizarre pronunciation
    return null;
  }

  cleanTextForSpeech(text) {
    if (!text) return '';
    return text
      // Remove bracket notes like [Hook], [Camera: ...], etc.
      .replace(/\[.*?\]/g, '')
      // Replace ellipsis with commas for natural speech breathing pause
      .replace(/\.{2,}/g, ', ')
      // Remove markdown quotes, asterisks, hashtags
      .replace(/["*#_`]/g, '')
      // Normalize whitespace
      .replace(/\s+/g, ' ')
      .trim();
  }

  splitIntoSpeechChunks(text, maxChars = 85) {
    if (!text) return [];
    const parts = text.split(/([.,!?;:\n]+)/);
    const chunks = [];
    let current = '';

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (!part) continue;

      if ((current + part).length <= maxChars) {
        current += part;
      } else {
        if (current.trim()) chunks.push(current.trim());
        if (part.length > maxChars) {
          const words = part.split(' ');
          let wordChunk = '';
          for (const w of words) {
            if ((wordChunk + ' ' + w).length <= maxChars) {
              wordChunk += (wordChunk ? ' ' : '') + w;
            } else {
              if (wordChunk.trim()) chunks.push(wordChunk.trim());
              wordChunk = w;
            }
          }
          current = wordChunk;
        } else {
          current = part;
        }
      }
    }
    if (current.trim()) chunks.push(current.trim());
    return chunks;
  }

  stopSpeech() {
    this.isPlayingSpeech = false;
    if (this.activeAudio) {
      try {
        this.activeAudio.pause();
        this.activeAudio.currentTime = 0;
        this.activeAudio.src = '';
      } catch (_) {}
      this.activeAudio = null;
    }
    this.audioQueue = [];
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (_) {}
    }
    if (this.onSpeechEnd) {
      const cb = this.onSpeechEnd;
      this.onSpeechEnd = null;
      cb();
    }
  }

  // 100% Native Fluent Indonesian TTS (Murni Bahasa Indonesia yang Jernih)
  speakNarration(text, voiceConfig = {}, onStart, onEnd) {
    this.stopSpeech();

    const cleanedText = this.cleanTextForSpeech(text);
    if (!cleanedText) {
      if (onEnd) onEnd();
      return;
    }

    this.isPlayingSpeech = true;
    this.onSpeechEnd = onEnd;

    const chunks = this.splitIntoSpeechChunks(cleanedText, 140);
    this.audioQueue = [...chunks];

    if (onStart) onStart();

    this.playNextChunk();
  }

  playNextChunk() {
    if (!this.isPlayingSpeech) return;

    if (this.audioQueue.length === 0) {
      this.isPlayingSpeech = false;
      if (this.onSpeechEnd) {
        const cb = this.onSpeechEnd;
        this.onSpeechEnd = null;
        cb();
      }
      return;
    }

    const currentText = this.audioQueue.shift();
    if (!currentText || !currentText.trim()) {
      this.playNextChunk();
      return;
    }

    // Audio source: Local Vite proxy -> Direct Google Indonesian TTS -> Web Speech (if Indonesian voice exists)
    const localUrl = `/api/tts?q=${encodeURIComponent(currentText.trim())}&tl=id`;
    const directUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(currentText.trim())}&tl=id&client=tw-ob`;

    const audio = new Audio();
    this.activeAudio = audio;

    let hasFallbackTriggered = false;

    audio.onended = () => {
      this.activeAudio = null;
      this.playNextChunk();
    };

    audio.onerror = () => {
      if (!hasFallbackTriggered) {
        hasFallbackTriggered = true;
        audio.src = directUrl;
        audio.play().catch(() => {
          this.fallbackWebSpeechChunk(currentText);
        });
      } else {
        this.fallbackWebSpeechChunk(currentText);
      }
    };

    audio.src = localUrl;
    audio.play().catch(() => {
      // Browser autoplay restriction or local proxy error -> try direct URL
      audio.src = directUrl;
      audio.play().catch(() => {
        this.fallbackWebSpeechChunk(currentText);
      });
    });
  }

  fallbackWebSpeechChunk(chunkText) {
    if (!('speechSynthesis' in window)) {
      this.playNextChunk();
      return;
    }

    const indonesianVoice = this.getIndonesianVoice();
    // STRICT: NEVER use an English voice to read Indonesian text!
    if (!indonesianVoice || !indonesianVoice.lang.toLowerCase().startsWith('id')) {
      console.warn('Tidak ditemukan voice pack Bahasa Indonesia di Web Speech API, menghindari aksen bahasa asing.');
      this.playNextChunk();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(chunkText);
    utterance.lang = 'id-ID';
    utterance.voice = indonesianVoice;
    utterance.pitch = 1.0;
    utterance.rate = 0.95;

    utterance.onend = () => {
      this.playNextChunk();
    };
    utterance.onerror = () => {
      this.playNextChunk();
    };

    window.speechSynthesis.speak(utterance);
  }
}

export const soundEngine = new SoundEngine();

// Preload voices on load if supported
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    soundEngine.getIndonesianVoice();
  };
}
