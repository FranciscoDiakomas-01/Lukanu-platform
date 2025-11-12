import { CreateEbookDto } from "@/types/CreateEbook";
import { User } from "./User";

export interface Payments {
  id: number;
  buyerId: number;
  ebookId: number;
  price: number;
  payed: number;
  afiliationCode: string;
  description: string;
  fileUrl: string;
  digital: boolean;
  status: PAYSTATUS;
  createdAt: Date;
  updatedAt: Date;
  owner: User;
  ebook: CreateEbookDto;
  client: any;
}

enum PAYSTATUS {
  PAID = "PAID",
  CANCELED = "CANCELED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}
