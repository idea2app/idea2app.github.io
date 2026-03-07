import { SignedLink } from '@idea2app/data-server';
import { BaseModel, toggle } from 'mobx-restful';

import userStore from './User';

export class FileModel extends BaseModel {
  baseURI = 'file';
  client = userStore.client;

  @toggle('uploading')
  async upload(file: File | Blob) {
    const name = file instanceof File ? file.name : crypto.randomUUID();

    const { body } = await this.client.post<SignedLink>(`${this.baseURI}/signed-link/${name}`);

    await this.client.put(body!.putLink, file, { 'Content-Type': file.type });

    return body!.getLink;
  }
}

export default new FileModel();
