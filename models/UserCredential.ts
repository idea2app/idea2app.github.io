import { UserCredential } from '@idea2app/data-server';

import { TableModel } from './Base';
import userStore from './User';

export class UserCredentialModel extends TableModel<UserCredential> {
  baseURI = 'user/WebAuthn/session/credential';

  client = userStore.client;

  async createCredential(email: string) {
    const { client } = await import('@passwordless-id/webauthn');

    const challenge = await userStore.createChallenge();

    const registration = await client.register({ user: email, challenge });
    const pageSize = Math.max(this.allItems.length + 1, 1);

    const credential = await this.updateOne({ ...registration, challenge } as never);

    this.clearList();
    await this.getList(undefined, 1, pageSize);

    return credential;
  }
}

export default new UserCredentialModel();
