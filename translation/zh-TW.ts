import { IDType } from 'mobx-restful';

export default {
  idea2app_summary: '全行業資訊化轉型專家',
  idea2app_slogan: '您的每個創意都值得用心實現',
  IT_transformation_consulting: '📊業務資訊化咨詢',
  IT_transformation_consulting_summary:
    '幫您梳理業務流程，發掘「提效降本」的痛點，量身定制「資訊化轉型」方案',
  custom_software_development: '💻客製化軟體開發',
  custom_software_development_summary:
    '一線工程師基於業界領先技術高效交付軟體系統，讓您的錢花在刀刃上',
  agile_team_training: '👩‍💻敏捷團隊培訓',
  agile_team_training_summary:
    '與您的技術團隊面對面一起從實踐中學習「敏捷開發」方法論，成長為可靠、高效的「現代化工程團隊」',
  latest_projects: '近期專案',
  welcome_to: '歡迎使用',
  get_started_by_editing: '開始你的專案吧，編輯',
  upstream_projects: '上游專案',
  home_page: '主頁',
  careers: '招賢納士',
  open_source_project: '開源專案',
  partner: '合作夥伴',
  member: '菁英團隊',
  component: '元件',
  pagination: '分頁',
  powered_by: '強力驅動自',
  documentation: '文檔',
  learn: '學習',
  examples: '示例',
  deploy: '部署',
  create: '新增',
  submit: '提交',
  cancel: '取消',
  edit: '編輯',
  delete: '刪除',
  total_x_rows: ({ totalCount }: { totalCount: number }) =>
    `共 ${totalCount} 行`,
  sure_to_delete_x: ({ keys }: { keys: IDType[] }) =>
    `您確定刪除 ${keys.join('、')} 嗎？`,
  repository_name: '倉庫名',
  programming_language: '編程語言',
  topic: '話題',
  star_count: '星標數',

  // Open source project
  load_more: '加載更多……',
  no_more: '沒有更多',
} as const;
