import { scrollTo } from 'web-utility/source/DOM';
import {
    component,
    mixin,
    watch,
    attribute,
    createCell,
    Fragment
} from 'web-cell';
import { PageProps } from 'cell-router/source';
import { Badge } from 'boot-cell/source/Reminder/Badge';
import { Image } from 'boot-cell/source/Media/Image';

import { ProjectCard } from '../component/ProjectCard';
import { User } from '../model/User';
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
        <li className="list-inline-item">
            <Image
                className="rounded-circle"
                style={{ width: '3rem' }}
                title={name}
                src={`https://github.com/${GitHub}.png`}
            />
        </li>
    );

    render({ name }: CasePageProps) {
        const caseData = cases.find(item => item.name === name);

        return (
            caseData && (
                <main className="row mt-5">
                    <article className="col-9">
                        <Image
                            className="d-block mx-auto"
                            fluid
                            src={caseData.preview}
                        />
                    </article>
                    <header className="col-3">
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
                        {caseData.projects && (
                            <>
                                <h2 className="h5 my-3">自研开源项目</h2>
                                <ul className="list-unstyled">
                                    {caseData.projects.map(item => (
                                        <li className="mt-3">
                                            <ProjectCard {...item} />
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </header>
                </main>
            )
        );
    }
}
