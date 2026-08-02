import { SignInData } from '@idea2app/data-server';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { FormEvent, MouseEvent } from 'react';
import { formToJSON } from 'web-utility';

import { i18n, I18nContext } from '../../models/Translation';
import userStore from '../../models/User';
import { SymbolIcon } from '../Icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
        <Tabs value={signType} onValueChange={value => (this.signType = value as 'up' | 'in')}>
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="up" className="flex-1">
              {t('register')}
            </TabsTrigger>
            <TabsTrigger value="in" className="flex-1">
              {t('login')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="up" />
          <TabsContent value="in" />
        </Tabs>

        <label className="flex flex-col gap-1 text-sm">
          <span>{t('email')}</span>
          <Input name="email" type="email" required placeholder={t('please_enter_email')} />
        </label>
        <div className="flex items-center gap-2">
          <label className="flex-1 text-sm">
            <span className="mb-1 block">{t('password')}</span>
            <Input
              name="password"
              type="password"
              required
              placeholder={t('please_enter_password')}
            />
          </label>
          {signType === 'in' && (
            <Button
              type="button"
              size="icon"
              title="Email OTP"
              disabled={loading}
              onClick={this.handleEmailOTP}
              className="shrink-0"
            >
              <SymbolIcon name="key" />
            </Button>
          )}
          <Button
            type="button"
            size="icon"
            title="WebAuthn"
            disabled={loading}
            onClick={this.handleWebAuthn}
            className="shrink-0"
          >
            <SymbolIcon name="fingerprint" />
          </Button>
        </div>

        <Button className="mt-4" type="submit" disabled={loading}>
          {signType === 'up' ? t('register') : t('login')}
        </Button>
      </form>
    );
  }
}
