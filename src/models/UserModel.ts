import { Avatar } from './AvatarModel';
import { Stat } from './StatModel';

export interface User {
  pseudo: string;
  avatar: Avatar;
  email?: string;
  isActive?: boolean;
  isUnauth?: boolean;
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  stats?: Stat;
}
