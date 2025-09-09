import { Button, TextField, Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { observer } from 'mobx-react';
import { NextPage } from 'next';
import { useContext } from 'react';

import { PageHead } from '../../components/PageHead';
import { I18nContext } from '../../models/Translation';

const RequirementEntryPage: NextPage = observer(() => {
  const { t } = useContext(I18nContext);

  const handleSubmit = (isCommercial: boolean) => () => {
    const titleInput = document.querySelector('input[name="title"]') as HTMLInputElement;
    const title = titleInput?.value;
    
    if (!title) {
      alert('Please enter a project name');
      return;
    }
    
    if (isCommercial) {
      location.href = `/dashboard/project/new?title=${encodeURIComponent(title)}`;
    } else {
      location.href += `/${title}`;
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 pt-16 pb-6">
      <PageHead title={t('AI_requirement_evaluation')} />

      <h1 className="py-10 text-center text-6xl">{t('AI_requirement_evaluation')}</h1>

      {/* Unified Input Form */}
      <div className="flex flex-col gap-4 mb-8">
        <TextField 
          label={t('project_name')} 
          name="title" 
          required 
          defaultValue="动物保护平台"
          fullWidth
        />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Button 
              variant="contained" 
              size="large" 
              fullWidth
              onClick={handleSubmit(false)}
            >
              {t('AI_requirement_evaluation')}
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Button 
              variant="outlined" 
              size="large" 
              fullWidth
              onClick={handleSubmit(true)}
            >
              {t('commercial_version')}
            </Button>
          </Grid>
        </Grid>
      </div>

      {/* Version Comparison Cards */}
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
    </div>
  );
});

export default RequirementEntryPage;
