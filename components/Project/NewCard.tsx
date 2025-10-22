import { Project } from '@idea2app/data-server';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { FC, useContext } from 'react';

import { I18nContext } from '../../models/Translation';
import type zhCN from '../../translation/zh-CN';

const statusTextKeys: (keyof typeof zhCN)[] = [
  'project_open', // Open
  'project_evaluated', // Evaluated
  'project_contract_generated', // ContractGenerated
  'project_in_development', // InDevelopment
  'project_in_testing', // InTesting
  'project_maintenance', // Maintenance
];

const bgColors: string[] = [
  'grey.200', // Open
  'success.light', // Evaluated
  'warning.light', // ContractGenerated
  'info.light', // InDevelopment
  'secondary.light', // InTesting
  'primary.light', // Maintenance
];

const textColors: string[] = [
  'text.primary', // Open
  'success.contrastText', // Evaluated
  'warning.contrastText', // ContractGenerated
  'info.contrastText', // InDevelopment
  'secondary.contrastText', // InTesting
  'primary.contrastText', // Maintenance
];

export const ProjectCard: FC<Project> = observer(({ id, name, status = 0 }) => {
  const { t } = useContext(I18nContext);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h3" gutterBottom>
          {name}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            px: 1,
            py: 0.5,
            borderRadius: 1,
            bgcolor: bgColors[status] ?? 'grey.200',
            color: textColors[status] ?? 'text.primary',
          }}
        >
          {t((statusTextKeys[status] ?? 'project_open') as keyof typeof zhCN)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} href={`/dashboard/project/${id}`} size="small" variant="contained">
          {t('view_evaluation')}
        </Button>
      </CardActions>
    </Card>
  );
});
