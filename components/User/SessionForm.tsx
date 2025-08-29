import { Button, IconButton,InputAdornment, Tab, Tabs, TextField } from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import React, { ChangeEvent,FormEvent, MouseEvent } from 'react';
import { formToJSON } from 'web-utility';

import { I18nContext } from '../../models/Translation';
import userStore from '../../models/User';
import { SymbolIcon } from '../Icon';

export interface SessionFormProps {
  onSignIn?: (data?: SignInData) => any;
}

export interface SignInData {
  phone: string;
  password: string;
}

@observer
export class SessionForm extends ObservedComponent<SessionFormProps, typeof I18nContext> {
  @observable
  accessor signType: 'up' | 'in' = 'in';

  static contextType = I18nContext;
  declare context: React.ContextType<typeof I18nContext>;

  handleWebAuthn = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (this.signType === 'up') {
      const { phone } = formToJSON<SignInData>(event.currentTarget.form!);
      if (!phone) throw new Error('手机号是WebAuthn注册的必填项');
      await userStore.signUpWebAuthn(phone);
    } else {
      await userStore.signInWebAuthn();
    }
    this.props.onSignIn?.();
  };

  handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { phone, password } = formToJSON<SignInData>(event.currentTarget);

    if (this.signType === 'up') {
      await userStore.signUp(phone, password);
      this.signType = 'in';
      alert('注册成功，请登录');
    } else {
      await userStore.signIn(phone, password);
      this.props.onSignIn?.({ phone, password });
    }
  };

  render() {
    const { signType } = this,
      loading = userStore.uploading > 0;
    
    const { t } = this.context;

    return (
      <form
        className="flex flex-col gap-4"
        onSubmit={this.handleSubmit}
      >
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
          name="phone"
          type="tel"
          required
          fullWidth
          label={t('phone_number')}
          placeholder={t('please_enter_phone')}
          variant="outlined"
          inputProps={{
            pattern: "1[3-9]\\d{9}",
            title: t('please_enter_correct_phone')
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">+86</InputAdornment>
            ),
          }}
        />

        <div className="flex items-center gap-2">
          <TextField
            name="password"
            type="password"
            required
            fullWidth
            label={t('password')}
            placeholder={t('please_enter_password')}
            variant="outlined"
          />

          <IconButton
            size="large"
            className="self-end mb-2"
            disabled={loading}
            onClick={this.handleWebAuthn}
          >
            <SymbolIcon name="fingerprint" />
          </IconButton>
        </div>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={loading}
          className="mt-4"
        >
          {signType === 'up' ? t('register') : t('login')}
        </Button>
      </form>
    );
  }
}