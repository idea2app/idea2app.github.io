import { NextApiRequest, NextApiResponse } from 'next';

interface User {
  id: string;
  phone: string;
  nickname?: string;
  createdAt: string;
}

interface ProfileResponse {
  success: boolean;
  message?: string;
  user?: User;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ProfileResponse>) {
  if (req.method !== 'GET') {
    res.status(405).json({ success: false, message: 'Method not allowed' });
    return;
  }

  // For demo purposes, return a mock user when not authenticated
  // In production, verify JWT token from cookies/headers
  const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    res.status(401).json({ success: false, message: '未登录' });
    return;
  }

  // For demo, return mock user data
  res.status(200).json({
    success: true,
    user: { 
      id: 'demo_user', 
      phone: '13800138000',
      nickname: '演示用户',
      createdAt: new Date().toISOString()
    },
  });
}