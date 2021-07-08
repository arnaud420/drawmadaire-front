export enum MessageType {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  DANGER = 'danger',
}

export interface Message {
  content: string;
  type: MessageType;
}

export interface App {
  message?: Message;
  isModalOpened: boolean;
}
