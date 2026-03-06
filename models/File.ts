import { Base } from '@idea2app/data-server';
import { toggle } from 'mobx-restful';

import { TableModel } from './Base';
import userStore from './User';

interface SignedLink {
  putLink: string;
  getLink: string;
}

export class FileModel extends TableModel<Base> {
  baseURI = 'file';
  client = userStore.client;

  @toggle('uploading')
  async upload(file: File | Blob) {
    const name = file instanceof File ? file.name : crypto.randomUUID();

    const { body } = await this.client.post<SignedLink>(`file/signed-link/${name}`);

    await fetch(body!.putLink, {
      method: 'PUT',
      body: file,
      headers: { 'Content-Type': file.type },
    });

    return body!.getLink;
  }
}

export default new FileModel();
