export interface IDecoded {
  id: number;
  iat: number;
  exp: number;
  iss: string;
}

export interface IKakaoAccount {
  email: string;
  email_needs_agreement: boolean;
  has_email: boolean;
  is_email_valid: boolean;
  is_email_verified: boolean;
}

export interface IKakaoProfile {
  id: number;
  connected_at: string;
  kakao_account: IKakaoAccount;
}

export interface IKakaoResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
  token_type: string;
}

export interface IKakaoLoginResult {
  response: IKakaoResponse;
  profile: IKakaoProfile;
  loginKeeper: boolean;
}

export interface IGoogleLoginResult {
  result: {
    googleId: string;
    imageUrl: string;
    email: string;
    name: string;
    givenName: string;
  };
  loginKeeper: boolean;
}

export interface IKakaoInfo {
  id: number;
  connected_at: string;
  kakao_account: IKakaoAccount;
}

// Event

export interface IEvent {
  content: string;
  date: string;
  startTime: Date;
  endTime: Date;
}
