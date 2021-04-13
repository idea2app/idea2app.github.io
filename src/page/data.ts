export const services = [
    {
        name: '业务信息化咨询',
        summary:
            '帮您梳理业务流程，发掘「提效降本」的痛点，量身定制「信息化转型」方案',
        icon:
            'https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs/icons/layers.svg'
    },
    {
        name: '定制化软件开发',
        summary:
            '一线工程师基于业界领先技术高效交付软件系统，让您的钱花在刀刃上',
        icon:
            'https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs/icons/monitor.svg'
    },
    {
        name: '敏捷团队培训',
        summary:
            '与您的技术团队面对面一起从实践中学习「敏捷开发」方法论，成长为可靠、高效的「现代化工程团队」',
        icon:
            'https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs/icons/cloud.svg'
    }
];

export const projects = [
    {
        name: 'in235 官网',
        URL: 'https://www.in235.com',
        preview:
            'https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs/hero/blue.svg'
    },
    {
        name: 'Shopify 采集平台',
        URL: 'http://shopifycopy.com',
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
        name: '喵喵',
        position: '开发者',
        summary:
            'Web/JavaScript 前端工程师，开源社优秀志愿者，FCC 志愿者，FCC 成都社区核心组织者。',
        GitHub: 'Cute233',
        projects: []
    },
    {
        name: '书香墨剑',
        position: '开发者',
        summary:
            'Web/JavaScript 全栈工程师，FCC 成都社区核心组织者。',
        GitHub: 'demongodYY',
        projects: []
    },
    {
        name: 'Too',
        position: '团队润滑剂/敏捷开发专员',
        summary:
            'Python 工程师，擅长使用精益创业和敏捷开发等技术方法来保证项目产品开发和交付，负责沟通协调团队成员，充分理解用户需求，交付优质产品。',
        GitHub: 'too'
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

export const libraries = [
    {
        type: 'package',
        name: 'WebCell',
        summary: '基于 TypeScript 和 JSX 的 Web 标准组件框架',
        packages: [{ org: 'EasyWebApp' }, { repo: 'typescript' }],
        URL: 'https://web-cell.dev'
    },
    {
        type: 'scaffold',
        name: 'React-MobX-Bootstrap-ts',
        summary:
            '基于 TypeScript、MobX 和 Bootstrap 的 React 项目脚手架，其灵感来自 WebCell 脚手架。',
        packages: [
            { repo: 'react' },
            { org: 'mobxjs' },
            { repo: 'bootstrap' },
            { repo: 'typescript' }
        ]
    },
    {
        type: 'scaffold',
        name: 'Vue-MobX-Bootstrap-ts',
        summary:
            '基于 TypeScript、MobX 和 Bootstrap 的 React 项目脚手架，其灵感来自 WebCell 脚手架。',
        packages: [
            { repo: 'vue' },
            { org: 'mobxjs' },
            { repo: 'bootstrap' },
            { repo: 'typescript' }
        ]
    },
    {
        type: 'scaffold',
        name: 'uniapp-uview-ts',
        summary: '基于 UniApp、UView 和 TypeScript 的小程序项目模板',
        packages: [
            { repo: 'vue' },
            { org: 'dcloudio' },
            { org: 'YanxinNet' },
            { repo: 'typescript' }
        ]
    },
    {
        type: 'scaffold',
        name: 'NodeTS-LeanCloud',
        summary:
            '基于 Koa、TypeScript、Swagger 和 LeanCloud 的 Node.js 后端项目脚手架',
        packages: [
            { repo: 'nodejs' },
            { repo: 'koa' },
            { org: 'leancloud' },
            { repo: 'typescript' }
        ]
    },
    {
        type: 'scaffold',
        name: 'ThinkPHP-scaffold',
        summary: '基于 PHP 7+ 和 ThinkPHP 6 的后端项目脚手架',
        packages: [{ org: 'top-think' }, { repo: 'docker' }, { repo: 'php' }]
    }
];
