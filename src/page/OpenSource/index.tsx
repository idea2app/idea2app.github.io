import { createCell } from 'web-cell';

import { Section } from '../../component/Section';
import { ProjectCard } from './ProjectCard';
import { libraries } from '../../model/static';

export function OpenSourcePage() {
    return (
        <main className="container-fluid">
            <Section title="开源生态">
                <ul className="list-unstyled row mt-5">
                    {libraries.map(item => (
                        <li className="col-12 col-sm-6 col-md-4 mb-3">
                            <ProjectCard {...item} />
                        </li>
                    ))}
                </ul>
            </Section>
        </main>
    );
}
