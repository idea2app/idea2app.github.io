import { WebCellProps, WebCellElement, createCell } from 'web-cell';
import classNames from 'classnames';

export interface SectionProps extends WebCellProps {
    summary?: WebCellElement;
}

export function Section({
    className,
    title,
    summary,
    defaultSlot,
    ...rest
}: SectionProps) {
    return (
        <section className={classNames('my-5', 'py-sm-5', className)} {...rest}>
            {title && <h2 className="text-center">{title}</h2>}
            {summary && <p className="text-center text-muted">{summary}</p>}
            {defaultSlot}
        </section>
    );
}
