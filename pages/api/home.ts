import { t } from '../../models/Translation';

export const service = () => [
  {
    icon: 'trending_up',
    title: t('IT_transformation_consulting'),
    summary: t('IT_transformation_consulting_summary'),
    buttonText: t('read_resolution'),
    buttonLink: 'https://idea2app.feishu.cn/wiki/RsCvwrpXPimCpRkjpsAcWl2rnJd',
  },
  {
    icon: 'code',
    title: t('custom_software_development'),
    summary: t('custom_software_development_summary'),
    buttonText: t('consult_immediately'),
    buttonLink: '/requirement',
  },
  {
    icon: 'diversity_3',
    title: t('agile_team_training'),
    summary: t('agile_team_training_summary'),
    buttonText: t('read_tutorial'),
    buttonLink: 'https://idea2app.feishu.cn/wiki/B956wLo7wilMClkaFsScDL7DnwM',
  },
];

export const PARTNERS_INFO = () => [
  {
    logo: '/aiux.png',
    logoDark: '/aiux-dark.png',
    name: t('partner_aiux'),
    address: 'https://www.aiuxdesign.com/',
    summary: t('partner_aiux_slogan'),
  },

  {
    logo: '/23-5.png',
    logoDark: '/23-5-dark.png',
    name: t('partner_23_5'),
    address: 'https://www.in235.com/',
    summary: t('partner_23_5_slogan'),
  },
  {
    logo: '/fcc-cdg.png',
    name: t('partner_fcc_cdg'),
    address: 'https://fcc-cd.dev/',
    summary: t('partner_fcc_cdg_slogan'),
  },

  {
    logo: '/ic-naming.svg',
    name: t('partner_ic_naming'),
    address: 'https://icnaming.com/',
    summary: t('partner_ic_naming_slogan'),
  },

  {
    logo: '/creator-1024.png',
    logoDark: '/creator-1024-dark.png',
    name: t('partner_creator_1024'),
    address: 'https://github.com/Creator-1024',
    summary: t('partner_creator_1024_slogan'),
  },
  {
    logo: '/kys.png',
    name: t('partner_kys'),
    address: 'https://kaiyuanshe.cn/',
    summary: t('partner_kys_slogan'),
  },
  {
    logo: '/eth-planet.png',
    name: t('partner_eth_planet'),
    address: 'https://x.com/ethplanet/',
    summary: t('partner_eth_planet_slogan'),
  },
];
