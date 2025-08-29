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

// Types for SMS verification
export interface SignInData {
  phone: string;
  password?: string;
  verificationCode?: string;
}

export interface SignUpData extends SignInData {
  password: string;
}

interface SignUpInput extends SignUpData {
  repeat_password: string;
}

@observer
export class SessionForm extends Component<SessionFormProps> {
  @observable
  accessor signType: 'up' | 'in' = 'in';

  @observable
  accessor usePassword = true;

  @observable
  accessor verificationSent = false;

  @observable
  accessor countdown = 0;

  private countdownTimer?: NodeJS.Timeout;

  componentWillUnmount() {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
  }

  handleSendSMS = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { phone } = formToJSON<SignInData>(event.currentTarget.form!);

    if (!phone) {
      alert('请输入手机号码');
      return;
    }

    // Validate phone number format (Chinese mobile number)
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      alert('请输入正确的手机号码');
      return;
    }

    try {
      await userStore.sendSMSCode(phone);
      this.verificationSent = true;
      this.countdown = 60;
      
      // Start countdown
      this.countdownTimer = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(this.countdownTimer!);
          this.verificationSent = false;
        }
      }, 1000);

      alert('验证码已发送到您的手机');
    } catch (error) {
      console.error('Failed to send SMS:', error);
      alert('发送验证码失败，请稍后重试');
    }
  };

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

    const { phone, password, repeat_password, verificationCode } = formToJSON<SignUpInput>(event.currentTarget);

    try {
      if (this.signType === 'up') {
        if (this.usePassword) {
          if (!password || password !== repeat_password) {
            throw new Error('密码不匹配');
          }
          await userStore.signUp(phone, password);
        } else {
          if (!verificationCode) {
            throw new Error('请输入验证码');
          }
          await userStore.signUpWithSMS(phone, verificationCode);
        }
        this.signType = 'in';
        alert('注册成功，请登录');
      } else {
        if (this.usePassword) {
          if (!password) {
            throw new Error('请输入密码');
          }
          await userStore.signIn(phone, password);
        } else {
          if (!verificationCode) {
            throw new Error('请输入验证码');
          }
          await userStore.signInWithSMS(phone, verificationCode);
        }
        this.props.onSignIn?.({ phone, password, verificationCode });
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      alert((error as Error).message || '操作失败，请稍后重试');
    }
  };

  handleTabChange = (_: ChangeEvent<{}>, newValue: 'up' | 'in') => {
    this.signType = newValue;
  };

  renderPasswordField = (signType = this.signType, loading = false) => (
    <div className="flex flex-col gap-4">
      {this.usePassword ? (
        <>
          <TextField
            type="password"
            name="password"
            required
            fullWidth
            label="密码"
            placeholder="请输入密码"
            variant="outlined"
          />
          {signType === 'up' && (
            <TextField
              type="password"
              name="repeat_password"
              required
              fullWidth
              label="确认密码"
              placeholder="请再次输入密码"
              variant="outlined"
            />
          )}
        </>
      ) : (
        <TextField
          name="verificationCode"
          required
          fullWidth
          label="验证码"
          placeholder="请输入验证码"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  onClick={this.handleSendSMS}
                  disabled={loading || this.verificationSent}
                  variant="outlined"
                  size="small"
                >
                  {this.verificationSent ? `${this.countdown}s后重发` : '发送验证码'}
                </Button>
              </InputAdornment>
            ),
          }}
        />
      )}
      <Button
        variant="text"
        onClick={() => (this.usePassword = !this.usePassword)}
        size="small"
      >
        {this.usePassword ? '使用短信验证码' : '使用密码'}
      </Button>
    </div>
  );

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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">+86</InputAdornment>
            ),
          }}
        />

        <div className="flex items-center gap-2">
          {this.renderPasswordField(signType, loading)}

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