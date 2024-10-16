import { GitRepository } from 'mobx-github';
import { FC } from 'react';

import { GitCard } from './Card';

export const GitListLayout: FC<{ defaultData: GitRepository[] }> = ({ defaultData }) => (
  <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
    {defaultData.map(item => (
      <GitCard key={item.id} className="h-full" {...item} />
    ))}
  </ul>
);
