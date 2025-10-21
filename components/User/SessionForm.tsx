import { SignInData } from '@idea2app/data-server';
import { Button, IconButton, Tab, Tabs, TextField } from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { FormEvent, MouseEvent } from 'react';
import { formToJSON } from 'web-utility';

import { i18n, I18nContext } from '../../models/Translation';
import userStore from '../../models/User';
import { SymbolIcon } from '../Icon';

export interface SessionFormProps {
  onSignIn?: (data?: SignInData) => any;
}

@observer
export class SessionForm extends ObservedComponent<SessionFormProps, typeof i18n> {
  static contextType = I18nContext;

  @observable
  accessor signType: 'up' | 'in' = 'in';

  handleWebAuthn = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { t } = this.observedContext;

    if (this.signType === 'up') {
      const { email } = formToJSON<SignInData>(event.currentTarget.form!);

      if (!email) throw new Error(t('email_required_for_webauthn'));

      await userStore.signUpWebAuthn(email);
    } else {
      await userStore.signInWebAuthn();
    }
    this.props.onSignIn?.();
  };

  handleEmailOTP = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { t } = this.observedContext;
    const { email } = formToJSON<SignInData>(event.currentTarget.form!);

    if (!email) throw new URIError(t('email_required_for_OTP'));

    await userStore.sendOTP(email);

    alert(t('OTP_sent_to_email'));
  };

  handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { t } = this.observedContext;
    const { email, password } = formToJSON<SignInData>(event.currentTarget);

    if (this.signType === 'up') {
      await userStore.signUp(email, password);

      this.signType = 'in';

      alert(t('registration_success_please_login'));
    } else {
      await userStore.signIn(email, password);

      this.props.onSignIn?.({ email, password });
    }
  };

  render() {
    const { signType } = this,
      loading = userStore.uploading > 0;

    const { t } = this.observedContext;

    return (
      <form className="flex flex-col gap-4" onSubmit={this.handleSubmit}>
        <Tabs
          value={signType}
          variant="fullWidth"
          className="mb-4"
          onChange={(_, newValue: 'up' | 'in') => (this.signType = newValue)}
        >
          <Tab label={t('register')} value="up" />
          <Tab label={t('login')} value="in" />
        </Tabs>

        <TextField
          name="email"
          type="email"
          required
          fullWidth
          variant="outlined"
          label={t('email')}
          placeholder={t('please_enter_email')}
        />
        <div className="flex items-center gap-2">
          <TextField
            name="password"
            type="password"
            required
            fullWidth
            variant="outlined"
            label={t('password')}
            placeholder={t('please_enter_password')}
          />
          {signType === 'in' && (
            <IconButton
              size="large"
              title="Email OTP"
              disabled={loading}
              onClick={this.handleEmailOTP}
            >
              <SymbolIcon name="key" />
            </IconButton>
          )}
          <IconButton
            size="large"
            title="WebAuthn"
            disabled={loading}
            onClick={this.handleWebAuthn}
          >
            <SymbolIcon name="fingerprint" />
          </IconButton>
        </div>

        <Button
          className="mt-4"
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={loading}
        >
          {signType === 'up' ? t('register') : t('login')}
        </Button>
      </form>
    );
  }
}
