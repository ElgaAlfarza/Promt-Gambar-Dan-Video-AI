// Utility to render procedural cinematic video clips and stitch final videos via MediaRecorder

export function renderProceduralFrame(ctx, width, height, frame, scene, options = {}) {
  const { lighting = 1.0, contrast = 1.0, saturation = 1.0, isEnhanced = false } = options;
  const time = frame * 0.03;
  const sceneId = scene.id || 1;

  // Scene mood themes
  const colorThemes = [
    { sky: ['#ff7e5f', '#feb47b'], ground: '#2b1b17', accent: '#f39c12' }, // Scene 1 Hook sunset
    { sky: ['#141e30', '#243b55'], ground: '#0f2027', accent: '#3498db' }, // Scene 2 Mist night
    { sky: ['#200122', '#6f0000'], ground: '#1a0000', accent: '#e74c3c' }, // Scene 3 Stormy crimson
    { sky: ['#0f0c29', '#302b63'], ground: '#24243e', accent: '#9b59b6' }, // Scene 4 Dark abyss
    { sky: ['#093028', '#237a57'], ground: '#051e19', accent: '#2ecc71' }, // Scene 5 Mystic bioluminescence
    { sky: ['#f12711', '#f5af19'], ground: '#3e2723', accent: '#f1c40f' }  // Scene 6 Golden sunrise
  ];
  const theme = colorThemes[(sceneId - 1) % colorThemes.length];

  // Draw background sky gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.7);
  skyGrad.addColorStop(0, theme.sky[0]);
  skyGrad.addColorStop(1, theme.sky[1]);
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, width, height);

  // Sun / Moon / Light source with slow float
  const lightY = height * 0.28 + Math.sin(time * 0.8) * 8;
  const lightGrad = ctx.createRadialGradient(width * 0.5, lightY, 10, width * 0.5, lightY, width * 0.5);
  lightGrad.addColorStop(0, 'rgba(255, 245, 210, 0.9)');
  lightGrad.addColorStop(0.3, theme.accent + '66');
  lightGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = lightGrad;
  ctx.fillRect(0, 0, width, height * 0.6);

  // Distant mountain layers / ocean cliff
  ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
  ctx.beginPath();
  ctx.moveTo(0, height * 0.55);
  for (let x = 0; x <= width; x += 30) {
    const y = height * 0.55 + Math.sin(x * 0.015 + sceneId) * 35 + Math.cos(x * 0.03) * 15;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  ctx.fill();

  // Animated Ocean waves / ground
  const waterGrad = ctx.createLinearGradient(0, height * 0.62, 0, height);
  waterGrad.addColorStop(0, theme.ground);
  waterGrad.addColorStop(1, '#05070a');
  ctx.fillStyle = waterGrad;
  ctx.beginPath();
  ctx.moveTo(0, height * 0.62);
  for (let x = 0; x <= width; x += 20) {
    const waveY = height * 0.62 + Math.sin(x * 0.02 + time * 3) * 12 + Math.cos(x * 0.01 - time * 2) * 8;
    ctx.lineTo(x, waveY);
  }
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  ctx.fill();

  // Floating claymation particles / fireflies / mist
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  for (let i = 0; i < 24; i++) {
    const px = (Math.sin(i * 127 + time * 0.4) * 0.5 + 0.5) * width;
    const py = (Math.cos(i * 331 + time * 0.5) * 0.5 + 0.5) * height * 0.8;
    const size = (Math.sin(time + i) * 1.5 + 2.5);
    ctx.beginPath();
    ctx.arc(px, py, Math.max(1, size), 0, Math.PI * 2);
    ctx.fill();
  }

  // Foreground Claymation Character Silhouette / Focal Point
  const charX = width * 0.5 + Math.sin(time * 0.5) * 4;
  const charY = height * 0.66 + Math.sin(time * 1.2) * 2;
  
  // Character shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.beginPath();
  ctx.ellipse(charX, charY + 82, 35, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  // Character body & sarung
  ctx.fillStyle = '#b33939';
  ctx.beginPath();
  ctx.moveTo(charX - 16, charY + 20);
  ctx.lineTo(charX + 16, charY + 20);
  ctx.lineTo(charX + 24, charY + 80);
  ctx.lineTo(charX - 24, charY + 80);
  ctx.closePath();
  ctx.fill();

  // Head
  ctx.fillStyle = '#d1a075';
  ctx.beginPath();
  ctx.arc(charX, charY, 18, 0, Math.PI * 2);
  ctx.fill();

  // Traditional scarf / hair blowing in wind
  ctx.fillStyle = '#f7f1e3';
  ctx.beginPath();
  ctx.moveTo(charX - 12, charY - 8);
  ctx.quadraticCurveTo(charX - 35 - Math.sin(time * 3) * 12, charY + 20, charX - 18, charY + 35);
  ctx.lineTo(charX, charY);
  ctx.closePath();
  ctx.fill();

  // Claymation tactile texture grain (Stop-motion effect)
  const grainSeed = Math.floor(frame / 2); // 12-15fps clay stop-motion effect
  ctx.fillStyle = `rgba(255, 255, 255, ${0.04 + (grainSeed % 3) * 0.01})`;
  for (let j = 0; j < 30; j++) {
    const rx = ((j * 37 + grainSeed * 19) % width);
    const ry = ((j * 91 + grainSeed * 31) % height);
    ctx.fillRect(rx, ry, 3, 3);
  }

  // Camera frame indicator badge
  ctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fillText(`SCENE ${sceneId} • 1080x1920 (9:16) FLOW 60FPS`, 24, 40);

  // If RAW player: simulate real raw footage (slightly muted lighting)
  if (!isEnhanced) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.14)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = '700 13px sans-serif';
    ctx.fillText('RAW FLOW (ORIGINAL)', 24, height - 30);
  } else {
    // Enhanced Player: Apply brightness/contrast and kinetic subtitle
    ctx.fillStyle = 'rgba(37, 244, 238, 0.05)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#25F4EE';
    ctx.font = '700 13px sans-serif';
    ctx.fillText('✨ AI ENHANCED (AUTO-LIGHTING & SUBTITLE)', 24, height - 30);
  }
}

