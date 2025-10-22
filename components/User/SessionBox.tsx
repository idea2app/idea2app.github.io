import { User } from '@idea2app/data-server';
import { Box, List, ListItem, ListItemButton, ListItemText, Modal } from '@mui/material';
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
          {children}

          <Modal open={this.modalShown}>
            <Box
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded p-4 shadow-lg"
              sx={{
                width: '400px',
                maxWidth: '90vw',
                bgcolor: 'background.paper',
              }}
            >
              <SessionForm onSignIn={() => (this.modalShown = false)} />
            </Box>
          </Modal>
        </main>
      </div>
    );
  }
}
