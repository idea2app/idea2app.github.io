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
    projects?: Project[];
}

export const in235: Case = {
    type: 'desktop',
    name: 'in235 官网',
    URL: 'https://www.in235.com',
    preview: case_in235,
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
    team: [TechQuery, lingziyb],
    projects: [EChartsModel]
};

export const OralCavity: Case = {
    type: 'desktop',
    name: '隐贝口腔医疗系统',
    preview: case_OralCavity,
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
    team: [TechQuery, lingziyb],
    projects: [Koagger, NodetsLeancloud]
};

export default [
    in235,
    OAFevent,
    ShopifyCopy,
    IndustryData,
    InstitutionAnalysis,
    OralCavity,
    MyPoker,
    FloatIsland
];
