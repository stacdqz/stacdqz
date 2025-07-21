// 查看日志（私有）
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // 简单 token 校验，token 在 Vercel 环境变量 ADMIN_SECRET 中
  const token = process.env.ADMIN_SECRET || 'abc123';
  if (req.query.secret !== token) {
    return res.status(401).json({ error: 'No Permission' });
  }

  const logs = await kv.lrange('access_log', 0, 99); // 取最近 100 条
  res.status(200).json(logs);
}