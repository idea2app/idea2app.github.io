import { observable } from 'mobx';
import { GitRepository, RepositoryFilter, RepositoryModel } from 'mobx-github';
import { Stream } from 'mobx-restful';

import { githubClient } from './Base';

export class GitRepositoryModel extends Stream<GitRepository, RepositoryFilter>(RepositoryModel) {
  client = githubClient;

  organizations = ['idea2app', 'IdeaMall', 'EasyWebApp'];

  @observable
  accessor currentGroup: GitRepository[] = [];

  async getGroup(URIs: string[]) {
    return (this.currentGroup = await Promise.all(URIs.map(URI => this.getOne(URI))));
  }

  async *openStream(filter: RepositoryFilter) {
    const { loadPage } = RepositoryModel.prototype;
    let count = 0;

    for (const name of this.organizations) {
      this.baseURI = `orgs/${name}/repos`;

      for (let i = 1; ; i++) {
        const { pageData, totalCount } = await loadPage.call(this, i, this.pageSize, filter);
        const list = pageData.filter(
          ({ description, topics, fork, archived }) =>
            description?.trim() && topics?.[0] && !fork && !archived,
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
