import { Button, Grid,TextField } from '@mui/material';
import { observer } from 'mobx-react';
import { NextPage } from 'next';
import { useContext } from 'react';
import { formToJSON } from 'web-utility';

import { PageHead } from '../../components/PageHead';
import { VersionComparison } from '../../components/VersionComparison';
import { ProjectModel } from '../../models/ProjectEvaluation';
import { I18nContext } from '../../models/Translation';

const projectStore = new ProjectModel();

const RequirementEntryPage: NextPage = observer(() => {
  const { t } = useContext(I18nContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
    const isCommercial = submitter.value === 'commercial';
    
    const { title } = formToJSON<{ title: string }>(event.currentTarget);

    if (isCommercial) {
      const { id } = await projectStore.updateOne({ name: title });
      location.href = `/dashboard/project/${id}`;
    } else {
      location.href += `/${title}`;
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 pt-16 pb-6">
      <PageHead title={t('AI_requirement_evaluation')} />

      <h1 className="py-10 text-center text-6xl">{t('AI_requirement_evaluation')}</h1>

      {/* Unified Input Form */}
      <form className="flex flex-col gap-4 mb-8" onSubmit={handleSubmit}>
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
              type="submit"
              variant="contained" 
              size="large" 
              fullWidth
              value="public"
            >
              {t('AI_requirement_evaluation')}
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Button 
              type="submit"
              variant="outlined" 
              size="large" 
              fullWidth
              value="commercial"
            >
              {t('commercial_version')}
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Version Comparison Cards */}
      <VersionComparison />
    </div>
  );
});

export default RequirementEntryPage;
