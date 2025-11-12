import server from "../server";

export default class UserClientService {
  constructor(private readonly token: string) {}

  public async getMyData() {
    try {
      const res = await fetch(`${server}/users/me`, {
        headers: {
          authorization: `BEARER ${this.token}`,
          "Content-Type": "application/json",
        },
      });
      return await res.json();
    } catch (error) {
      return {
        hasError: true,
        message: "Erro ao fazer a consulta",
      };
    }
  }
  public async notifications(page: number) {
    try {
      const notifications = await fetch(
        `${server}/nofications?page=${page}&limit=20`,
        {
          headers: {
            authorization: `BEARER ${this.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const notificationsData = await notifications?.json();
      if (notificationsData?.hasError)
        return {
          hasError: notificationsData?.hasError,
          message: notificationsData?.message || "Erro ao fazer a consulta",
        };
      return {
        hasError: false,
        data: notificationsData?.data || [],
        total: notificationsData?.total,
        lastPage: notificationsData?.lastPage,
        page: notificationsData?.page,
        limit: notificationsData?.limit,
        maxPerPage: notificationsData?.maxPerPage,
        hasNextPage: notificationsData?.hasNextPage,
        hasPrevPage: notificationsData?.hasPrevPage,
      };
    } catch (error) {
      return {
        hasError: true,
        message: "Erro ao fazer a consulta",
      };
    }
  }
  public async updateMyData() {}
  public async updateCredentials() { }
  
}
