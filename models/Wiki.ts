import { WikiNodeModel } from 'mobx-lark';

import { lark } from '../pages/api/Lark/core';
import { LarkWikiDomain, LarkWikiId } from './configuration';

export class MyWikiNodeModel extends WikiNodeModel {
  client = lark.client;
}

export default new MyWikiNodeModel(LarkWikiDomain, LarkWikiId);
