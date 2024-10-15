import { observable } from 'mobx';
import { githubClient, GitRepository, RepositoryFilter, RepositoryModel } from 'mobx-github';
import { parseCookie } from 'mobx-i18n';
import { Stream } from 'mobx-restful';

import { API_Host, isServer } from './Base';

const GithubToken =
  parseCookie(globalThis.document?.cookie || '').token || process.env.GITHUB_TOKEN;

if (!isServer()) githubClient.baseURI = `${API_Host}/api/GitHub/`;

githubClient.use(({ request }, next) => {
  if (GithubToken)
    request.headers = {
      authorization: `Bearer ${GithubToken}`,
      ...request.headers
    };
  return next();
});

export class GitRepositoryModel extends Stream<GitRepository, RepositoryFilter>(RepositoryModel) {
  client = githubClient;

  organizations = ['idea2app', 'IdeaMall', 'EasyWebApp'];

  @observable
  accessor currentGroup: GitRepository[] = [];

  async getGroup(URIs: string[]) {
    return (this.currentGroup = await Promise.all(URIs.map(URI => this.getOne(URI))));
  }

  async *openStream(filter: RepositoryFilter) {
    const loadPage = (page: number, pageSize: number, filter: RepositoryFilter) =>
      RepositoryModel.prototype.loadPage.call(this, page, pageSize, filter);
    let count = 0;

    for (const name of this.organizations) {
      this.baseURI = `orgs/${name}/repos`;

      for (let i = 1; ; i++) {
        const { pageData, totalCount } = await loadPage.call(this, i, this.pageSize, filter);
        const list = pageData.filter(
          ({ description, topics, fork, archived }) =>
            description?.trim() && topics?.[0] && !fork && !archived
        );
        const droppedCount = pageData.length - list.length;

        if (!pageData[0]) break;

        if (i === 1) count += totalCount;
        if (droppedCount) count -= droppedCount;

        yield* list;

        if (pageData.length < this.pageSize) break;
      }
    }
    this.totalCount = count;
  }
}

export default new GitRepositoryModel('idea2app');
