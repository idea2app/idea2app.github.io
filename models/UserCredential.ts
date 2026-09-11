import { UserCredential } from '@idea2app/data-server';

import { TableModel } from './Base';
import userStore from './User';

export class UserCredentialModel extends TableModel<UserCredential> {
  baseURI = 'user/WebAuthn/session/credential';

  client = userStore.client;

  async createOne(email: string) {
    const credential = await userStore.signUpWebAuthn(email);

    this.restoreList({ allItems: [credential, ...this.allItems] });

    return credential;
  }
}

export default new UserCredentialModel();
