import { Context } from 'koa';
import { createKoaRouter, withKoaRouter } from 'next-ssr-middleware';

import { safeAPI, verifyJWT } from '../../../core';
import { lark } from '../../core';

export const config = { api: { bodyParser: false } };

const router = createKoaRouter(import.meta.url);

interface PublishOption {
  enablePassword?: boolean;
  editable?: boolean;
}

router.post('/:type/:id', safeAPI, verifyJWT, async (context: Context) => {
  const { type, id } = context.params,
    { editable, enablePassword } = Reflect.get(context.request, 'body') as PublishOption;

  context.body = await lark.publishFile(`${type}/${id}`, enablePassword, editable);
});

export default withKoaRouter(router);
