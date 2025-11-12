import { User } from "./User";

export interface WidthDrwal {
  id: number;
  userId: number;
  amount: number;
  status: WidthDrawStatus;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

enum WidthDrawStatus {
  ACTIVED = "ACTIVED",
  PENDING = "PENDING",
  DESACTIVED = "DESACTIVED",
}
