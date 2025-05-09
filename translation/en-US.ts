import { IDType } from 'mobx-restful';

export default {
  idea2app_summary: 'Industry-wide IT transformation expert',
  idea2app_slogan: 'Every idea of yours is worth our efforts to realize',
  idea2app_slogan_2: 'Want to create an impact with us',
  contact_us: 'Contact us',
  IT_transformation_consulting: 'IT transformation consulting',
  IT_transformation_consulting_summary:
    'Help you sort out business processes, discover the pain points of Improving Efficiency & Reducing Costs", and tailor IT Transformation solutions',
  read_resolution: 'Read resolution',
  custom_software_development: 'Custom software development',
  custom_software_development_summary:
    'Front-line engineers efficiently deliver Software systems based on Industry-leading technologies, allowing you to spend your money wisely',
  consult_immediately: 'Consult immediately',
  agile_team_training: 'Agile team training',
  agile_team_training_summary:
    'Face-to-face with your technical team to learn Agile Development methodology from practice, and grow into a reliable and efficient Modern Engineering Team',
  read_tutorial: 'Read tutorial',
  latest_projects: 'Latest projects',
  welcome_to: 'Welcome to',
  get_started_by_editing: 'Get started by editing',
  upstream_projects: 'Upstream projects',
  home_page: 'Home Page',
  careers: 'Careers',
  open_source_project: 'Open-source project',
  partner: 'Partner',
  member: 'Member',
  component: 'Component',
  pagination: 'Pagination',
  powered_by: 'Powered by',
  documentation: 'Documentation',
  learn: 'Learn',
  examples: 'Examples',
  deploy: 'Deploy',
  create: 'Create',
  submit: 'Submit',
  cancel: 'Cancel',
  edit: 'Edit',
  delete: 'Delete',
  total_x_rows: ({ totalCount }: { totalCount: number }) => `Total ${totalCount} rows`,
  sure_to_delete_x: ({ keys }: { keys: IDType[] }) => `Are you sure to delete ${keys.join(', ')}?`,
  repository_name: 'Repository Name',
  programming_language: 'Programming Language',
  topic: 'Topic',
  star_count: 'Star Count',

  // Member page
  projects_as_leader: 'Projects as leader',
  projects_as_member: 'Projects as member',
  partner_aiux: 'AIUX',
  partner_aiux_slogan: 'Bringing better innovative design to enterprise digital growth',
  partner_eth_planet: 'Ethereum Planet',
  partner_eth_planet_slogan: 'Building a decentralized digital identity',
  partner_ic_naming: 'IC Naming',
  partner_ic_naming_slogan: 'Decentralized digital identities',
  partner_fcc_cdg: 'fCC Chengdu Community',
  partner_fcc_cdg_slogan: 'Top engineers community in Southwest China',
  partner_23_5: '23.5',
  partner_23_5_slogan: 'A brand operation manufacturer with temperature',
  partner_creator_1024: 'Creator 1024',
  partner_creator_1024_slogan: 'Microsoft Most Valuable Expert Engineer Team',
  partner_kys: 'KAIYUANSHE',
  partner_kys_slogan:
    'Based in China, contributing to the world, promoting open source as a new way of life',

  // Open source project
  load_more: 'Load more...',
  no_more: 'No more',

  // Requirement Evaluation
  AI_requirement_evaluation: '🤖 Requirement Evaluation',
  information_security_alert:
    'This service is free of charge, but only accepts <strong>publicly available information</strong> related to estimation.',
  project_name: 'Project Name',
} as const;
