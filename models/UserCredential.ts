import { UserCredential } from '@idea2app/data-server';
import { toggle } from 'mobx-restful';

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

  @toggle('uploading')
  async deleteOne(id: string | number) {
    const { uuid = '' } =
      this.currentOne.id === id
        ? this.currentOne
        : this.allItems.find(item => item.id === id) || {};

    await super.deleteOne(id);

    await PublicKeyCredential.signalUnknownCredential?.({
      rpId: location.hostname,
      credentialId: uuid,
    });
  }
}

export default new UserCredentialModel();
