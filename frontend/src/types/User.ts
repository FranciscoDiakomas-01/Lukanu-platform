export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileUrl: string;
  createdAt: Date;
  updatedAt: Date;
  iban: string | undefined;
  bank: string | undefined;
  role: "ADMIN" | "REGURAL";
  status: "ACTIVED" | "DESACTIVED" | "PENDING";
  totalErned: number;
  totalAvaliable: number;
  totalTaked: number;
  totalCourses: number;
  totalBooks: number;
  totalPendingPurchase: number;
  totalActiveCourses: number;
  totalDesactivedCourses: number;
  totalUnreadNotification: number;
}
