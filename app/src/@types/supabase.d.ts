interface UserAppMetadata {
  provider: string;
  providers: string[];
}

interface User {
  app_metadata: UserAppMetadata;
  id: string;
  aud: string;
  email: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  created_at: string;
  email: string;
  email_confirmed_at: string;
  last_sign_in_at: string;
  phone: string;
  role: string;
  updated_at: string;
}

interface Session {
  access_token: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  user: User;
}
