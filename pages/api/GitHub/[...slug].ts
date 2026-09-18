import { createKoaRouter, withKoaRouter } from 'next-ssr-middleware';

import { safeAPI, verifyJWT } from '../../../lib/API';
import { proxyGitHubAll } from '../../../lib/GitHub';

export const config = { api: { bodyParser: false } };

const router = createKoaRouter(import.meta.url);

router.get('/{*slug}', safeAPI, proxyGitHubAll).all('/{*slug}', safeAPI, verifyJWT, proxyGitHubAll);

export default withKoaRouter(router);
