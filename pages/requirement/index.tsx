import { Button, TextField } from '@mui/material';
import { observer } from 'mobx-react';
import { NextPage } from 'next';
import { compose, translator } from 'next-ssr-middleware';
import { formToJSON } from 'web-utility';

import { PageHead } from '../../components/PageHead';
import { i18n, t } from '../../models/Translation';

export const getServerSideProps = compose(translator(i18n));

const RequirementEntryPage: NextPage = observer(() => (
  <form
    className="container mx-auto flex max-w-max flex-col gap-4 px-4 pt-16 pb-6"
    onSubmit={event => {
      event.preventDefault();

      const { title } = formToJSON<{ title: string }>(event.currentTarget);

      location.href += `/${title}`;
    }}
  >
    <PageHead title={t('AI_requirement_evaluation')} />

    <h1 className="py-10 text-center text-6xl">{t('AI_requirement_evaluation')}</h1>

    <TextField label={t('project_name')} name="title" required defaultValue="动物保护平台" />

    <Button variant="contained" size="large" type="submit">
      {t('AI_requirement_evaluation')}
    </Button>
  </form>
));

export default RequirementEntryPage;
