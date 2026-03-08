import express from 'express';

const router = express.Router();

// --- Public
router.get('/public/live-agents', (_req, res) => {
  res.json({ agents: [] });
});

router.get('/v1/dashboard', (_req, res) => {
  res.json({ stats: {} });
});

router.get('/install.sh', (_req, res) => {
  res.type('text/plain');
  res.send('#!/usr/bin/env sh\necho "install script"');
});

router.get('/cli/helioz.js', (_req, res) => {
  res.type('application/javascript');
  res.send('console.log("helioz cli placeholder");');
});

router.get('/cli/package.json', (_req, res) => {
  res.json({ name: 'helioz', version: '1.3.1' });
});

// --- Auth
router.post('/auth/privy', (_req, res) => {
  res.json({ success: true });
});

router.post('/auth/logout', (req, res) => {
  req.session?.destroy(() => {
    res.json({ success: true });
  });
});

// --- Agents
router.get('/agents', (_req, res) => {
  res.json({ agents: [] });
});
router.get('/agents/:id', (req, res) => {
  res.json({ agent: { id: req.params.id } });
});
router.post('/agents', (_req, res) => {
  res.status(201).json({ id: 'new', status: 'inactive' });
});
router.patch('/agents/:id', (req, res) => {
  res.json({ id: req.params.id, updated: true });
});
router.post('/agents/:id/deploy', (req, res) => {
  res.json({ id: req.params.id, status: 'deploying' });
});

// --- Runtime
router.get('/skills', (_req, res) => {
  res.json({ skills: [] });
});
router.get('/deployments', (_req, res) => {
  res.json({ deployments: [] });
});
router.get('/privacy', (_req, res) => {
  res.json({ settings: {} });
});
router.put('/privacy', (_req, res) => {
  res.json({ success: true });
});
router.get('/api-key', (_req, res) => {
  res.json({ apiKey: 'hlz_live_xxx' });
});
router.post('/api-key/regenerate', (_req, res) => {
  res.json({ apiKey: 'hlz_live_new' });
});
router.post('/playground', (_req, res) => {
  res.json({ reply: 'ok' });
});

export default router;
