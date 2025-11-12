

export interface Notification {
  id: number | string;
  message: string;
  title: string;
  deepLink?: string;
  createdAt: Date;
}