import { RequirementEvaluation } from '@idea2app/data-server';
import { Box, Typography } from '@mui/material';
import { FC, useContext } from 'react';

import { I18nContext } from '../../models/Translation';

export const EvaluationDisplay: FC<RequirementEvaluation> = ({
  techStack = [],
  difficulty = '',
  timeline = '',
  cost = '',
  architecture = '',
  keyFeatures = '',
  riskAssessment = '',
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
      {techStack.length > 0 && (
        <Box className="evaluation-item">
          <Typography component="span" sx={{ fontWeight: 600 }}>
            {t('tech_stack')}
          </Typography>
          {' '}
          {techStack.join(', ')}
        </Box>
      )}
      
      {difficulty && (
        <Box className="evaluation-item">
          <Typography component="span" sx={{ fontWeight: 600 }}>
            {t('difficulty')}
          </Typography>
          {' '}
          {difficulty}
        </Box>
      )}
      
      {timeline && (
        <Box className="evaluation-item">
          <Typography component="span" sx={{ fontWeight: 600 }}>
            {t('timeline')}
          </Typography>
          {' '}
          {timeline}
        </Box>
      )}
      
      {cost && (
        <Box className="evaluation-item">
          <Typography component="span" sx={{ fontWeight: 600 }}>
            {t('cost')}
          </Typography>
          {' '}
          {cost}
        </Box>
      )}

      {keyFeatures && (
        <Box className="evaluation-item">
          <Typography component="span" sx={{ fontWeight: 600 }}>
            {t('key_features')}
          </Typography>
          {' '}
          {keyFeatures}
        </Box>
      )}

      {riskAssessment && (
        <Box className="evaluation-item">
          <Typography component="span" sx={{ fontWeight: 600 }}>
            {t('risk_assessment')}
          </Typography>
          {' '}
          {riskAssessment}
        </Box>
      )}
      
      {architecture && (
        <Box className="evaluation-item">
          <Typography component="h3" sx={{ fontWeight: 600 }}>
            {t('architecture')}
          </Typography>
          <Box component="ul" sx={{ mt: 0.5 }}>
            {architecture.replace(/<[^>]*>/g, '').split('\n').filter((line: string) => line.trim()).map((line: string, index: number) => (
              <Box key={index} component="li" sx={{ ml: 1 }}>
                {line.trim()}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};