import { User } from '@idea2app/data-server';
import { Dialog, DialogContent } from '@/components/ui/dialog';
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

        <Dialog open={this.modalShown} onOpenChange={value => (this.modalShown = value)}>
          <DialogContent className="max-w-[90vw] rounded-xl p-4 sm:max-w-[400px]">
            <SessionForm onSignIn={() => (this.modalShown = false)} />
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
