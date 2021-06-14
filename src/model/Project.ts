export interface Project {
    type: 'package' | 'scaffold';
    name: string;
    summary: string;
    packages: { org?: string; repo?: string }[];
    URL?: string;
}

export const WebCell: Project = {
    type: 'package',
    name: 'WebCell',
    summary: '基于 TypeScript 和 JSX 的 Web 标准组件框架',
    packages: [{ org: 'EasyWebApp' }, { repo: 'typescript' }],
    URL: 'https://web-cell.dev'
};

export const EChartsModel: Project = {
    type: 'package',
    name: 'ECharts-model',
    summary:
        '基于 TypeScript 的 ECharts 数据模型生成器，让您可以专注于数据结构而不是复杂的选项。',
    packages: [{ repo: 'echarts' }, { repo: 'typescript' }]
};

export const ReactBootstrapEditor: Project = {
    type: 'package',
    name: 'React-Bootstrap-editor',
    summary: '基于 TypeScript、React 和 Bootstrap 的富文本编辑器',
    packages: [{ repo: 'react' }, { repo: 'bootstrap' }, { repo: 'typescript' }]
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

export const VueMobxBootstrapTs: Project = {
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

export const MobxStrapi: Project = {
    type: 'package',
    name: 'MobX-Strapi',
    summary: 'Strapi v3 的 MobX SDK',
    packages: [{ org: 'mobxjs' }, { org: 'strapi' }]
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

export const ThinkphpScaffold: Project = {
    type: 'scaffold',
    name: 'ThinkPHP-scaffold',
    summary: '基于 PHP 7+ 和 ThinkPHP 6 的后端项目脚手架',
    packages: [{ org: 'top-think' }, { repo: 'docker' }, { repo: 'php' }],
    URL: 'https://github.com/idea2app/ThinkPHP-scaffold/'
};

export default [
    WebCell,
    EChartsModel,
    ReactBootstrapEditor,
    ReactMobxBootstrapTs,
    ReactMobxAntdesignTs,
    VueMobxBootstrapTs,
    UniappUviewTs,
    MobxStrapi,
    StrapiCkeditorPlugin,
    Koagger,
    NodetsLeancloud,
    ThinkphpScaffold
];
