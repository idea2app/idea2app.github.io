export interface Organization {
    name: string;
    summary?: string;
    logo: string;
    URL?: string;
}

export const FCC_CDC: Organization = {
    name: 'FCC 成都社区',
    summary: '西南地区顶级工程师社群',
    logo: 'https://fcc-cd.dev/images/FCC-CDC-v1-0.png',
    URL: 'https://fcc-cd.dev'
};

export const in235: Organization = {
    name: '二拾三度五',
    summary: '一个有温度的品牌运营制造商',
    logo: 'https://www.in235.com/logo-black.efbc4bb1.png',
    URL: 'https://www.in235.com'
};

export const Creator1024: Organization = {
    name: '创造 1024',
    summary: 'MVP（最有价值专家）工程师天团',
    logo: 'https://github.com/Creator-1024.png'
};

export const KupoTech: Organization = {
    name: '库珀科技',
    logo: 'https://www.kupogroup.com/1.5.4/static/kulogo_hover.dc5e54e3.svg',
    URL: 'https://www.kupogroup.com/'
};

export const inBracket: Organization = {
    name: '广州创启医疗科技',
    logo: 'http://nwzimg.wezhan.cn/contents/sitefiles2046/10233880/images/21285982.png',
    URL: 'http://www.intlmedic.com/'
};

export const PuZaoSi: Organization = {
    name: '谱造司',
    logo: 'https://static.wixstatic.com/media/6405a7_e2d99966bdf54127b7563771bca874f1~mv2.png/v1/fill/w_120,h_119,al_c,q_85,usm_0.66_1.00_0.01/%E5%A4%B4%E5%83%8F6.webp',
    URL: 'https://www.puzaosi.com/'
};

export default [FCC_CDC, in235, Creator1024, KupoTech, inBracket, PuZaoSi];
