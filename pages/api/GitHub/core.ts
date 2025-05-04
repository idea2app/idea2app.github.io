import { Context, Middleware } from 'koa';
import { githubClient } from 'mobx-github';

export const proxyGithub = async <T>({
  method,
  url,
  headers: { host, ...headers },
  request,
}: Context) => {
  const path = url!.slice(`/api/GitHub/`.length),
    body = Reflect.get(request, 'body');

  // @ts-expect-error KoAJAX type compatibility
  return githubClient.request<T>({ method, path, headers, body });
};

export const proxyGitHubAll: Middleware = async context => {
  const { status, body } = await proxyGithub(context);

  context.status = status;
  context.body = body;
};
