import { githubClient } from 'mobx-github';

import { safeAPI } from '../core';

export interface CrawlerTask {
  URI: string;
  title?: string;
}

export default safeAPI(async ({ method, body }, response) => {
  if (method !== 'POST') return response.status(405).end();

  const { URI, title = URI } = body as CrawlerTask;

  const { status, body: data } = await githubClient.post(
    'repos/idea2app/OWS-cache/issues',
    {
      title,
      body: `### URL\n\n${URI}`,
      labels: ['crawler'],
    },
  );
  response.status(status).send(data);
});
