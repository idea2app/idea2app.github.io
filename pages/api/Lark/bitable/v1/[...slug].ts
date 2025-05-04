import { LarkPageData, TableCellText, TableRecord, TableRecordData } from 'mobx-lark';
import { DataObject } from 'mobx-restful';
import { createKoaRouter } from 'next-ssr-middleware';

import { JWTContext, parseJWT, verifyJWT, withSafeKoaRouter } from '../../../core';
import { proxyLark, proxyLarkAll } from '../../core';

export const config = { api: { bodyParser: false } };

const router = createKoaRouter(import.meta.url);

type ControlledData = Partial<Record<'authorizedEmails', TableCellText[]>>;

function filterData(fields: DataObject) {
  for (const key of Object.keys(fields)) if (!/^\w+$/.test(key)) delete fields[key];
}

router.get('/apps/:app/tables/:table/records/:record', parseJWT, async (context: JWTContext) => {
  const { status, body } = await proxyLark<TableRecordData<ControlledData>>(context);

  const { fields } = body!.data!.record;
  const { authorizedEmails } = fields;

  if (authorizedEmails) {
    const { state } = context;

    if ('jwtOriginalError' in state) return context.throw(401);

    if (!authorizedEmails[0]?.text.includes(state.user.email!)) return context.throw(403);
  }
  filterData(fields);

  context.status = status;
  context.body = body;
});

router.get('/apps/:app/tables/:table/records', parseJWT, async (context: JWTContext) => {
  const { status, body } = await proxyLark<LarkPageData<TableRecord<ControlledData>>>(context);

  const list = body!.data!.items || [],
    { state } = context;

  for (const { fields } of list) {
    if (fields.authorizedEmails) {
      if ('jwtOriginalError' in state) return context.throw(401);

      if (!fields.authorizedEmails[0]?.text.includes(state.user.email!)) return context.throw(403);
    }
    filterData(fields);
  }
  context.status = status;
  context.body = body;
});

router.all('/(.*)', verifyJWT, proxyLarkAll);

export default withSafeKoaRouter(router);
