import { observer } from 'mobx-react';
import { FC, useContext } from 'react';

import { I18nContext } from '../models/Translation';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export const VersionComparison: FC = observer(() => {
  const { t } = useContext(I18nContext);

  return (
    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>{t('public_version')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal space-y-1 pl-5">
              <li>{t('github_one_click_login')}</li>
              <li>{t('submitted_data_public')}</li>
              <li>{t('free_evaluation_daily_limit')}</li>
              <li>{t('volunteer_community_support')}</li>
              <li>{t('open_source_bounty_development')}</li>
            </ol>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>{t('commercial_version')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal space-y-1 pl-5">
              <li>{t('email_one_click_register')}</li>
              <li>{t('project_data_confidential')}</li>
              <li>{t('unlimited_evaluation_24_7')}</li>
              <li>{t('ai_interactive_prototype')}</li>
              <li>{t('daily_engineer_review')}</li>
              <li>{t('professional_development_team')}</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
});
