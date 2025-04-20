export interface User {
  id: number;
  name: string;
  username?: string;
  website: string;
  email?: string;
  company: {
    name: string;
    catchPhrase?: string;
    bs?: string;
  };
}

export interface CreateUser {
  id: number;
  name: string;
  username?: string;
  website: string;
  email?: string;
  company: {
    name: string;
    catchPhrase?: string;
    bs?: string;
  };
}
