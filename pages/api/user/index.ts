import { Context } from 'koa';
import { sign } from 'jsonwebtoken';

import { withSafeKoaRouter } from '../core';
import { JWT_SECRET } from '../../../models/configuration';

interface SMSCodeRequest {
  phone: string;
}

interface SignUpRequest {
  phone: string;
  password?: string;
  verificationCode?: string;
}

interface SignInRequest {
  phone: string;
  password?: string;
  verificationCode?: string;
}

// In-memory storage for demo purposes (in production, use Redis or database)
const smsCodeStore = new Map<string, { code: string; expiry: number }>();
const userStore = new Map<string, { id: string; phone: string; password?: string; createdAt: Date }>();

// Generate random 6-digit SMS code
function generateSMSCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Validate Chinese mobile phone number
function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
}

// Hash password (in production, use bcrypt or similar)
function hashPassword(password: string): string {
  // Simple hash for demo (use proper hashing in production)
  return Buffer.from(password).toString('base64');
}

// Verify password
function verifyPassword(password: string, hashedPassword: string): boolean {
  return hashPassword(password) === hashedPassword;
}

const router = require('@koa/router')();

// Send SMS verification code
router.post('/sms-code', async (context: Context) => {
  const { phone }: SMSCodeRequest = context.request.body;

  if (!phone || !isValidPhoneNumber(phone)) {
    context.status = 400;
    context.body = { success: false, message: '请输入正确的手机号码' };
    return;
  }

  const code = generateSMSCode();
  const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes

  // Store code (in production, also send actual SMS)
  smsCodeStore.set(phone, { code, expiry });

  // For demo purposes, log the code (in production, send actual SMS)
  console.log(`SMS Code for ${phone}: ${code}`);

  context.body = { 
    success: true, 
    message: '验证码已发送',
    // For demo only - in production, never return the actual code
    code: process.env.NODE_ENV === 'development' ? code : undefined
  };
});

// Sign up with password
router.post('/signup', async (context: Context) => {
  const { phone, password }: SignUpRequest = context.request.body;

  if (!phone || !isValidPhoneNumber(phone)) {
    context.status = 400;
    context.body = { success: false, message: '请输入正确的手机号码' };
    return;
  }

  if (!password || password.length < 6) {
    context.status = 400;
    context.body = { success: false, message: '密码至少需要6位' };
    return;
  }

  if (userStore.has(phone)) {
    context.status = 400;
    context.body = { success: false, message: '手机号已注册' };
    return;
  }

  const user = {
    id: `user_${Date.now()}`,
    phone,
    password: hashPassword(password),
    createdAt: new Date(),
  };

  userStore.set(phone, user);

  const token = sign({ phone, id: user.id }, JWT_SECRET!, { expiresIn: '7d' });

  context.body = {
    success: true,
    user: { id: user.id, phone: user.phone, createdAt: user.createdAt },
    token,
  };
});

// Sign up with SMS code
router.post('/signup-sms', async (context: Context) => {
  const { phone, verificationCode }: SignUpRequest = context.request.body;

  if (!phone || !isValidPhoneNumber(phone)) {
    context.status = 400;
    context.body = { success: false, message: '请输入正确的手机号码' };
    return;
  }

  if (!verificationCode) {
    context.status = 400;
    context.body = { success: false, message: '请输入验证码' };
    return;
  }

  const storedCode = smsCodeStore.get(phone);
  if (!storedCode || storedCode.expiry < Date.now()) {
    context.status = 400;
    context.body = { success: false, message: '验证码已过期，请重新获取' };
    return;
  }

  if (storedCode.code !== verificationCode) {
    context.status = 400;
    context.body = { success: false, message: '验证码错误' };
    return;
  }

  if (userStore.has(phone)) {
    context.status = 400;
    context.body = { success: false, message: '手机号已注册' };
    return;
  }

  const user = {
    id: `user_${Date.now()}`,
    phone,
    createdAt: new Date(),
  };

  userStore.set(phone, user);
  smsCodeStore.delete(phone); // Clean up used code

  const token = sign({ phone, id: user.id }, JWT_SECRET!, { expiresIn: '7d' });

  context.body = {
    success: true,
    user: { id: user.id, phone: user.phone, createdAt: user.createdAt },
    token,
  };
});

// Sign in with password
router.post('/signin', async (context: Context) => {
  const { phone, password }: SignInRequest = context.request.body;

  if (!phone || !isValidPhoneNumber(phone)) {
    context.status = 400;
    context.body = { success: false, message: '请输入正确的手机号码' };
    return;
  }

  if (!password) {
    context.status = 400;
    context.body = { success: false, message: '请输入密码' };
    return;
  }

  const user = userStore.get(phone);
  if (!user) {
    context.status = 400;
    context.body = { success: false, message: '用户不存在' };
    return;
  }

  if (!user.password || !verifyPassword(password, user.password)) {
    context.status = 400;
    context.body = { success: false, message: '密码错误' };
    return;
  }

  const token = sign({ phone, id: user.id }, JWT_SECRET!, { expiresIn: '7d' });

  context.body = {
    success: true,
    user: { id: user.id, phone: user.phone, createdAt: user.createdAt },
    token,
  };
});

// Sign in with SMS code
router.post('/signin-sms', async (context: Context) => {
  const { phone, verificationCode }: SignInRequest = context.request.body;

  if (!phone || !isValidPhoneNumber(phone)) {
    context.status = 400;
    context.body = { success: false, message: '请输入正确的手机号码' };
    return;
  }

  if (!verificationCode) {
    context.status = 400;
    context.body = { success: false, message: '请输入验证码' };
    return;
  }

  const storedCode = smsCodeStore.get(phone);
  if (!storedCode || storedCode.expiry < Date.now()) {
    context.status = 400;
    context.body = { success: false, message: '验证码已过期，请重新获取' };
    return;
  }

  if (storedCode.code !== verificationCode) {
    context.status = 400;
    context.body = { success: false, message: '验证码错误' };
    return;
  }

  const user = userStore.get(phone);
  if (!user) {
    context.status = 400;
    context.body = { success: false, message: '用户不存在，请先注册' };
    return;
  }

  smsCodeStore.delete(phone); // Clean up used code

  const token = sign({ phone, id: user.id }, JWT_SECRET!, { expiresIn: '7d' });

  context.body = {
    success: true,
    user: { id: user.id, phone: user.phone, createdAt: user.createdAt },
    token,
  };
});

// Get user profile
router.get('/profile', async (context: Context) => {
  // In production, verify JWT token from cookies/headers
  const token = context.cookies.get('token') || context.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    context.status = 401;
    context.body = { success: false, message: '未登录' };
    return;
  }

  try {
    // In production, verify JWT token properly
    context.body = {
      success: true,
      user: { id: 'demo_user', phone: '13800138000' }, // Demo response
    };
  } catch (error) {
    context.status = 401;
    context.body = { success: false, message: '登录已过期' };
  }
});

export default withSafeKoaRouter(router);