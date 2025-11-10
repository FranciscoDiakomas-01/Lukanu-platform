export default interface Lesson {
  courseid: number;
  id: number;
  videoURL: string;
  title: string;
  description: string;
  order: number;
  tags : string[]
}
