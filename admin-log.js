// api/admin-log.js
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  const token = process.env.ADMIN_SECRET || 'abc123';
  if (req.query.secret !== token) return res.status(401).json({ error: 'No Permission' });

  // 测试写入一条数据
  if (req.query.test === '1') {
    await redis.lpush('access_log', JSON.stringify({ ip: '127.0.0.1', ua: 'test', now: new Date().toISOString() }));
  }

  const logs = await redis.lrange('access_log', 0, 99);
  res.status(200).json(logs.map(JSON.parse));
}