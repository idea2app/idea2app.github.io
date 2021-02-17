import { WebCellProps, createCell } from 'web-cell';
import classNames from 'classnames';
import { Button } from 'boot-cell/source/Form/Button';

import { libraries } from '../../model/static';

export type ProjectCardProps = WebCellProps & typeof libraries[0];

export const ProjectCard = ({
    className,
    packages,
    name,
    summary,
    type,
    defaultSlot,
    ...rest
}: ProjectCardProps) => (
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
                    src={
                        repo
                            ? `https://raw.githubusercontent.com/github/explore/master/topics/${repo}/${repo}.png`
                            : `https://github.com/${org}.png`
                    }
                />
            ))}
        </header>
        <h3 className="h5 my-3 text-center">
            <a target="_blank" href={`https://github.com/idea2app/${name}`}>
                {name}
            </a>
        </h3>
        <p className="flex-fill text-muted">{summary}</p>
        {type !== 'scaffold' ? null : (
            <Button
                block
                outline
                color="primary"
                target="_blank"
                href={`https://github.com/idea2app/${name}/generate`}
            >
                新建项目
            </Button>
        )}
    </div>
);
