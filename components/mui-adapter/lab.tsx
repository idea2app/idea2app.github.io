import {
  Children,
  FC,
  MouseEvent,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
} from 'react';

import { TabProps } from './material';

const tabValueContext = createContext('0');

export const TabContext: FC<PropsWithChildren<{ value: string }>> = ({ value, children }) => (
  <tabValueContext.Provider value={value}>{children}</tabValueContext.Provider>
);

export interface TabListProps {
  onChange?: (event: MouseEvent<HTMLButtonElement>, value: string) => void;
  className?: string;
  component?: string;
  variant?: 'fullWidth' | 'standard';
  'aria-label'?: string;
}

export const TabList: FC<PropsWithChildren<TabListProps>> = ({ onChange, className, children }) => {
  const value = useContext(tabValueContext);

  return (
    <div className={className} role="tablist">
      <div className="inline-flex rounded-md bg-gray-100 p-1 dark:bg-gray-800">
        {Children.map(children, child =>
          isValidElement(child)
            ? cloneElement(child as ReactElement<TabProps>, {
                selected: (child.props as TabProps).value === value,
                onSelect: (event: MouseEvent<HTMLButtonElement>, newValue?: string) =>
                  onChange?.(event, String(newValue)),
              })
            : child,
        )}
      </div>
    </div>
  );
};

export const TabPanel: FC<PropsWithChildren<{ value: string; className?: string }>> = ({
  value,
  className,
  children,
}) => {
  const current = useContext(tabValueContext);

  if (value !== current) return null;

  return <div className={className}>{children}</div>;
};
