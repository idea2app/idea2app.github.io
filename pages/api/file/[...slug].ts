import { createKoaRouter, withKoaRouter } from 'next-ssr-middleware';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import mime from 'mime';

import { safeAPI } from '../core';
import { resolveLarkFileURL } from '../Lark/core';

export const config = { api: { bodyParser: false } };

const router = createKoaRouter(import.meta.url);

const GoogleAI = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

router.post('/markdown', safeAPI, async context => {
  const { URI } = Reflect.get(context.request, 'body') || {};
  const fileURI = String(URI || '').trim();

  if (!fileURI) throw new ReferenceError('URI is required');

  const mediaType = mime.getType(new URL(fileURI).pathname) || 'application/octet-stream';
  const url = new URL(resolveLarkFileURL(fileURI));

  const prompt = `请识别以下文件中的文字，并以 Markdown 格式返回，并遵循以下规则：
1. 忽略背景水印中的文字
2. CJK 字符附近的标点符号，应用中文（全角）标点
3. 如有表格，则用 Markdown 表格语法表示
4. 如有流程图，则在 Markdown 中插入 Mermaid 代码块来表示流程图内容
5. 如有数学公式，则在 Markdown 中插入 LaTeX 代码块来表示数学公式内容
6. 其它文字则以其在上下文中的作用，多用语义类 Markdown 语法（标题、列表等），少用样式类语法（加粗、斜体等）来表示`;

  const { text } = await generateText({
    model: GoogleAI('gemini-2.5-flash-lite'),
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          { type: 'file', mediaType, data: { type: 'url', url } },
        ],
      },
    ],
  });
  context.body = { url, mediaType, text };
});

export default withKoaRouter(router);
