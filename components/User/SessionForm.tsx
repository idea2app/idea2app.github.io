import { Button, Tab, Tabs, TextField, InputAdornment, IconButton } from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Component, FormEvent, MouseEvent, ChangeEvent } from 'react';
import { formToJSON } from 'web-utility';

import { SymbolIcon } from '../Icon';
import userStore from '../../models/User';

export interface SessionFormProps {
  onSignIn?: (data?: SignInData) => any;
}

export interface SignInData {
  phone: string;
  password: string;
}

@observer
export class SessionForm extends Component<SessionFormProps> {
  @observable
  accessor signType: 'up' | 'in' = 'in';

  handleWebAuthn = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      if (this.signType === 'up') {
        const { phone } = formToJSON<SignInData>(event.currentTarget.form!);
        if (!phone) throw new Error('手机号是WebAuthn注册的必填项');
        await userStore.signUpWebAuthn(phone);
      } else {
        await userStore.signInWebAuthn();
      }
      this.props.onSignIn?.();
    } catch (error) {
      console.error('WebAuthn failed:', error);
      alert('WebAuthn验证失败');
    }
  };

  handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { phone, password } = formToJSON<SignInData>(event.currentTarget);

    try {
      if (this.signType === 'up') {
        await userStore.signUp(phone, password);
        this.signType = 'in';
        alert('注册成功，请登录');
      } else {
        await userStore.signIn(phone, password);
        this.props.onSignIn?.({ phone, password });
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      alert((error as Error).message || '操作失败，请稍后重试');
    }
  };

  handleTabChange = (_: ChangeEvent<{}>, newValue: 'up' | 'in') => {
    this.signType = newValue;
  };

  render() {
    const { signType } = this,
      loading = userStore.uploading > 0;

    return (
      <form
        className="flex flex-col gap-4"
        onSubmit={this.handleSubmit}
      >
        <Tabs
          value={signType}
          onChange={this.handleTabChange}
          variant="fullWidth"
          className="mb-4"
        >
          <Tab label="注册" value="up" />
          <Tab label="登录" value="in" />
        </Tabs>

        <TextField
          type="tel"
          name="phone"
          required
          fullWidth
          label="手机号码"
          placeholder="请输入手机号码"
          variant="outlined"
          inputProps={{
            pattern: "1[3-9]\\d{9}",
            title: "请输入正确的手机号码"
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">+86</InputAdornment>
            ),
          }}
        />

        <div className="flex items-center gap-2">
          <TextField
            type="password"
            name="password"
            required
            fullWidth
            label="密码"
            placeholder="请输入密码或验证码"
            variant="outlined"
          />

          <IconButton
            onClick={this.handleWebAuthn}
            disabled={loading}
            size="large"
            className="self-end mb-2"
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
          {signType === 'up' ? '注册' : '登录'}
        </Button>
      </form>
    );
  }
}