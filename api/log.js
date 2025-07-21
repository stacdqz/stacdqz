// 记录访问日志（Post 专用）
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const ua = req.headers['user-agent'];
  const now = new Date().toISOString();

  await kv.lpush('access_log', { ip, ua, now });
  res.status(200).json({ ok: true });
}