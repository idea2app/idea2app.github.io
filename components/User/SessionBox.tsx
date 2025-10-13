import { User } from '@idea2app/data-server';
import { Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { JWTProps } from 'next-ssr-middleware';
import { Component, HTMLAttributes, JSX } from 'react';

import { PageHead } from '../PageHead';
import { SessionForm } from './SessionForm';

export type MenuItem = Pick<JSX.IntrinsicElements['a'], 'href' | 'title'>;

export interface SessionBoxProps extends HTMLAttributes<HTMLDivElement>, JWTProps<User> {
  path?: string;
  menu?: MenuItem[];
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
            className="sticky-top flex-col px-3"
            style={{ top: '5rem', minWidth: '200px' }}
          >
            {menu.map(({ href, title }) => (
              <ListItem key={href} disablePadding>
                <ListItemButton
                  component={Link}
                  href={href || '#'}
                  selected={path?.split('?')[0].startsWith(href || '')}
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

          <h1 className="mb-4 text-3xl font-bold">{title}</h1>

          {children}

          <Drawer
            anchor="right"
            slotProps={{ paper: { className: 'p-4', style: { width: '400px' } } }}
            open={this.modalShown}
            onClose={() => (this.modalShown = false)}
          >
            <SessionForm onSignIn={() => window.location.reload()} />
          </Drawer>
        </main>
      </div>
    );
  }
}
