import { makeObservable, observable } from 'mobx';

import { API_Host } from './configuration';

// User types for SMS verification
export interface User {
  id?: string;
  phone?: string;
  email?: string;
  nickname?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SignInData {
  phone: string;
  password?: string;
  verificationCode?: string;
}

export interface SignUpData extends SignInData {
  password: string;
}

export interface SMSCodeRequest {
  phone: string;
}

export interface SMSCodeResponse {
  success: boolean;
  message?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export class UserStore {
  @observable
  accessor uploading = 0;

  @observable
  accessor currentUser: User | null = null;

  baseURL = `${API_Host}/api/`;

  constructor() {
    makeObservable(this);
  }

  private async request<T>(path: string, method: string = 'GET', body?: any): Promise<T> {
    this.uploading++;
    try {
      const options: RequestInit = { 
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      
      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(`${this.baseURL}${path}`, options);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } finally {
      this.uploading--;
    }
  }

  async sendSMSCode(phone: string): Promise<SMSCodeResponse> {
    return this.request<SMSCodeResponse>('user/sms-code', 'POST', { phone });
  }

  async signUp(phone: string, password: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('user/signup', 'POST', { phone, password });
    
    this.currentUser = response.user;
    
    // Store token in cookie
    document.cookie = `token=${response.token}; path=/; max-age=${7 * 24 * 60 * 60}`;
    
    return response;
  }

  async signUpWithSMS(phone: string, verificationCode: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('user/signup-sms', 'POST', { phone, verificationCode });
    
    this.currentUser = response.user;
    
    // Store token in cookie
    document.cookie = `token=${response.token}; path=/; max-age=${7 * 24 * 60 * 60}`;
    
    return response;
  }

  async signIn(phone: string, password: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('user/signin', 'POST', { phone, password });
    
    this.currentUser = response.user;
    
    // Store token in cookie
    document.cookie = `token=${response.token}; path=/; max-age=${7 * 24 * 60 * 60}`;
    
    return response;
  }

  async signInWithSMS(phone: string, verificationCode: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('user/signin-sms', 'POST', { phone, verificationCode });
    
    this.currentUser = response.user;
    
    // Store token in cookie
    document.cookie = `token=${response.token}; path=/; max-age=${7 * 24 * 60 * 60}`;
    
    return response;
  }

  async signUpWebAuthn(phone: string): Promise<void> {
    // WebAuthn registration flow
    // This is a placeholder implementation
    throw new Error('WebAuthn registration not implemented yet');
  }

  async signInWebAuthn(): Promise<AuthResponse> {
    // WebAuthn authentication flow
    // This is a placeholder implementation
    throw new Error('WebAuthn authentication not implemented yet');
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await this.request<{ user: User }>('user/profile', 'GET');
      this.currentUser = response.user;
      return response.user;
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  }

  signOut(): void {
    this.currentUser = null;
    // Remove token cookie
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  }
}

const userStore = new UserStore();
export default userStore;