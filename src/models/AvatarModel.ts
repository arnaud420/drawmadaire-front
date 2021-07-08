export interface Avatar {
  color: string;
  head: AVATAR_HEADS;
  mouth: AVATAR_MOUTHS;
}

export enum AVATAR_HEADS {
  CAP = 'cap',
  WITCH = 'witch',
  LADY_HAT = 'lady-hat',
  TOP_HAT = 'top-hat',
  INSPECTOR_HAT = 'inspector-hat'
}

export enum AVATAR_MOUTHS {
  ROSE = 'rose',
  PIZZA = 'pizza',
  SMOKING_PIPE = 'smoking-pipe',
  MUSTACHE = 'mustache',
  LEAF = 'leaf'
}

export enum AVATAR_COLORS {
  BLUE = '#437FA1',
  PEACH = '#FDD37D',
}
