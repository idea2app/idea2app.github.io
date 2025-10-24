import { User } from '@idea2app/data-server';
import { Box, Modal } from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { JWTProps } from 'next-ssr-middleware';
import { Component, PropsWithChildren } from 'react';

import { SessionForm } from './SessionForm';

export interface SessionBoxProps extends PropsWithChildren<JWTProps<User>> {
  path?: string;
}

@observer
export class SessionBox extends Component<SessionBoxProps> {
  @observable
  accessor modalShown = false;

  @observable
  accessor drawerOpen = false;

  componentDidMount() {
    this.modalShown = !this.props.jwtPayload;
  }

  toggleDrawer = () => (this.drawerOpen = !this.drawerOpen);

  closeDrawer = () => (this.drawerOpen = false);

  render() {
    const { children } = this.props;

    return (
      <>
        {children}

        <Modal open={this.modalShown}>
          <Box
            className="bg-background-paper absolute top-1/2 left-1/2 w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded p-4 shadow-2xl sm:w-[400px]"
            sx={{ boxShadow: 24 }}
          >
            <SessionForm onSignIn={() => (this.modalShown = false)} />
          </Box>
        </Modal>
      </>
    );
  }
}
