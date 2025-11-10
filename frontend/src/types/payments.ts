import { StaticImageData } from "next/image";

export interface Payment {
  id: number | string;
  comprovative: string;
  createdAt: string;
  status: "1" | "2" | "3";
  payed: number;
  client: {
    name: string;
    lastname: string;
    email?: string;
    profil: string;
    id: number;
  };
  book: {
    id: number;
    title: string;
    description?: string;
    cover: string | StaticImageData;
    price: number;
    type: "1" | "2";
  };
}
