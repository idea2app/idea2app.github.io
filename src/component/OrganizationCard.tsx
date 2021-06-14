import { createCell, WebCellProps } from 'web-cell';
import classNames from 'classnames';

import { Organization } from '../model/Organization';

export type OrganizationCardProps = WebCellProps & Organization;

export function OrganizationCard({
    className,
    logo,
    URL,
    name,
    summary
}: OrganizationCardProps) {
    return (
        <div
            className={classNames(
                'd-flex',
                'flex-column',
                'align-items-center',
                className
            )}
        >
            <img
                className="flex-fill w-50"
                style={{ objectFit: 'contain' }}
                src={logo}
            />
            <h3 className="h5 mt-3">
                <a
                    className="text-decoration-none text-dark stretched-link"
                    target="_blank"
                    href={URL}
                >
                    {name}
                </a>
            </h3>
            <p className="text-muted m-0">{summary}</p>
        </div>
    );
}
