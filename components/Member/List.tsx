import { FC } from 'react';

import { Member } from '../../models/Member';
import { MemberCard } from './Card';
import { Grid2 } from '@mui/material';

export const MemberListLayout: FC<{ defaultData: Member[] }> = ({ defaultData }) => (
  <Grid2 component="ul" className="gap-4">
    {defaultData.map(item => (
      <Grid2 component="li" key={item.id + ''}>
        <MemberCard className="h-100 shadow-sm" {...item} />
      </Grid2>
    ))}
  </Grid2>
);
