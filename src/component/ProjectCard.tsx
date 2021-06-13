import { WebCellProps, createCell } from 'web-cell';
import classNames from 'classnames';
import { Button } from 'boot-cell/source/Form/Button';

import { Project } from '../model/Project';

export type ProjectCardProps = WebCellProps & Project;

export function ProjectCard({
    className,
    packages,
    URL,
    name,
    summary,
    type,
    defaultSlot,
    ...rest
}: ProjectCardProps) {
    const isScaffold = type === 'scaffold';

    return (
        <div
            className={classNames(
                'shadow',
                'p-3',
                'd-flex',
                'flex-column',
                'justify-content-between',
                className
            )}
            {...rest}
        >
            <header className="d-flex justify-content-around">
                {packages.map(({ repo, org }) => (
                    <img
                        className="rounded"
                        style={{ width: '3rem' }}
                        alt={repo || org}
                        title={repo || org}
                        src={
                            repo
                                ? `https://raw.githubusercontent.com/github/explore/master/topics/${repo}/${repo}.png`
                                : `https://github.com/${org}.png`
                        }
                    />
                ))}
            </header>
            <h3 className="h5 my-3 text-center">{name}</h3>
            <p className="flex-fill text-muted">{summary}</p>

            <footer className="d-flex">
                <Button
                    block
                    size="sm"
                    outline
                    color="primary"
                    target="_blank"
                    href={URL || `https://ideapp.dev/${name}/`}
                >
                    查看{isScaffold ? '演示' : '文档'}
                </Button>

                {URL ? null : (
                    <Button
                        className="mt-0 ml-3"
                        block
                        size="sm"
                        outline
                        color="success"
                        target="_blank"
                        href={`https://github.com/idea2app/${name}/${
                            isScaffold ? 'generate' : ''
                        }`}
                    >
                        {isScaffold ? '新建项目' : '查看源码'}
                    </Button>
                )}
            </footer>
        </div>
    );
}
