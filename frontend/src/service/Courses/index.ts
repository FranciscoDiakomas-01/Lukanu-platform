import server from "../server";

export default class CourseClientService {
  constructor(private readonly token: string) {}
  public async getCourses(page: number) {
    try {
      const res = await fetch(`${server}/courses?page=${page}&limit=${20}`, {
        headers: {
          authorization: `BEARER ${this.token}`,
          "Content-Type": "application/json",
        },
      });
      const dataResponse = (await res.json()) as {
        data: [];
        lastPage: number;
      };
      return dataResponse;
    } catch (error) {
      return {
        hasError: true,
        lastPage: 1,
        data: [],
      };
    }
  }
}
