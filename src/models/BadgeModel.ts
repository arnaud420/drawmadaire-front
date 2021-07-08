export enum BadgeEnum {
  LAUGHING = 'laugh',
  SICK = 'sick',
  IN_LOVE = 'love',
}

export type BADGE_TYPE = BadgeEnum.LAUGHING | BadgeEnum.SICK | BadgeEnum.IN_LOVE;

export interface Badge {
  id: number;
  name: BADGE_TYPE;
  updatedAt: string;
  createdAt: string;
}

export const getBadgeTypeFromDb = (name: string) => {
  let badge = '';
  switch (name) {
    case 'LAUGH':
      badge = BadgeEnum.LAUGHING;
      break;
    case 'LOVE':
      badge = BadgeEnum.IN_LOVE;
      break;
    case 'SICK':
      badge = BadgeEnum.SICK;
      break;
    default:
      badge = '';
  }
  return badge;
}
