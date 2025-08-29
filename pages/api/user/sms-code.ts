import { withSafeKoa } from '../core';

const router = require('@koa/router')();

// SMS Code endpoint
router.post('/sms-code', async (ctx: any) => {
  const { phone } = ctx.request.body;

  if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
    ctx.status = 400;
    ctx.body = { success: false, message: '请输入正确的手机号码' };
    return;
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  
  // In demo mode, log the code (in production, send actual SMS)
  console.log(`SMS Code for ${phone}: ${code}`);

  ctx.body = { 
    success: true, 
    message: '验证码已发送',
    // For demo only
    code: process.env.NODE_ENV === 'development' ? code : undefined
  };
});

export default withSafeKoa(router.routes(), router.allowedMethods());