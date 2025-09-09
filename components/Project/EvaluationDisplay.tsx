import { RequirementEvaluation, UserRole } from '@idea2app/data-server';
import { Box, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { FC, useContext } from 'react';

import { I18nContext } from '../../models/Translation';
import userStore from '../../models/User';

export const EvaluationDisplay: FC<RequirementEvaluation> = observer(
  ({
    title,
    scopes = [],
    developerCount,
    designerCount,
    workload,
    monthPeriod,
    budget,
    factor,
  }) => {
    const { t } = useContext(I18nContext),
      { roles } = userStore.session || {};

    return (
      <Box
        sx={{
          '& .evaluation-item': {
            marginBottom: 1,
            fontSize: '0.875rem',
            padding: '4px 0',
            borderLeft: '3px solid',
            borderColor: 'primary.light',
            paddingLeft: 1,
          },
          '& ul': {
            margin: '8px 0',
            paddingLeft: '20px',
          },
          '& li': {
            marginBottom: '4px',
          },
        }}
      >
        {title && (
          <Box className="evaluation-item">
            <Typography component="h3" sx={{ fontWeight: 600, mb: 1 }}>
              {title}
            </Typography>
          </Box>
        )}
        {scopes[0] && (
          <Box className="evaluation-item">
            <Typography component="h4" sx={{ fontWeight: 600 }}>
              {t('development_scopes')}
            </Typography>
            <Box component="ul" sx={{ mt: 0.5 }}>
              {scopes.map(scope => (
                <Box key={scope} component="li" sx={{ ml: 1 }}>
                  {scope}
                </Box>
              ))}
            </Box>
          </Box>
        )}
        {workload && (
          <Box className="evaluation-item">
            <Typography component="h4" sx={{ fontWeight: 600 }}>
              {t('workload')}
            </Typography>{' '}
            {workload} {t('hours')}
          </Box>
        )}
        {monthPeriod && (
          <Box className="evaluation-item">
            <Typography component="h4" sx={{ fontWeight: 600 }}>
              {t('timeline')}
            </Typography>{' '}
            {monthPeriod} {t('months')}
          </Box>
        )}
        {budget && (
          <Box className="evaluation-item">
            <Typography component="h4" sx={{ fontWeight: 600 }}>
              {t('budget')}
            </Typography>{' '}
            ￥{budget.toLocaleString()}
          </Box>
        )}
        {(developerCount || designerCount) && (
          <Box className="evaluation-item">
            <Typography component="h4" sx={{ fontWeight: 600 }}>
              {t('team_size')}
            </Typography>{' '}
            {[
              developerCount && `${developerCount} ${t('developers')}`,
              designerCount && `${designerCount} ${t('designers')}`,
            ]
              .filter(Boolean)
              .join(', ')}
          </Box>
        )}
        {roles && roles.includes(2 as UserRole.Client) && (
          <Box className="evaluation-item">
            <Typography component="h4" sx={{ fontWeight: 600 }}>
              {t('complexity_factor')}
            </Typography>{' '}
            {factor}
          </Box>
        )}
      </Box>
    );
  },
);
