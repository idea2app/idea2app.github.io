import { Box,Card, CardContent, Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { FC, useContext } from 'react';

import { I18nContext } from '../models/Translation';

export const VersionComparison: FC = observer(() => {
  const { t } = useContext(I18nContext);

  return (
    <Grid container spacing={4} sx={{ mt: 4 }}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              {t('public_version')}
            </Typography>
            <Box component="ol" sx={{ pl: 2 }}>
              <Typography component="li" paragraph>
                {t('github_one_click_login')}
              </Typography>
              <Typography component="li" paragraph>
                {t('free_evaluation_daily_limit')}
              </Typography>
              <Typography component="li" paragraph>
                {t('submitted_data_public')}
              </Typography>
              <Typography component="li" paragraph>
                {t('volunteer_community_support')}
              </Typography>
              <Typography component="li" paragraph>
                {t('open_source_bounty_development')}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid size={{ xs: 12, md: 6 }}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              {t('commercial_version')}
            </Typography>
            <Box component="ol" sx={{ pl: 2 }}>
              <Typography component="li" paragraph>
                {t('phone_one_click_register')}
              </Typography>
              <Typography component="li" paragraph>
                {t('unlimited_evaluation_24_7')}
              </Typography>
              <Typography component="li" paragraph>
                {t('project_data_confidential')}
              </Typography>
              <Typography component="li" paragraph>
                {t('daily_engineer_review')}
              </Typography>
              <Typography component="li" paragraph>
                {t('professional_development_team')}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
});