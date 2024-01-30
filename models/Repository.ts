import { components } from '@octokit/openapi-types';
import { memoize } from 'lodash';
import { observable } from 'mobx';
import { ListModel, Stream, toggle } from 'mobx-restful';
import { averageOf, buildURLData, mergeStream } from 'web-utility';

import { githubClient } from './Base';

type Repository = components['schemas']['minimal-repository'];

export interface GitRepository extends Repository {
  languages?: string[];
}
export type Organization = components['schemas']['organization-full'];

export class RepositoryModel extends Stream<GitRepository>(ListModel) {
  client = githubClient;
  indexKey = 'full_name' as const;

  organizations = ['idea2app', 'IdeaMall', 'EasyWebApp'];

  @observable
  accessor currentGroup: GitRepository[] = [];

  getGitLanguages = memoize(async (URI: string) => {
    const { body: languageCount } = await this.client.get<
      Record<string, number>
    >(`repos/${URI}/languages`);

    const languageAverage = averageOf(...Object.values(languageCount!));

    const languageList = Object.entries(languageCount!)
      .filter(([_, score]) => score >= languageAverage)
      .sort(([_, a], [__, b]) => b - a);

    return languageList.map(([name]) => name);
  });

  @toggle('downloading')
  async getOne(URI: string) {
    const { body } = await this.client.get<Repository>(`repos/${URI}`);

    return (this.currentOne = {
      ...body!,
      languages: await this.getGitLanguages(URI),
    });
  }

  async getGroup(URIs: string[]) {
    return (this.currentGroup = await Promise.all(
      URIs.map(URI => this.getOne(URI)),
    ));
  }

  async *getRepository(organization: string) {
    const per_page = this.pageSize;

    this.totalCount ||= 0;
    this.totalCount += await this.getRepositoryCount(organization);

    for (let page = 1, count = 0; ; page++) {
      const { body: list } = await this.client.get<Repository[]>(
        `orgs/${organization}/repos?${buildURLData({
          type: 'public',
          sort: 'pushed',
          page,
          per_page,
        })}`,
      );
      count += list!.length;

      if (count < page * per_page) break;

      const pageData = await Promise.all(
        list!.map(async ({ full_name, ...item }) => ({
          ...item,
          full_name,
          languages: await this.getGitLanguages(full_name),
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

export default new RepositoryModel();
