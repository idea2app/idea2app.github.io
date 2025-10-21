import { Project } from '@idea2app/data-server';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { FC, useContext } from 'react';

import { I18nContext } from '../../models/Translation';

export const ProjectCard: FC<Project> = observer(({ id, name, status }) => {
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
            bgcolor: status === 1 ? 'success.light' : status === 0 ? 'grey.200' : 'warning.light',
            color:
              status === 1
                ? 'success.contrastText'
                : status === 0
                  ? 'text.primary'
                  : 'warning.contrastText',
          }}
        >
          {status === 1
            ? t('project_open')
            : status === 0
              ? t('project_closed')
              : t('project_pending')}
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
