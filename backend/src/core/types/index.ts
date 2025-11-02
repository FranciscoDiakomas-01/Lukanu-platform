import { ROLE } from "@prisma/client";


export interface RefreshToken {
  role: ROLE;
  sub : number
}