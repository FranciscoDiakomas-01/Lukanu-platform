import { StaticImageData } from "next/image";
export default interface Ebook {
  id: number | string;
  currentPrice: number;
  oldPrice: number;
  rate?: number;
  cover: string | StaticImageData;
  title: string;
  description: string;
  link?: string;
  category?: string;
  canShare?: boolean;
  type?: "1" | "2";
  pages?: number;
  format?: string;
  edition?: string;
  publisher?: string;
  author?: string;
  language?: string;
}

export interface MyEbooksBuy {
  id: number | string;
  price: number;
  cover: string | StaticImageData;
  title: string;
  category: string;
  status: "1" | "2" | "3";
  sells: number;
  createdAt: Date;
  updatedAt: Date;
  type: "1" | "2";
}

export interface EbookOwner {
  name: string;
  lastname: string;
  profile: string;
  ebooks: number;
  sells: number;
  email: string;
  id: number | string;
  bio: string;
}
