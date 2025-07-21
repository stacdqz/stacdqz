// api/log.js
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const ua = req.headers['user-agent'];
  const now = new Date().toISOString();

  await redis.lpush('access_log', JSON.stringify({ ip, ua, now }));
  res.status(200).json({ ok: true });
}