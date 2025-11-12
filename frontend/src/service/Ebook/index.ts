import server from "../server";
import { CreateEbookDto } from "@/types/CreateEbook";

export default class EBookClientService {
  constructor(private readonly token: string) {}

  public async create(data: CreateEbookDto) {
    try {
      console.log(data);
      const res = await fetch(`${server}/ebook`, {
        method: "POST",
        headers: {
          authorization: `BEARER ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json();
        return {
          hasError: true,
          message: errorData.message,
        };
      }
      const dataResponse = await res.json();
      return {
        hasError: false,
        message: dataResponse.message,
        data: dataResponse.data,
      };
    } catch (error) {
      return {
        hasError: true,
        message: "Erro ao fazer a consulta",
      };
    }
  }
  public async getMyEbooks(page: number, only = false) {
    try {
      const res = await fetch(
        `${server}/ebook?page=${page}&limit=${20}&only=${only}`,
        {
          headers: {
            authorization: `BEARER ${this.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        const errorData = await res.json();
        return {
          hasError: true,
          message: errorData.message,
          lastPage: 1,
        };
      }
      const dataResponse = await res.json();
      console.log(dataResponse);
      return {
        hasError: false,
        message: dataResponse.message,
        data: dataResponse.data,
        lastPage: dataResponse.lastPage,
      };
    } catch (error) {
      return {
        hasError: true,
        message: "Erro ao fazer a consulta",
      };
    }
  }
  public async getEbookDetails(id: string) {
    try {
      const res = await fetch(`${server}/ebook/${id}`, {
        headers: {
          authorization: `BEARER ${this.token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        return {
          hasError: true,
          message: errorData.message,
        };
      }
      const dataResponse = await res.json();
      return {
        hasError: false,
        message: dataResponse.message,
        data: dataResponse.data,
      };
    } catch (error) {
      return {
        hasError: true,
        message: "Erro ao fazer a consulta",
      };
    }
  }
  public async updateEbook(id: string, data: CreateEbookDto) {
    try {
      const res = await fetch(`${server}/ebook/${id}`, {
        method: "PATCH",
        headers: {
          authorization: `BEARER ${this.token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        return {
          hasError: true,
          message: errorData.message,
        };
      }
      const dataResponse = await res.json();
      return {
        hasError: false,
        message: dataResponse.message,
        data: dataResponse.data,
      };
    } catch (error) {
      return {
        hasError: true,
        message: "Erro ao fazer a consulta",
      };
    }
  }
  public async deleteEbook(id: string) {
    try {
      const res = await fetch(`${server}/ebook/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `BEARER ${this.token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        return {
          hasError: true,
          message: errorData.message,
        };
      }
      const dataResponse = await res.json();
      return {
        hasError: false,
        message: dataResponse.message,
        data: dataResponse.data,
      };
    } catch (error) {
      return {
        hasError: true,
        message: "Erro ao fazer a consulta",
      };
    }
  }
}
