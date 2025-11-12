import { CreateEbookDto } from "./CreateEbook";
import { User } from "./User";

export interface Afiliation {
  id: number;
  link: string;
  userid: number;
  bookId: number;
  purchaseCount: number;
  purchases: number;
  ebook: CreateEbookDto;
  user: User;
}
