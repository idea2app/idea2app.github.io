import { RequirementEvaluation } from '@idea2app/data-server';
import { Box, Typography } from '@mui/material';
import { FC, useContext } from 'react';

import { I18nContext } from '../../models/Translation';

export const EvaluationDisplay: FC<RequirementEvaluation> = ({
  title,
  description,
  scopes = [],
  developerCount,
  designerCount,
  workload,
  monthPeriod,
  budget,
  factor,
}) => {
  const { t } = useContext(I18nContext);

  return (
    <Box sx={{
      '& .evaluation-item': {
        marginBottom: 1,
        fontSize: '0.875rem',
        padding: '4px 0',
        borderLeft: '3px solid',
        borderColor: 'primary.light',
        paddingLeft: 1,
      },
      '& strong': {
        fontWeight: 600,
        color: 'primary.dark',
      },
      '& ul': {
        margin: '8px 0',
        paddingLeft: '20px',
      },
      '& li': {
        marginBottom: '4px',
      },
    }}>
      {title && (
        <Box className="evaluation-item">
          <Typography component="h3" sx={{ fontWeight: 600, mb: 1 }}>
            {title}
          </Typography>
        </Box>
      )}

      {description && (
        <Box className="evaluation-item">
          <Typography component="span" sx={{ fontWeight: 600 }}>
            {t('description')}
          </Typography>
          {' '}
          {description}
        </Box>
      )}
      
      {scopes && scopes.length > 0 && (
        <Box className="evaluation-item">
          <Typography component="span" sx={{ fontWeight: 600 }}>
            {t('development_scopes')}
          </Typography>
          <Box component="ul" sx={{ mt: 0.5 }}>
            {scopes.map((scope, index) => (
              <Box key={index} component="li" sx={{ ml: 1 }}>
                {scope}
              </Box>
            ))}
          </Box>
        </Box>
      )}
      
      {workload && (
        <Box className="evaluation-item">
          <Typography component="span" sx={{ fontWeight: 600 }}>
            {t('workload')}
          </Typography>
          {' '}
          {workload} {t('hours')}
        </Box>
      )}
      
      {monthPeriod && (
        <Box className="evaluation-item">
          <Typography component="span" sx={{ fontWeight: 600 }}>
            {t('timeline')}
          </Typography>
          {' '}
          {monthPeriod} {t('months')}
        </Box>
      )}

      {budget && (
        <Box className="evaluation-item">
          <Typography component="span" sx={{ fontWeight: 600 }}>
            {t('budget')}
          </Typography>
          {' '}
          ${budget.toLocaleString()}
        </Box>
      )}

      {(developerCount || designerCount) && (
        <Box className="evaluation-item">
          <Typography component="span" sx={{ fontWeight: 600 }}>
            {t('team_size')}
          </Typography>
          {' '}
          {[
            developerCount && `${developerCount} ${t('developers')}`,
            designerCount && `${designerCount} ${t('designers')}`
          ].filter(Boolean).join(', ')}
        </Box>
      )}

      {factor && (
        <Box className="evaluation-item">
          <Typography component="span" sx={{ fontWeight: 600 }}>
            {t('complexity_factor')}
          </Typography>
          {' '}
          {factor}
        </Box>
      )}
    </Box>
  );
};