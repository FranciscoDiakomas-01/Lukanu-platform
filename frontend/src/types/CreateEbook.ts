import { User } from "./User";

export interface CreateEbookDto {
  id?: number;
  title: string;
  subtitle: string;
  description: string;
  coverUrl: string;
  fileURl: string;
  metaData: object;
  currentPrice: number;
  isShared: boolean;
  isDigital: boolean;
  sharePercent: number;
  pages: number;
  category: string;
  edition: number;
  oldProce?: number;
  belongeMe?: boolean;
  author?: User
}
