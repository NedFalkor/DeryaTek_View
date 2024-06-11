export interface ICustomUser {
  id: number;
  customUserEmail: string;
  customUserUsername: string;
  isStaff: boolean;
  isSuperuser: boolean;
  password?: string;
}
