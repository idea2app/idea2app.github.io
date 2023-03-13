import { IDType } from 'mobx-restful';

export default {
  idea2app_summary: 'Industry-wide IT transformation expert',
  idea2app_slogan: 'Every idea of yours is worth our efforts to realize',
  IT_transformation_consulting: '📊IT transformation consulting',
  IT_transformation_consulting_summary:
    'Help you sort out business processes, discover the pain points of Improving Efficiency & Reducing Costs", and tailor IT Transformation solutions',
  custom_software_development: '💻Custom software development',
  custom_software_development_summary:
    'Front-line engineers efficiently deliver Software systems based on Industry-leading technologies, allowing you to spend your money wisely',
  agile_team_training: '👩‍💻Agile team training',
  agile_team_training_summary:
    'Face-to-face with your technical team to learn Agile Development methodology from practice, and grow into a reliable and efficient Modern Engineering Team',
  consult_immediately: 'Consult immediately',
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
  total_x_rows: ({ totalCount }: { totalCount: number }) =>
    `Total ${totalCount} rows`,
  sure_to_delete_x: ({ keys }: { keys: IDType[] }) =>
    `Are you sure to delete ${keys.join(', ')}?`,
  repository_name: 'Repository Name',
  programming_language: 'Programming Language',
  topic: 'Topic',
  star_count: 'Star Count',

  // Open source project
  load_more: 'Load more...',
  no_more: 'No more',
} as const;
