import { Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Component, HTMLAttributes, JSX } from 'react';

import { PageHead } from '../PageHead';
import { SessionForm } from './SessionForm';

export type MenuItem = Pick<JSX.IntrinsicElements['a'], 'href' | 'title'>;

export interface SessionBoxProps extends HTMLAttributes<HTMLDivElement> {
  path?: string;
  menu?: MenuItem[];
  jwtPayload?: any; // TODO: Define proper JWT payload type
}

@observer
export class SessionBox extends Component<SessionBoxProps> {
  @observable
  accessor modalShown = false;

  componentDidMount() {
    this.modalShown = !this.props.jwtPayload;
  }

  render() {
    const { className = '', title, children, path, menu = [], jwtPayload, ...props } = this.props;

    return (
      <div className={`flex ${className}`} {...props}>
        <div>
          <List
            component="nav"
            className="flex-col px-3 sticky-top"
            style={{ top: '5rem', minWidth: '200px' }}
          >
            {menu.map(({ href, title }) => (
              <ListItem key={href} disablePadding>
                <ListItemButton
                  href={href}
                  selected={path?.split('?')[0].startsWith(href!)}
                  className="rounded"
                >
                  <ListItemText primary={title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
        <main className="flex-1 pb-3">
          <PageHead title={title} />

          <h1 className="text-3xl font-bold mb-4">{title}</h1>

          {children}

          <Drawer
            anchor="right"
            open={this.modalShown}
            onClose={() => (this.modalShown = false)}
            PaperProps={{
              className: 'p-4',
              style: { width: '400px' },
            }}
          >
            <SessionForm onSignIn={() => window.location.reload()} />
          </Drawer>
        </main>
      </div>
    );
  }
}