import { createKoaRouter } from 'next-ssr-middleware';

import { githubClient } from '../../../models/Base';
import { CRAWLER_TOKEN } from '../../../models/configuration';
import { withSafeKoaRouter } from '../core';

export interface CrawlerTask {
  URI: string;
  title?: string;
}

export const config = { api: { bodyParser: false } };

const router = createKoaRouter(import.meta.url);

router.post('/', async context => {
  if (!CRAWLER_TOKEN || CRAWLER_TOKEN !== context.get('Authorization')?.split(/\s+/)[1])
    return context.throw(401);

  const { URI, title = URI } = Reflect.get(context.request, 'body') as CrawlerTask;

  const { status, body } = await githubClient.post('repos/idea2app/OWS-cache/issues', {
    title,
    body: `### URL\n\n${URI}`,
    labels: ['crawler'],
  });
  context.status = status;
  context.body = body;
});

export default withSafeKoaRouter(router);
