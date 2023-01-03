import { i18n } from '../../models/Translation';

const { t } = i18n;

export const service = () => [
  {
    title: t('IT_transformation_consulting'),
    summary: t('IT_transformation_consulting_summary'),
  },
  {
    title: t('custom_software_development'),
    summary: t('custom_software_development_summary'),
  },
  {
    title: t('agile_team_training'),
    summary: t('agile_team_training_summary'),
  },
];
