// Temporary types for @idea2app/data-server until properly installed
declare module '@idea2app/data-server' {
  export interface User {
    id?: string;
    email?: string;
    name?: string;
    phone?: string;
    avatar?: string;
    [key: string]: any;
  }

  export interface PhoneSignInData {
    phone?: string;
    mobilePhone: string;
    password: string;
    code?: string;
  }

  export interface WebAuthnChallenge {
    challenge: string;
    [key: string]: any;
  }

  export interface Base {
    [key: string]: any;
  }

  export interface ListChunk<T> {
    list: T[];
    count: number;
    [key: string]: any;
  }

  export interface ProjectEvaluation {
    id: string;
    message?: string;
    evaluation?: {
      techStack?: string[];
      difficulty?: string;
      timeline?: string;
      cost?: string;
      architecture?: string;
      [key: string]: any;
    };
    user?: User;
    timestamp?: string;
  }
}