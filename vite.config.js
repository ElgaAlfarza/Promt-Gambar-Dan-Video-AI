import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

// Middleware for Crystal Clear Native Indonesian TTS
const indonesianTtsPlugin = () => ({
  name: 'indonesian-tts-proxy',
  configureServer(server) {
    server.middlewares.use('/api/tts', (req, res) => {
      try {
        const urlObj = new URL(req.url, 'http://localhost:3000');
        const q = urlObj.searchParams.get('q') || '';
        const tl = urlObj.searchParams.get('tl') || 'id';

        if (!q.trim()) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Missing query');
          return;
        }

        const targetUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(q)}&tl=${tl}&client=tw-ob`;

        const proxyReq = https.get(targetUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': 'https://translate.google.com/'
          },
          rejectUnauthorized: false
        }, (proxyRes) => {
          res.writeHead(proxyRes.statusCode || 200, {
            'Content-Type': 'audio/mpeg',
            'Cache-Control': 'public, max-age=86400',
            'Access-Control-Allow-Origin': '*'
          });
          proxyRes.pipe(res);
        });

        proxyReq.on('error', (err) => {
          console.error('TTS proxy error:', err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('TTS Proxy Error');
        });
      } catch (err) {
        console.error('TTS server middleware error:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
      }
    });
  }
});

// Middleware for Google Gemini Generative Language API Proxy
const geminiProxyPlugin = () => ({
  name: 'gemini-api-proxy',
  configureServer(server) {
    server.middlewares.use('/api/gemini', (req, res) => {
      if (req.method !== 'POST') {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
        return;
      }
      try {
        const urlObj = new URL(req.url, 'http://localhost:3000');
        const model = urlObj.searchParams.get('model') || 'gemini-3.5-flash';
        const key = urlObj.searchParams.get('key') || '';

        let bodyData = '';
        req.on('data', chunk => bodyData += chunk);
        req.on('end', () => {
          const targetUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
          const parsedTarget = new URL(targetUrl);

          const proxyReq = https.request({
            hostname: parsedTarget.hostname,
            path: parsedTarget.pathname + parsedTarget.search,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(bodyData)
            },
            rejectUnauthorized: false
          }, (proxyRes) => {
            res.writeHead(proxyRes.statusCode || 200, {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            });
            proxyRes.pipe(res);
          });

          proxyReq.on('error', (err) => {
            console.error('Gemini proxy error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: { message: err.message } }));
          });

          proxyReq.write(bodyData);
          proxyReq.end();
        });
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: { message: err.message } }));
      }
    });
  }
});

// Official Remotion Integration Bridge (Sync Data, CLI Render, & Studio Connection)
const remotionBridgePlugin = () => ({
  name: 'remotion-bridge',
  configureServer(server) {
    // 0. Upload video file to public/uploads/ so both Player, Studio on 3100, and Remotion CLI can access it
    server.middlewares.use('/api/remotion/upload', (req, res) => {
      if (req.method !== 'POST') {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method Not Allowed' }));
        return;
      }
      try {
        const urlObj = new URL(req.url, 'http://localhost:3000');
        const origFilename = urlObj.searchParams.get('filename') || `clip_${Date.now()}.mp4`;
        const sanitized = Date.now() + '_' + origFilename.replace(/[^a-zA-Z0-9._-]/g, '_');
        const uploadDir = path.resolve('public', 'uploads');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const targetPath = path.join(uploadDir, sanitized);
        const writeStream = fs.createWriteStream(targetPath);

        req.pipe(writeStream);

        writeStream.on('finish', () => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: true,
            url: `/uploads/${sanitized}`,
            filename: origFilename
          }));
        });

        writeStream.on('error', (err) => {
          console.error('[Upload Video Err]:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        });
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });

    // 1. Sync scenes data to public/storyData.json for Remotion Studio & Remotion Render
    server.middlewares.use('/api/remotion/sync', (req, res) => {
      if (req.method !== 'POST') {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method Not Allowed' }));
        return;
      }
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const parsed = JSON.parse(body || '{}');
          const storyDataPath = path.resolve('public', 'storyData.json');
          fs.writeFileSync(storyDataPath, JSON.stringify(parsed, null, 2), 'utf-8');
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'Remotion data synced!' }));
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    });

    // 2. Official Remotion Render Endpoint using Remotion CLI
    server.middlewares.use('/api/remotion/render', (req, res) => {
      if (req.method !== 'POST') {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method Not Allowed' }));
        return;
      }

      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const { topic, scenes } = JSON.parse(body || '{}');

          // If scenes provided, save them first
          if (scenes && Array.isArray(scenes) && scenes.length > 0) {
            const storyDataPath = path.resolve('public', 'storyData.json');
            fs.writeFileSync(storyDataPath, JSON.stringify({ scenes }, null, 2), 'utf-8');
          }

          const outDir = path.resolve('out');
          if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir, { recursive: true });
          }

          const cleanTopic = (topic || 'TikTok_Story').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '_');
          const filename = `${cleanTopic}_Remotion_${Date.now()}.mp4`;
          const outputPath = path.join(outDir, filename);
          const propsPath = path.resolve('public', 'storyData.json');

          const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
          const args = [
            'remotion',
            'render',
            'src/index.ts',
            'TikTokStory',
            `out/${filename}`,
            `--props=${propsPath}`
          ];

          console.log(`[Remotion Bridge] Starting official render: ${npxCmd} ${args.join(' ')}`);
          const renderProc = spawn(npxCmd, args, { cwd: process.cwd(), shell: true });

          renderProc.stdout.on('data', (d) => {
            console.log(`[Remotion Render]: ${d.toString().trim()}`);
          });

          renderProc.stderr.on('data', (d) => {
            console.warn(`[Remotion Render Err]: ${d.toString().trim()}`);
          });

          renderProc.on('close', (code) => {
            if (code === 0 && fs.existsSync(outputPath)) {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                success: true,
                filename,
                downloadUrl: `/api/remotion/download?file=${encodeURIComponent(filename)}`
              }));
            } else {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: `Render gagal dengan kode keluar ${code}` }));
            }
          });
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    });

    // 3. Serve downloaded Remotion MP4
    server.middlewares.use('/api/remotion/download', (req, res) => {
      try {
        const urlObj = new URL(req.url, 'http://localhost:3000');
        const filename = urlObj.searchParams.get('file');
        if (!filename) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Missing file param');
          return;
        }

        const safeFilename = path.basename(filename);
        const filePath = path.resolve('out', safeFilename);
        if (!fs.existsSync(filePath)) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('File not found');
          return;
        }

        const stat = fs.statSync(filePath);
        res.writeHead(200, {
          'Content-Type': 'video/mp4',
          'Content-Length': stat.size,
          'Content-Disposition': `attachment; filename="${safeFilename}"`
        });
        fs.createReadStream(filePath).pipe(res);
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Download error');
      }
    });

    // 4. Status Check for Remotion Studio on port 3100
    server.middlewares.use('/api/remotion/status', (req, res) => {
      const checkReq = http.get('http://localhost:3100', { timeout: 1500 }, (checkRes) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ running: checkRes.statusCode === 200, port: 3100 }));
      });
      checkReq.on('error', () => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ running: false, port: 3100 }));
      });
    });
  }
});

export default defineConfig({
  plugins: [react(), indonesianTtsPlugin(), geminiProxyPlugin(), remotionBridgePlugin()],
  server: {
    port: 3000,
    open: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  }
});
