import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import { FC } from 'react';

export interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  status: string;
}

export const ProjectCard: FC<ProjectCardProps> = ({ id, name, description, status }) => (
  <Card>
    <CardContent>
      <Typography variant="h6" component="h3" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {description}
      </Typography>
      <Typography 
        variant="caption" 
        sx={{ 
          px: 1, 
          py: 0.5, 
          borderRadius: 1, 
          bgcolor: status === '评估完成' ? 'success.light' : 
                  status === '评估中' ? 'warning.light' : 'grey.200',
          color: status === '评估完成' ? 'success.contrastText' : 
                 status === '评估中' ? 'warning.contrastText' : 'text.primary'
        }}
      >
        {status}
      </Typography>
    </CardContent>
    <CardActions>
      <Button
        component={Link}
        href={`/dashboard/project/${id}`}
        size="small"
        variant="contained"
      >
        查看评估
      </Button>
    </CardActions>
  </Card>
);