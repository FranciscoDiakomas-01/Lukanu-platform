import { User } from "./User";

export default interface Course {
  id?: number;
  ownerId: number;
  title: string;
  description: string;
  videoURl: string;
  category: string;
  price: number;
  level: LEVEL;
  formLink: string;
  isPublished: boolean;
  totalLessons: number;
  totalStudents: number;
  status: STATUS;
  createdAt: Date;
  updatedAt: Date;
  owner: User;
  Subscriptions: any[];
  Lessons: Lesson[];
}

export enum STATUS {
  ACTIVED = "ACTIVED",
  DESACTIVED = "DESACTIVED",
  PENDING = "PENDING",
}

export enum LEVEL {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export interface Lesson {
  id: number;
  courseId: number;
  order: number;
  title: string;
  description: string;
  videoURl: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  id: number;
  courseId: number;
  userId: number;
  status: STATUS;
  amount: number;
  file: string;
  expiredAt: Date;
  createdAt: Date;
  updatedAt: Date;
  course: Course;
}
