export default interface UserType {
  id: number;
  username: string;
  name: null | string;
  avatar_template: string;
  flair_name: null | string;
  admin?: true;
  moderator?: true;
  trust_level: 0 | 1 | 2 | 3 | 4;
}
