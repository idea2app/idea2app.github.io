import { createCell } from 'web-cell';

import { Section } from '../component/Section';
import { ProjectCard } from '../component/ProjectCard';
import projects from '../model/Project';

export function OpenSourcePage() {
    return (
        <main className="container-fluid">
            <Section title="开源生态">
                <ul className="list-unstyled row mt-5">
                    {projects.map(item => (
                        <li
                            key={item.name}
                            className="col-12 col-sm-6 col-md-4 mb-3"
                        >
                            <ProjectCard className="h-100" {...item} />
                        </li>
                    ))}
                </ul>
            </Section>
        </main>
    );
}
