import { IDType } from 'mobx-restful';

export default {
  idea2app_summary: '全行业信息化转型专家',
  idea2app_slogan: '您的每个创意都值得用心实现',
  idea2app_slogan_2: '想要与我们一起创造影响力',
  contact_us: '联系我们',
  IT_transformation_consulting: '业务信息化咨询',
  IT_transformation_consulting_summary:
    '帮您梳理业务流程，发掘「提效降本」的痛点，量身定制「信息化转型」方案',
  custom_software_development: '定制化软件开发',
  custom_software_development_summary:
    '一线工程师基于业界领先技术高效交付软件系统，让您的钱花在刀刃上',
  agile_team_training: '敏捷团队培训',
  agile_team_training_summary:
    '与您的技术团队面对面一起从实践中学习「敏捷开发」方法论，成长为可靠、高效的「现代化工程团队」',
  consult_immediately: '立即咨询',
  latest_projects: '近期项目',
  welcome_to: '欢迎使用',
  get_started_by_editing: '开始你的项目吧，编辑',
  upstream_projects: '上游项目',
  home_page: '主页',
  careers: '招贤纳士',
  open_source_project: '开源项目',
  partner: '合作伙伴',
  member: '菁英团队',
  component: '组件',
  pagination: '分页',
  powered_by: '强力驱动自',
  documentation: '文档',
  learn: '学习',
  examples: '示例',
  deploy: '部署',
  create: '新增',
  submit: '提交',
  cancel: '取消',
  edit: '编辑',
  delete: '删除',
  total_x_rows: ({ totalCount }: { totalCount: number }) => `共 ${totalCount} 行`,
  sure_to_delete_x: ({ keys }: { keys: IDType[] }) => `您确定删除 ${keys.join('、')} 吗？`,
  repository_name: '仓库名',
  programming_language: '编程语言',
  topic: '话题',
  star_count: '星标数',

  // Member page
  projects_as_leader: '负责的项目',
  projects_as_member: '参与的项目',
  partner_aiux: '艾体验科技',
  partner_auxi_slogan: '为企业数字化增长带来更好创新设计',
  partner_eth_planet: '以太坊星球',
  partner_eth_planet_slogan: '共建、互助、互联，赋能以太坊开发者社群',
  partner_ic_naming: '区块链域名系统平台',
  partner_ic_naming_slogan: '构建去中心化数字身份',
  partner_fcc_cdg: 'fCC 成都社区',
  partner_fcc_cdg_slogan: '西南地区顶级工程师社群',
  partner_23_5: '二拾三度五',
  partner_23_5_slogan: '一个有温度的品牌运营制造商',
  partner_creator_1024: '创造 1024',
  partner_creator_1024_slogan: '微软最有价值专家工程师天团',
  partner_kys: '开源社',
  partner_kys_slogan: '立足中国、贡献全球，推动开源成为新时代的生活方式',

  // Open source project
  load_more: '加载更多……',
  no_more: '没有更多'
} as const;
