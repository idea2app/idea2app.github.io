import { FC } from 'react';

import { Member } from '../../models/Member';
import { MemberCard } from './Card';

export const MemberListLayout: FC<{ defaultData: Member[] }> = ({ defaultData }) => (
  <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
    {defaultData?.map(item => <MemberCard key={String(item.id)} className="h-full" {...item} />)}
  </ul>
);
