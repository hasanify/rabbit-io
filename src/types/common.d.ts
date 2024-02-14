declare function require(path: string);

interface User {
  meta: Meta;
  record: Record;
  token: string;
}
interface Record {
  avatar: string;
  clients: string[];
  collectionId: string;
  collectionName: string;
  created: string;
  email: string;
  emailVisibility: boolean;
  id: string;
  name: string;
  updated: string;
  username: string;
  verified: boolean;
}
interface Meta {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarUrl: string;
  rawUser: RawUser;
  accessToken: string;
  refreshToken: string;
  isNew: boolean;
}
interface RawUser {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}