// Generate demo animated video as a Video Blob URL
export function createDemoVideoBlob(scene, durationSec = 10, isEnhanced = false, captionOptions = {}) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 540;
    canvas.height = 960;
    const ctx = canvas.getContext('2d');

    const stream = canvas.captureStream(30);
    let mediaRecorder;
    try {
      mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
    } catch (e) {
      mediaRecorder = new MediaRecorder(stream);
    }

    const chunks = [];
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      resolve({ blob, url });
    };

    mediaRecorder.start();

    let frame = 0;
    const totalFrames = durationSec * 30; // 300 frames

    function renderLoop() {
      renderProceduralFrame(ctx, canvas.width, canvas.height, frame, scene, {
        isEnhanced,
        lighting: isEnhanced ? 1.2 : 0.95,
        contrast: isEnhanced ? 1.15 : 1.0,
      });

      // Render subtitle if enhanced
      if (isEnhanced && scene.captionText) {
        const posY = captionOptions.position === 'top' 
          ? canvas.height * 0.2 
          : captionOptions.position === 'bottom' 
          ? canvas.height * 0.82 
          : canvas.height * 0.5; // center / safety zone

        const highlightColor = captionOptions.highlightColor || '#FFE600';
        
        ctx.textAlign = 'center';
        ctx.font = '900 24px "Montserrat", sans-serif';
        
        // Background capsule
        ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        const textMetrics = ctx.measureText(scene.captionText);
        const padding = 20;
        ctx.beginPath();
        ctx.roundRect(
          canvas.width / 2 - textMetrics.width / 2 - padding,
          posY - 28,
          textMetrics.width + padding * 2,
          48,
          10
        );
        ctx.fill();

        // Stroke
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#000000';
        ctx.strokeText(scene.captionText, canvas.width / 2, posY);

        // Highlight word
        ctx.fillStyle = highlightColor;
        ctx.fillText(scene.captionText, canvas.width / 2, posY);
      }

      frame++;
      if (frame < totalFrames) {
        requestAnimationFrame(renderLoop);
      } else {
        mediaRecorder.stop();
      }
    }

    renderLoop();
  });
}
