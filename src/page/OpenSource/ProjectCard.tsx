import { WebCellProps, createCell } from 'web-cell';
import classNames from 'classnames';
import { Button } from 'boot-cell/source/Form/Button';

import { libraries } from '../data';

export type ProjectCardProps = WebCellProps & typeof libraries[0];

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
                'h-100',
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
            <h3 className="h5 my-3 text-center">
                <a
                    target="_blank"
                    href={URL || `https://github.com/idea2app/${name}`}
                >
                    {name}
                </a>
            </h3>
            <p className="flex-fill text-muted">{summary}</p>

            <Button
                block
                outline
                color={isScaffold ? 'success' : 'primary'}
                target="_blank"
                href={
                    isScaffold
                        ? `https://github.com/idea2app/${name}/generate`
                        : URL
                }
            >
                {isScaffold ? '新建项目' : '访问官网'}
            </Button>
        </div>
    );
}
