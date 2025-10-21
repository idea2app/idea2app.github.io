import { Button, Grid, TextField } from '@mui/material';
import { observer } from 'mobx-react';
import { NextPage } from 'next';
import { FormEvent, useContext } from 'react';
import { buildURLData, formToJSON } from 'web-utility';

import { PageHead } from '../../components/PageHead';
import { VersionComparison } from '../../components/VersionComparison';
import { I18nContext } from '../../models/Translation';

const RequirementEntryPage: NextPage = observer(() => {
  const { t } = useContext(I18nContext);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { value } = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement,
      { name } = formToJSON<{ name: string }>(event.currentTarget);

    location.href =
      value === 'commercial' ? `/dashboard?${buildURLData({ name })}` : `/requirement/${name}`;
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 pt-16 pb-6">
      <PageHead title={t('AI_requirement_evaluation')} />

      <h1 className="py-10 text-center text-6xl">{t('AI_requirement_evaluation')}</h1>

      <form className="mb-8 flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextField
          label={t('project_name')}
          name="name"
          required
          defaultValue="动物保护平台"
          fullWidth
        />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Button type="submit" variant="contained" size="large" fullWidth value="public">
              {t('AI_requirement_evaluation')}
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Button type="submit" variant="outlined" size="large" fullWidth value="commercial">
              {t('commercial_version')}
            </Button>
          </Grid>
        </Grid>
      </form>

      <VersionComparison />
    </div>
  );
});

export default RequirementEntryPage;
