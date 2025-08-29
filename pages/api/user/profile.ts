import { withSafeKoa } from '../core';

const router = require('@koa/router')();

// Get user profile endpoint
router.get('/profile', async (ctx: any) => {
  // For demo purposes, return a mock user when not authenticated
  // In production, verify JWT token from cookies/headers
  const token = ctx.cookies.get('token') || ctx.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    ctx.status = 401;
    ctx.body = { success: false, message: '未登录' };
    return;
  }

  // For demo, return mock user data
  ctx.body = {
    success: true,
    user: { 
      id: 'demo_user', 
      phone: '13800138000',
      nickname: '演示用户',
      createdAt: new Date().toISOString()
    },
  };
});

export default withSafeKoa(router.routes(), router.allowedMethods());