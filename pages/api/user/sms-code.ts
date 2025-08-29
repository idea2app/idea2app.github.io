import { NextApiRequest, NextApiResponse } from 'next';

interface SMSCodeRequest {
  phone: string;
}

interface SMSCodeResponse {
  success: boolean;
  message: string;
  code?: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<SMSCodeResponse>) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed' });
    return;
  }

  const { phone }: SMSCodeRequest = req.body;

  if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
    res.status(400).json({ success: false, message: '请输入正确的手机号码' });
    return;
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  
  // In demo mode, log the code (in production, send actual SMS)
  console.log(`SMS Code for ${phone}: ${code}`);

  res.status(200).json({ 
    success: true, 
    message: '验证码已发送',
    // For demo only
    code: process.env.NODE_ENV === 'development' ? code : undefined
  });
}