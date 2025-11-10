export default interface Course {
  title: string;
  description: string;
  cover: string;
  id: number | string;
  lessons: number;
  price: number;
  category: string;
  level: "1" | "2" | "3";
  students?:number
}

export interface CourseAssignature {
  title: string;
  description: string;
  cover: string;
  id: number | string;
  lessons: number;
  category: string;
  level: "1" | "2" | "3";
  viewedLessons: number;
  status: "1" | "2" | "3";
  certificate: boolean;
  hasAcess : boolean
}
