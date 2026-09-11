import { User } from '@idea2app/data-server';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { JWTProps } from 'next-ssr-middleware';
import { Component, PropsWithChildren } from 'react';

import userStore from '../../models/User';
import { SessionForm } from './SessionForm';
import { WebAuthnCredentialList } from './WebAuthnCredentialList';

export interface SessionBoxProps extends PropsWithChildren<JWTProps<User>> {
  path?: string;
}

@observer
export class SessionBox extends Component<SessionBoxProps> {
  @observable
  accessor modalShown = false;

  componentDidMount() {
    this.modalShown = !this.props.jwtPayload;
  }

  toggleModal = (open: boolean) => {
    if (open || this.props.jwtPayload || userStore.session) this.modalShown = open;
  };

  render() {
    const { children, jwtPayload } = this.props,
      currentUser = userStore.session || jwtPayload;

    return (
      <>
        {children}

        <Dialog open={this.modalShown} onOpenChange={this.toggleModal}>
          <DialogContent className="max-w-[90vw] rounded-xl p-4 sm:max-w-[400px]">
            {currentUser ? (
              <WebAuthnCredentialList email={currentUser.email!} />
            ) : (
              <SessionForm onSignIn={() => (this.modalShown = true)} />
            )}
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
