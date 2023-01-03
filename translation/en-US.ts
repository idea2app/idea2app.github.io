import { IDType } from 'mobx-restful';

export default {
  idea2app_summary: 'Industry-wide IT transformation expert',
  idea2app_slogan: 'Every idea of yours is worth our efforts to realize',
  IT_transformation_consulting: 'IT transformation consulting',
  latest_projects: 'Latest projects',
  welcome_to: 'Welcome to',
  get_started_by_editing: 'Get started by editing',
  upstream_projects: 'Upstream projects',
  home_page: 'Home Page',
  open_source_project: 'Open-source project',
  component: 'Component',
  pagination: 'Pagination',
  powered_by: 'Powered by',
  documentation: 'Documentation',
  documentation_summary:
    'Find in-depth information about Next.js features and API.',
  learn: 'Learn',
  learn_summary: 'Learn about Next.js in an interactive course with quizzes!',
  examples: 'Examples',
  examples_summary: 'Discover and deploy boilerplate example Next.js projects.',
  deploy: 'Deploy',
  deploy_summary:
    'Instantly deploy your Next.js site to a public URL with Vercel.',
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

  // Scroll List
  scroll_list: 'Scroll List',
  load_more: 'Load more...',
  no_more: 'No more',
} as const;
