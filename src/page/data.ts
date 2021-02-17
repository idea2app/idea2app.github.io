export const projects = [
    {
        name: 'in235 官网',
        URL: 'https://www.in235.com',
        preview:
            'https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs/hero/blue.svg'
    },
    {
        name: 'Shopify 采集平台',
        URL: 'http://shopify.com',
        preview:
            'https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs/hero/red.svg'
    },
    {
        name: '健康码小程序',
        preview:
            'https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs/hero/purple.svg'
    },
    {
        name: '隐贝口腔医疗系统',
        preview:
            'https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs/hero/yellow.svg'
    }
];

export const members = [
    {
        name: '水歌',
        position: '创始人',
        summary:
            'Web/JavaScript 全栈工程师、WebCell 开源前端框架作者，微软 MVP、阿里云 MVP、FCC 全球百强志愿者，FCC 成都社区负责人、开源社理事。',
        GitHub: 'TechQuery',
        projects
    },
    {
        name: '灵儿',
        position: '联合创始人',
        summary:
            'Web/JavaScript 全栈工程师，汉梦文化汉服社区创始人，FCC 成都社区核心组织者。',
        GitHub: 'lingziyb',
        projects: projects.slice(2)
    },
    {
        name: 'Too',
        position: '产品管理员',
        summary:
            'Python 工程师，擅长使用精益创业和敏捷开发等技术方法来保证项目产品开发和交付，负责沟通协调团队成员，充分理解用户需求，交付优质产品。',
        GitHub: 'too',
        projects
    }
];

export const partners = [
    {
        name: '创造 1024',
        summary: 'MVP（最有价值专家）工程师天团',
        logo: 'https://github.com/Creator-1024.png'
    },
    {
        name: '二拾三度五',
        summary: '一个有温度的品牌运营制造商',
        logo: 'https://www.in235.com/23.5-logo.d912547a.png',
        URL: 'https://www.in235.com'
    },
    {
        name: 'FCC 成都社区',
        summary: '西南地区顶级工程师社群',
        logo: 'https://fcc-cd.dev/images/FCC-CDC-v1-0.png',
        URL: 'https://fcc-cd.dev'
    }
];
