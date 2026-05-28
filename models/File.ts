import { toggle } from 'mobx-restful';
import { blobOf, uniqueID } from 'web-utility';

import userStore from './User';

export interface SignedLink {
  getLink: string;
  putLink: string;
}

export class FileModel {
  client = userStore.client;

  @toggle('uploading')
  async upload(file: string | Blob) {
    if (typeof file === 'string') {
      const name = file.split('/').pop()!;

      file = new File([await blobOf(file)], name);
    }
    const { body } = await this.client.post<SignedLink>(
      `file/signed-link/${file instanceof File ? file.name : uniqueID()}`,
    );
    await this.client.put(body!.putLink, file, { 'Content-Type': file.type });

    return body!.getLink;
  }
}

export default new FileModel();
