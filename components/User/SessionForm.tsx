import { PhoneSignInData } from '@idea2app/data-server';
import { Button, IconButton, InputAdornment, Tab, Tabs, TextField } from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { FormEvent, MouseEvent } from 'react';
import { formToJSON } from 'web-utility';

import { i18n, I18nContext } from '../../models/Translation';
import userStore from '../../models/User';
import { SymbolIcon } from '../Icon';

export interface SessionFormProps {
  onSignIn?: (data?: PhoneSignInData) => any;
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
      const { mobilePhone } = formToJSON<PhoneSignInData>(event.currentTarget.form!);

      if (!mobilePhone) throw new Error(t('phone_required_for_webauthn'));

      await userStore.signUpWebAuthn(mobilePhone);
    } else {
      await userStore.signInWebAuthn();
    }
    this.props.onSignIn?.();
  };

  handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { t } = this.observedContext;
    const { mobilePhone, password } = formToJSON<PhoneSignInData>(event.currentTarget);

    if (this.signType === 'up') {
      await userStore.signUp(mobilePhone, password);

      this.signType = 'in';

      alert(t('registration_success_please_login'));
    } else {
      await userStore.signIn(mobilePhone, password);

      this.props.onSignIn?.({ mobilePhone, password });
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
          name="mobilePhone"
          type="tel"
          required
          fullWidth
          variant="outlined"
          label={t('phone_number')}
          placeholder={t('please_enter_phone')}
          slotProps={{
            htmlInput: {
              pattern: '1[3-9]\\d{9}',
              title: t('please_enter_correct_phone'),
            },
            input: {
              startAdornment: <InputAdornment position="start">+86</InputAdornment>,
            },
          }}
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

          <IconButton
            size="large"
            className="mb-2 self-end"
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
