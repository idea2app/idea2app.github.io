import { UserCredential } from '@idea2app/data-server';
import { toggle } from 'mobx-restful';

import { TableModel } from './Base';
import userStore from './User';

export class UserCredentialModel extends TableModel<UserCredential> {
  baseURI = 'user/WebAuthn/session/credential';

  client = userStore.client;

  @toggle('uploading')
  async createCredential(email: string) {
    const { client } = await import('@passwordless-id/webauthn');

    const challenge = await userStore.createChallenge();

    const registration = await client.register({ user: email, challenge });

    const { body } = await this.client.post<UserCredential>(this.baseURI, {
      ...registration,
      challenge,
    });

    if (!body) return body;

    const allItems = [...this.allItems, body];
    const pageSize = this.pageSize || allItems.length;
    const totalCount = this.totalCount ?? this.allItems.length;

    this.restoreList({
      pageIndex: this.pageIndex || 1,
      pageSize,
      allItems,
      totalCount: Number.isFinite(totalCount) ? totalCount + 1 : allItems.length,
    });

    return body;
  }

  clearCredentialList() {
    this.clearList();
    this.totalCount = 0;
  }

  @toggle('uploading')
  async deleteCredential(id: number) {
    await this.client.delete(`${this.baseURI}/${id}`);

    const allItems = this.allItems.filter(item => item.id !== id);
    const pageSize = this.pageSize || allItems.length;
    const totalCount = this.totalCount ?? this.allItems.length;

    if (!allItems[0]) return this.clearCredentialList();

    this.restoreList({
      pageIndex: Math.min(this.pageIndex, Math.ceil(allItems.length / pageSize)) || 1,
      pageSize,
      allItems,
      totalCount: Math.max(totalCount - 1, 0),
    });
  }
}

export default new UserCredentialModel();
