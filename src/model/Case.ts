import {
    case_in235,
    case_OAFevent,
    case_ShopifyCopy,
    case_IndustryData,
    case_InstitutionAnalysis,
    case_OralCavity,
    case_MyPoker,
    case_FloatIsland,
    case_2049,
    case_NgoLawWiki,
    case_JianYangWomenUnion,
    case_EthPlanet
} from '../image';
import {
    User,
    TechQuery,
    lingziyb,
    Cute233,
    demongodYY,
    tree7ion,
    stevending1st,
    manyuanrong
} from './User';
import {
    Organization,
    in235,
    KupoTech,
    inBracket,
    PuZaoSi,
    AiuxDesign,
    ForNgo,
    JianYangWomenUnion,
    EthPlanet
} from './Organization';
import {
    Project,
    WebCell,
    Edkit,
    EChartsModel,
    ReactMobxBootstrapTs,
    NextBootstrapTs,
    VueBootstrapTs,
    MobxRestful,
    StrapiCkeditorPlugin,
    Koagger,
    NodetsLeancloud
} from './Project';

export interface Case {
    type: 'desktop' | 'mobile';
    name: string;
    URL?: string;
    preview: string;
    team: User[];
    partners?: Organization[];
    projects?: Project[];
}

export const in235_PWA: Case = {
    type: 'desktop',
    name: 'in235 官网',
    URL: 'https://www.in235.com',
    preview: case_in235,
    partners: [in235],
    team: [TechQuery],
    projects: [WebCell, MobxRestful, StrapiCkeditorPlugin]
};

export const OAFevent: Case = {
    type: 'desktop',
    name: '开放原子基金会 2020 峰会',
    URL: 'https://ideapp.dev/OAF-event/',
    preview: case_OAFevent,
    team: [TechQuery],
    projects: [WebCell]
};

export const ShopifyCopy: Case = {
    type: 'desktop',
    name: 'Shopify 采集平台',
    URL: 'http://shopifycopy.com',
    preview: case_ShopifyCopy,
    team: [TechQuery],
    projects: [WebCell]
};

export const IndustryData: Case = {
    type: 'desktop',
    name: '行业数据系统',
    preview: case_IndustryData,
    team: [TechQuery, lingziyb, Cute233],
    projects: [VueBootstrapTs, EChartsModel, Koagger, NodetsLeancloud]
};

export const InstitutionAnalysis: Case = {
    type: 'desktop',
    name: '制度分析系统',
    preview: case_InstitutionAnalysis,
    partners: [KupoTech],
    team: [TechQuery, lingziyb],
    projects: [EChartsModel]
};

export const OralCavity: Case = {
    type: 'desktop',
    name: '隐贝口腔医疗系统',
    preview: case_OralCavity,
    partners: [inBracket],
    team: [TechQuery, lingziyb],
    projects: [VueBootstrapTs]
};

export const MyPoker: Case = {
    type: 'mobile',
    name: '德扑 App',
    URL: 'https://mypoker.pro',
    preview: case_MyPoker,
    team: [TechQuery]
};

export const FloatIsland: Case = {
    type: 'mobile',
    name: '浮游岛装置小程序',
    preview: case_FloatIsland,
    partners: [PuZaoSi],
    team: [TechQuery, lingziyb],
    projects: [Koagger, NodetsLeancloud]
};

export const CreativeAssistant2049: Case = {
    type: 'mobile',
    name: '2049 创意助手',
    URL: 'https://client.aiuxstudio.com/',
    preview: case_2049,
    partners: [AiuxDesign],
    team: [demongodYY, TechQuery, lingziyb],
    projects: [Edkit, EChartsModel, ReactMobxBootstrapTs, Koagger]
};

export const NgoLawWiki: Case = {
    type: 'desktop',
    name: '公益法律百科网站',
    URL: 'https://www.yilight.com.cn/',
    preview: case_NgoLawWiki,
    partners: [ForNgo],
    team: [TechQuery, tree7ion, stevending1st, manyuanrong, lingziyb],
    projects: [NextBootstrapTs]
};

export const JYWomenUnion: Case = {
    type: 'mobile',
    name: '简阳妇联小程序',
    preview: case_JianYangWomenUnion,
    partners: [JianYangWomenUnion],
    team: [TechQuery, lingziyb],
    projects: [
        Edkit,
        EChartsModel,
        ReactMobxBootstrapTs,
        Koagger,
        NodetsLeancloud
    ]
};

export const EthPlanetSite: Case = {
    type: 'desktop',
    name: '以太坊行星官网',
    URL: 'http://esc.ethplanet.org/',
    preview: case_EthPlanet,
    partners: [EthPlanet],
    team: [TechQuery],
    projects: [WebCell, StrapiCkeditorPlugin]
};

export default [
    in235_PWA,
    OAFevent,
    ShopifyCopy,
    IndustryData,
    InstitutionAnalysis,
    OralCavity,
    MyPoker,
    FloatIsland,
    CreativeAssistant2049,
    NgoLawWiki,
    JYWomenUnion,
    EthPlanetSite
];
