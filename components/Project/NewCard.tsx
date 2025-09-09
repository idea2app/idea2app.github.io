import { Project } from '@idea2app/data-server';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import { FC, useContext } from 'react';

import { I18nContext } from '../../models/Translation';

export const ProjectCard: FC<Project> = ({ id, name, requirementText, projectStatus }) => {
  const { t } = useContext(I18nContext);
  
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h3" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {requirementText || ''}
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            px: 1, 
            py: 0.5,
            borderRadius: 1, 
            bgcolor: projectStatus === '1' ? 'success.light' : 
                    projectStatus === '0' ? 'grey.200' : 'warning.light',
            color: projectStatus === '1' ? 'success.contrastText' : 
                   projectStatus === '0' ? 'text.primary' : 'warning.contrastText'
          }}
        >
          {projectStatus === '1' ? t('project_open') : 
           projectStatus === '0' ? t('project_closed') : t('project_pending')}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          component={Link}
          href={`/dashboard/project/${id}`}
          size="small"
          variant="contained"
        >
          {t('view_evaluation')}
        </Button>
      </CardActions>
    </Card>
  );
};