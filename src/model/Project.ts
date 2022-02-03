export interface Project {
    type: 'package' | 'scaffold';
    name: string;
    summary: string;
    packages: { org?: string; repo?: string }[];
    URL?: string;
}

export const EventSubmitterPolyfill: Project = {
    type: 'package',
    name: 'Event Submitter polyfill',
    summary: 'W3C DOM 表单提交事件的提交者属性的 polyfill 补丁',
    packages: [{ org: 'w3c' }, { repo: 'html' }],
    URL: 'https://github.com/idea2app/event-submitter-polyfill'
};

export const WebCell: Project = {
    type: 'package',
    name: 'WebCell',
    summary: '基于 TypeScript 和 JSX 的 Web 标准组件框架',
    packages: [{ org: 'EasyWebApp' }, { repo: 'typescript' }],
    URL: 'https://web-cell.dev'
};

export const Edkit: Project = {
    type: 'package',
    name: 'Edkit',
    summary: '基于 TypeScript 的 HTML 富文本编辑工具箱',
    packages: [{ repo: 'html' }, { repo: 'typescript' }]
};

export const IdeaReact: Project = {
    type: 'package',
    name: 'Idea-React',
    summary: '基于 TypeScript 和 Bootstrap 的 React 高级组件库',
    packages: [{ repo: 'react' }, { repo: 'bootstrap' }, { repo: 'typescript' }]
};

export const EChartsModel: Project = {
    type: 'package',
    name: 'ECharts-model',
    summary:
        '基于 TypeScript 的 ECharts 数据模型生成器，让您可以专注于数据结构而不是复杂的选项。',
    packages: [{ repo: 'echarts' }, { repo: 'typescript' }]
};

export const ReactMobxBootstrapTs: Project = {
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
};

export const ReactMobxAntdesignTs: Project = {
    type: 'scaffold',
    name: 'React-MobX-Ant-Design-ts',
    summary:
        '基于 TypeScript、MobX 和 Ant Design 的 React 项目脚手架，其灵感来自 WebCell 脚手架。',
    packages: [
        { repo: 'react' },
        { org: 'mobxjs' },
        { org: 'ant-design' },
        { repo: 'typescript' }
    ]
};

export const NextBootstrapTs: Project = {
    type: 'scaffold',
    name: 'Next-Bootstrap-ts',
    summary: '基于 TypeScript、Next 和 Bootstrap 的 React 项目脚手架',
    packages: [
        { repo: 'react' },
        { repo: 'nextjs' },
        { repo: 'bootstrap' },
        { repo: 'typescript' }
    ]
};

export const VueBootstrapTs: Project = {
    type: 'scaffold',
    name: 'Vue-Bootstrap-ts',
    summary:
        '基于 TypeScript 和 Bootstrap 的 React 项目脚手架，其灵感来自 WebCell 脚手架。',
    packages: [{ repo: 'vue' }, { repo: 'bootstrap' }, { repo: 'typescript' }]
};

export const TaroVantMobXTs: Project = {
    type: 'scaffold',
    name: 'Taro-Vant-MobX-ts',
    summary: '基于 TypeScript、MobX 和 Vant 的 Taro 项目脚手架',
    packages: [
        { repo: 'react' },
        { org: 'NervJS' },
        { org: 'youzan' },
        { org: 'mobxjs' },
        { repo: 'typescript' }
    ]
};

export const UniappUviewTs: Project = {
    type: 'scaffold',
    name: 'uniapp-uview-ts',
    summary: '基于 UniApp、UView 和 TypeScript 的小程序项目模板',
    packages: [
        { repo: 'vue' },
        { org: 'dcloudio' },
        { org: 'YanxinNet' },
        { repo: 'typescript' }
    ]
};

export const MobxRestful: Project = {
    type: 'package',
    name: 'MobX-RESTful',
    summary: '用于 RESTful API 的通用 MobX 4/5 抽象基类和装饰器工具库',
    packages: [{ org: 'mobxjs' }, { org: 'swagger-api' }]
};

export const StrapiCkeditorPlugin: Project = {
    type: 'package',
    name: 'strapi-plugin-ckeditor',
    summary: '用 CKEditor 5 替换 Strapi 默认的 WYSIWYG 编辑器',
    packages: [{ repo: 'react' }, { org: 'ckeditor' }, { org: 'strapi' }],
    URL: 'https://github.com/idea2app/strapi-plugin-ckeditor/'
};

export const Koagger: Project = {
    type: 'package',
    name: 'Koagger',
    summary:
        '为 routing-controllers 框架提供 Swagger API 文档和 Mock API 的 Koa 中间件',
    packages: [
        { repo: 'nodejs' },
        { repo: 'koa' },
        { org: 'swagger-api' },
        { repo: 'typescript' }
    ]
};

export const NodetsLeancloud: Project = {
    type: 'scaffold',
    name: 'NodeTS-LeanCloud',
    summary:
        '基于 Koa、TypeScript、Swagger 和 LeanCloud 的 Node.js 后端项目脚手架',
    packages: [
        { repo: 'nodejs' },
        { repo: 'koa' },
        { org: 'leancloud' },
        { repo: 'typescript' }
    ],
    URL: 'https://github.com/idea2app/NodeTS-LeanCloud/'
};

export const KotlinSpringBoot: Project = {
    type: 'scaffold',
    name: 'Kotlin-Spring-Boot',
    summary: '基于 Kotlin 和 Spring Boot 的后端项目脚手架',
    packages: [
        { org: 'spring-projects' },
        { repo: 'docker' },
        { repo: 'kotlin' },
        { repo: 'java' }
    ],
    URL: 'https://github.com/idea2app/Kotlin-Spring-Boot/'
};

export const ThinkphpScaffold: Project = {
    type: 'scaffold',
    name: 'ThinkPHP-scaffold',
    summary: '基于 PHP 7+ 和 ThinkPHP 6 的后端项目脚手架',
    packages: [{ org: 'top-think' }, { repo: 'docker' }, { repo: 'php' }],
    URL: 'https://github.com/idea2app/ThinkPHP-scaffold/'
};

export default [
    EventSubmitterPolyfill,
    WebCell,
    Edkit,
    IdeaReact,
    EChartsModel,
    ReactMobxBootstrapTs,
    ReactMobxAntdesignTs,
    NextBootstrapTs,
    VueBootstrapTs,
    TaroVantMobXTs,
    UniappUviewTs,
    MobxRestful,
    StrapiCkeditorPlugin,
    Koagger,
    NodetsLeancloud,
    KotlinSpringBoot,
    ThinkphpScaffold
];
