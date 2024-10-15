import { FC } from 'react';

import { Member } from '../../models/Member';
import { MemberCard } from './Card';

export const MemberListLayout: FC<{ defaultData: Member[] }> = ({ defaultData }) => (
  <ul className="gap-4">
    {defaultData?.map(item => (
      <li key={String(item.id)}>
        <MemberCard className="h-100 shadow-sm" {...item} />
      </li>
    ))}
  </ul>
);
