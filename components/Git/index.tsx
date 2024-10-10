import { GitRepository } from 'mobx-github';
import { FC } from 'react';

import { GitCard } from './Card';
import { Grid2 } from '@mui/material';

export const GitListLayout: FC<{ defaultData: GitRepository[] }> = ({ defaultData }) => (
  <Grid2 component="ul" className="g-4">
    {defaultData.map(item => (
      <Grid2 component="li" key={item.id}>
        <GitCard className="h-100 shadow-sm" {...item} />
      </Grid2>
    ))}
  </Grid2>
);
