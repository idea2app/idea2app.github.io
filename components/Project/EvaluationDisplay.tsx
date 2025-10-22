import {
  PrototypeType,
  PrototypeVersion,
  RequirementEvaluation,
  UserRole,
} from '@idea2app/data-server';
import { Box, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { FC, useContext } from 'react';

import { i18n, I18nContext } from '../../models/Translation';
import userStore from '../../models/User';
import { PrototypeGenerator, PrototypeGeneratorProps } from './PrototypeGenerator';

export const DevelopmentScopeName = ({ t }: typeof i18n) => [
  t('product_prototype'),
  t('ui_design'),
  t('desktop'),
  t('mobile'),
  t('server'),
];

export interface EvaluationDisplayProps
  extends RequirementEvaluation,
    Pick<PrototypeGeneratorProps, 'projectId' | 'messageId'> {
  prototypes?: PrototypeVersion[];
}

export const EvaluationDisplay: FC<EvaluationDisplayProps> = observer(
  ({
    title,
    scopes = [],
    models,
    developerCount,
    designerCount,
    workload,
    monthPeriod,
    budget,
    factor,
    projectId,
    messageId,
    prototypes,
  }) => {
    const i18n = useContext(I18nContext);
    const { t } = i18n,
      { roles } = userStore.session || {};

    return (
      <Box
        className="prose"
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
              {scopes.map(scope => {
                const prototypeType = (
                  scope === 2 ? 'desktop' : scope === 3 ? 'mobile' : undefined
                ) as PrototypeType;

                return (
                  <Box
                    key={scope}
                    component="li"
                    sx={{ ml: 1, display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    {DevelopmentScopeName(i18n)[scope]}

                    {prototypeType && (
                      <PrototypeGenerator
                        {...{ projectId, messageId }}
                        type={prototypeType}
                        prototype={prototypes?.find(({ type }) => type === prototypeType)}
                      />
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}
        {models?.[0] && (
          <Box className="evaluation-item">
            <Typography component="h4" sx={{ fontWeight: 600 }}>
              {t('feature_modules')}
            </Typography>
            <Box component="ol" sx={{ mt: 0.5 }}>
              {models.map((model, index) => (
                <Box key={index} component="li" sx={{ ml: 1 }}>
                  {model}
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
            RMB￥{budget.toLocaleString()}
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
