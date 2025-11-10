export default interface Chat {
  id: number | string;
  messages: number;
  user: {
    name: string;
    lastname: string;
    profile: string;
    id: number | string;
  };
  message: {
    timestamp: Date;
    message: string;
  };
  status : "read" | "unread"
}
