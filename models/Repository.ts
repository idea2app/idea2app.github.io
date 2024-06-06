import { observable } from 'mobx';
import {
  githubClient,
  GitRepository,
  Organization,
  RepositoryModel,
} from 'mobx-github';
import { parseCookie } from 'mobx-i18n';
import { Stream } from 'mobx-restful';
import { buildURLData, mergeStream } from 'web-utility';

import { API_Host, isServer } from './Base';

const GithubToken =
  parseCookie(globalThis.document?.cookie || '').token ||
  process.env.GITHUB_TOKEN;

if (!isServer()) githubClient.baseURI = `${API_Host}/api/GitHub/`;

githubClient.use(({ request }, next) => {
  if (GithubToken)
    request.headers = {
      authorization: `Bearer ${GithubToken}`,
      ...request.headers,
    };
  return next();
});

type Repository = Omit<GitRepository, keyof RepositoryModel['relation']>;

export class GitRepositoryModel extends Stream<GitRepository>(RepositoryModel) {
  client = githubClient;

  organizations = ['idea2app', 'IdeaMall', 'EasyWebApp'];

  @observable
  accessor currentGroup: GitRepository[] = [];

  async getGroup(URIs: string[]) {
    return (this.currentGroup = await Promise.all(
      URIs.map(URI => this.getOne(URI)),
    ));
  }

  async *getRepository(organization: string) {
    const per_page = this.pageSize;

    this.totalCount ||= 0;
    this.totalCount += await this.getRepositoryCount(organization);

    for (let page = 1, count = 0; count <= this.totalCount; page++) {
      const { body: list } = await this.client.get<Repository[]>(
        `orgs/${organization}/repos?${buildURLData({
          type: 'public',
          sort: 'pushed',
          page,
          per_page,
        })}`,
      );
      if (!list?.length) break;

      count += list!.length;

      const pageData = await Promise.all(
        list!.map(async ({ full_name, ...item }) => ({
          ...item,
          full_name,
          // @ts-ignore
          ...(await this.getOneRelation(full_name, ['languages'])),
        })),
      );
      yield* pageData as GitRepository[];
    }
  }

  async getRepositoryCount(organization: string) {
    const { body } = await this.client.get<Organization>(
      `orgs/${organization}`,
    );
    return body!.public_repos;
  }

  openStream() {
    return mergeStream(
      ...this.organizations.map(organization =>
        this.getRepository.bind(this, organization),
      ),
    );
  }
}

export default new GitRepositoryModel('idea2app');
