import { WebCellProps, component, mixin, watch, createCell } from 'web-cell';
import { scrollTo } from 'web-utility';
import { Button, Image, MediaObject } from 'boot-cell';

import { Section } from '../component/Section';
import { OrganizationCard } from '../component/OrganizationCard';
import style from './Home.module.less';
import { services } from './data';
import members from '../model/User';
import partners from '../model/Organization';
import cases, { Case } from '../model/Case';

interface HomePageProps extends WebCellProps {
    section?: string;
}

@component({
    tagName: 'home-page',
    renderTarget: 'children'
})
export class HomePage extends mixin<HomePageProps>() {
    @watch
    set section(section: string) {
        this.setProps({ section }).then(() => scrollTo(`#${section}`));
    }

    renderCase = ({ name, preview }: Case) => (
        <li
            key={name}
            className={`col-12 col-sm-6 col-md-3 position-relative ${style.case}`}
        >
            <Image className={style.preview} background src={preview} />
            <h3 className="h5 my-3">
                <a
                    className="text-decoration-none text-dark stretched-link"
                    href={`case?name=${name}`}
                >
                    {name}
                </a>
            </h3>
        </li>
    );

    render() {
        return (
            <main className="container-fluid">
                <Section className="row">
                    <div classList="d-none d-md-flex col-md-6 row">
                        <Image
                            className="col-8"
                            fluid
                            src="https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs/photos/map-1.jpg"
                        />
                        <div className="col-4 d-flex flex-column justify-content-between">
                            <Image
                                fluid
                                src="https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs/photos/map-2.jpg"
                            />
                            <Image
                                fluid
                                src="https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs/photos/map-3.jpg"
                            />
                        </div>
                    </div>
                    <div classList="col-12 col-md-6 text-center">
                        <img
                            style={{ width: '10rem' }}
                            alt="idea2app"
                            src="https://github.com/idea2app.png"
                        />
                        <h2 className="h4 text-muted my-4">
                            全行业信息化转型专家
                        </h2>
                        <h2 className="h4 text-muted">远程办公团队</h2>
                        <p className="h4">您的每个创意都值得用心实现</p>
                    </div>
                </Section>
                <Section id="services" className="row">
                    <img
                        className="d-none d-sm-block col-sm-6 vh-100 py-5"
                        src="https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs//draws/simple-iphone.svg"
                    />
                    <ul className="col-12 col-sm-6 list-unstyled d-flex flex-column justify-content-center">
                        {services.map(({ icon, name, summary, action }) => (
                            <MediaObject
                                key={name}
                                className="my-4"
                                listItem
                                image={icon}
                                title={name}
                            >
                                <p className="text-muted">{summary}</p>
                                {action && (
                                    <Button
                                        color="success"
                                        size="sm"
                                        href={action}
                                    >
                                        立即咨询
                                    </Button>
                                )}
                            </MediaObject>
                        ))}
                    </ul>
                </Section>
                <Section id="projects" title="客户案例">
                    <ul className="list-unstyled row mt-5 text-center">
                        {cases.map(this.renderCase)}
                    </ul>
                </Section>
                <Section
                    id="members"
                    title="核心成员"
                    summary="小而美、自下而上生长的学习型团队"
                >
                    <ul className="list-unstyled row mt-5">
                        {members.map(({ name, GitHub, position, summary }) => (
                            <MediaObject
                                key={name}
                                className="col-12 col-md-6 mb-3"
                                listItem
                                image={`https://github.com/${GitHub}.png`}
                                title={name}
                            >
                                <h4 className="text-muted">{position}</h4>
                                <p className="text-muted">{summary}</p>
                            </MediaObject>
                        ))}
                    </ul>
                </Section>
                <Section id="partners" title="合作伙伴">
                    <div className="row mt-5 text-center">
                        {partners
                            .filter(({ summary }) => summary)
                            .map(item => (
                                <OrganizationCard
                                    key={item.name}
                                    className="col-12 col-sm-4 mb-4"
                                    {...item}
                                />
                            ))}
                    </div>
                </Section>
            </main>
        );
    }
}
