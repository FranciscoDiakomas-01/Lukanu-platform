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
  public async updateMyData(data: {
    iban: string;
    bank: string;
    firstName: string;
    lastName: string;
    email: string;
  }) {
    try {
      const res = await fetch(`${server}/users/me`, {
        headers: {
          authorization: `BEARER ${this.token}`,
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(data),
      });

      const dataResponse = await res.json();
      console.log(dataResponse);
      const message = Array.isArray(dataResponse?.message)
        ? dataResponse?.message[0]
        : dataResponse?.message;
      return {
        message,
        hasError: false,
      };
    } catch (error) {
      console.log(error);
      return {
        hasError: true,
        message: "Erro ao actualizar os dados",
      };
    }
  }
  public async updateCredentials(data: {
    newPassWord: string;
    odlPassword: string;
    confirmNewPassword: string;
  }) {
    try {
      if (data.newPassWord != data.confirmNewPassword) {
        return {
          sucess: false,
          message: "As senhas não combinam",
        };
      }
      const res = await fetch(`${server}/users/me`, {
        headers: {
          authorization: `BEARER ${this.token}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          newPassWord: data.newPassWord,
          odlPassword: data.odlPassword,
        }),
      });

      const dataResponse = await res.json();
      console.log(dataResponse);
      const message = Array.isArray(dataResponse?.message)
        ? dataResponse?.message[0]
        : dataResponse?.message;
      return {
        message,
        sucess: dataResponse?.sucess ? true : false,
      };
    } catch (error) {
      console.log(error);
      return {
        sucess: true,
        message: "Erro ao actualizar os dados",
      };
    }
  }
  public async getUsers(page: number) {
    try {
      const data = await fetch(`${server}/users?page=${page}&limit=20`, {
        headers: {
          authorization: `BEARER ${this.token}`,
          "Content-Type": "application/json",
        },
      });

      const responseData = await data.json();
      return responseData;
    } catch (error: any) {
      return {
        lastPage: 1,
        hasError: true,
        message: error?.message ?? error?.cause ?? "Erro ao listar os usuários",
      };
    }
  }
}
