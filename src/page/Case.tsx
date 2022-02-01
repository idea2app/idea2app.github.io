import { scrollTo } from 'web-utility/source/DOM';
import {
    component,
    mixin,
    watch,
    attribute,
    createCell,
    Fragment
} from 'web-cell';
import { PageProps } from 'cell-router';
import { Badge, Image } from 'boot-cell';

import { OrganizationCard } from '../component/OrganizationCard';
import { ProjectCard } from '../component/ProjectCard';
import { User } from '../model/User';
import { Organization } from '../model/Organization';
import { Project } from '../model/Project';
import cases from '../model/Case';

export interface CasePageProps extends PageProps {
    name: string;
}

@component({
    tagName: 'case-page',
    renderTarget: 'children'
})
export class CasePage extends mixin<CasePageProps>() {
    @attribute
    @watch
    name = '';

    connectedCallback() {
        scrollTo('#top');
    }

    renderAvatar = ({ name, GitHub }: User) => (
        <li key={name} className="list-inline-item">
            <Image
                className="rounded-circle"
                style={{ width: '3rem' }}
                title={name}
                src={`https://github.com/${GitHub}.png`}
            />
        </li>
    );

    renderPartners(list: Organization[]) {
        return (
            <>
                <h2 className="h5 my-3">合作伙伴</h2>
                <section className="row">
                    {list.map(item => (
                        <OrganizationCard
                            key={item.name}
                            className="col-12 col-sm-6 col-md-12 my-2 px-2"
                            {...item}
                        />
                    ))}
                </section>
            </>
        );
    }

    renderProjects(list: Project[]) {
        return (
            <>
                <h2 className="h5 my-3">自研开源项目</h2>
                <section className="row">
                    {list.map(item => (
                        <div className="col-12 col-sm-6 col-md-12 mb-3 px-2">
                            <ProjectCard
                                key={item.name}
                                className="h-100"
                                {...item}
                            />
                        </div>
                    ))}
                </section>
            </>
        );
    }

    render({ name }: CasePageProps) {
        const caseData = cases.find(item => item.name === name);

        return (
            caseData && (
                <main className="row mt-5">
                    <header className="col-12 col-md-3 order-md-1">
                        <div className="d-flex justify-content-between align-items-center">
                            <Badge color="primary">{caseData.type}</Badge>
                            <h1 className="h4 text-right">{name}</h1>
                        </div>
                        {caseData.URL && (
                            <a
                                className="d-block text-right"
                                target="_blank"
                                href={caseData.URL}
                            >
                                {caseData.URL}
                            </a>
                        )}
                        <h2 className="h5 my-3">项目组</h2>
                        <ul className="list-inline">
                            {caseData.team.map(this.renderAvatar)}
                        </ul>
                        {caseData.partners &&
                            this.renderPartners(caseData.partners)}
                        {caseData.projects &&
                            this.renderProjects(caseData.projects)}
                    </header>
                    <article className="col-12 col-md-9 order-md-0">
                        <Image
                            className="d-block mx-auto"
                            fluid
                            src={caseData.preview}
                        />
                    </article>
                </main>
            )
        );
    }
}
