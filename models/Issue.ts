import { Issue } from 'mobx-github';
import { Filter, ListModel } from 'mobx-restful';
import { buildURLData, isEmpty } from 'web-utility';

import { githubClient } from './Base';

interface SearchData<T> {
  total_count: number;
  incomplete_results: boolean;
  items: T[];
}

export type IssueFilter = Filter<Issue>;

export class IssueModel extends ListModel<Issue, IssueFilter> {
  baseURI = 'search/issues';
  client = githubClient;

  async loadPage(
    page = this.pageIndex,
    per_page = this.pageSize,
    { repository_url, state, title }: IssueFilter,
  ) {
    const [org, repo] = repository_url?.replace('https://github.com/', '').split('/') || [];

    const condition = Object.entries({ org, repo, type: 'issue', state })
      .filter(([, value]) => !isEmpty(value))
      .map(([key, value]) => `${key}:${value}`)
      .join(' ');

    const { body } = await this.client.get<SearchData<Issue>>(
      `${this.baseURI}?${buildURLData({ page, per_page, q: `${condition} ${title}` })}`,
    );
    return { pageData: body!.items, totalCount: body!.total_count };
  }
}

export default new IssueModel();
