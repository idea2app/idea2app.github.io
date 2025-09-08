// Types for @idea2app/data-server@1.0.0-rc.1 - waiting for official types
declare module '@idea2app/data-server' {
  export interface Base {
    id: string;
    createdAt?: string;
    updatedAt?: string;
  }

  export interface User extends Base {
    email?: string;
    name?: string;
    phone?: string;
    avatar?: string;
    token?: string;
  }

  export interface Project extends Base {
    name: string;
    description?: string;
    status?: string;
    owner?: User;
  }

  export interface RequirementEvaluation {
    techStack?: string[];
    difficulty?: string;
    timeline?: string;
    cost?: string;
    architecture?: string;
    keyFeatures?: string;
    riskAssessment?: string;
  }

  export interface ConsultMessage extends Base {
    content: string;
    user?: User;
    project?: Project;
    evaluation?: RequirementEvaluation;
  }

  export interface PhoneSignInData {
    phone?: string;
    mobilePhone: string;
    password: string;
    code?: string;
  }

  export interface WebAuthnChallenge {
    challenge: string;
    string: string;
    [key: string]: any;
  }

  export interface ListChunk<T> {
    list: T[];
    count: number;
  }

  // Legacy compatibility
  export interface ProjectEvaluation extends ConsultMessage {}
}