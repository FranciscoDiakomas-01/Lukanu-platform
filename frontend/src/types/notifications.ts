export default interface Notification {
  id: number | string;
  message: string;
  title: string;
  deeplink?: string;
  createdAt : Date
}
