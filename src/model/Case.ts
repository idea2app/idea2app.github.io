import {
    case_in235,
    case_OAFevent,
    case_ShopifyCopy,
    case_IndustryData,
    case_InstitutionAnalysis,
    case_OralCavity,
    case_MyPoker,
    case_FloatIsland
} from '../image';
import { User, TechQuery, lingziyb, Cute233 } from './User';
import {
    Organization,
    in235,
    KupoTech,
    inBracket,
    PuZaoSi
} from './Organization';
import {
    Project,
    WebCell,
    EChartsModel,
    VueMobxBootstrapTs,
    MobxStrapi,
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
    projects: [WebCell, MobxStrapi, StrapiCkeditorPlugin]
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
    projects: [VueMobxBootstrapTs, EChartsModel, Koagger, NodetsLeancloud]
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
    projects: [VueMobxBootstrapTs]
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

export default [
    in235_PWA,
    OAFevent,
    ShopifyCopy,
    IndustryData,
    InstitutionAnalysis,
    OralCavity,
    MyPoker,
    FloatIsland
];
