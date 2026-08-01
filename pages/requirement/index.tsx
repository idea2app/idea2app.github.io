import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
        <label className="text-sm">
          <span className="mb-1 block">{t('project_name')}</span>
          <Input name="name" required defaultValue="动物保护平台" />
        </label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <Button type="submit" size="lg" className="w-full" value="public">
            {t('AI_requirement_evaluation')}
          </Button>
          <Button type="submit" size="lg" variant="outline" className="w-full" value="commercial">
            {t('commercial_version')}
          </Button>
        </div>
      </form>

      <VersionComparison />
    </div>
  );
});

export default RequirementEntryPage;
