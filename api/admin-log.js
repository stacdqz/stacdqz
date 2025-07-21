// api/admin-log.js
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  const token = process.env.ADMIN_SECRET || 'abc123';
  if (req.query.secret !== token) return res.status(401).json({ error: 'No Permission' });

  const logs = await redis.lrange('access_log', 0, 99);
  res.status(200).json(logs.map(JSON.parse));
}