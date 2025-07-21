// api/admin-log.js
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  const token = process.env.ADMIN_SECRET || 'abc123';
  if (req.query.secret !== token) return res.status(401).json({ error: 'No Permission' });

  // 强制写入一条测试数据（每次访问都写入）
  await redis.lpush('access_log', JSON.stringify({ ip: '127.0.0.1', ua: 'manual-test', now: new Date().toISOString() }));

  const logs = await redis.lrange('access_log', 0, 99);

  // 只解析字符串类型，跳过非字符串
  const safeLogs = logs.map(item => {
    if (typeof item === 'string') {
      try {
        return JSON.parse(item);
      } catch (e) {
        return null;
      }
    }
    return null;
  }).filter(Boolean);

  res.status(200).json(safeLogs);
}