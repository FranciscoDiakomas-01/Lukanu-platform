import server from "../server";

export class PurchaserviceClient {
  constructor(private readonly token: string) {}
  public async createPayment(data: {
    ebookId: number;
    affCode?: string;
    fileUrl: string;
    ownerId: number;
    digital: boolean;
  }) {
    try {
      const res = await fetch(`${server}/purchase`, {
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
          message: errorData.message || "Erro ao criar pagamento",
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
        message: "Erro ao fazer a requisição",
      };
    }
  }
  public async getMypurchase(page: number, limit = 20) {
    try {
      const res = await fetch(
        `${server}/purchase?page=${page}&limit=${limit}`,
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
          message: errorData.message || "Erro ao buscar pagamentos",
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
        myId: dataResponse.myId,
        stats: dataResponse.stats,
      };
    } catch (error) {
      return {
        hasError: true,
        message: "Erro ao fazer a consulta",
      };
    }
  }
  public async updatePayment(id: string, data: any) {
    try {
      const res = await fetch(`${server}/purchase/${id}`, {
        method: "PATCH",
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
          message: errorData.message || "Erro ao atualizar pagamento",
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
        message: "Erro ao fazer a requisição",
      };
    }
  }
  public async createWidthDraw(data: { amount: number }) {
    try {
      const res = await fetch(`${server}/withdral`, {
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
          message: errorData.message || "Erro ao criar pagamento",
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
        message: "Erro ao fazer a requisição",
      };
    }
  }
  public async getMyWidthDrawl(page: number, limit = 20) {
    try {
      const res = await fetch(
        `${server}/withdral?page=${page}&limit=${limit}`,
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
          message: errorData.message || "Erro ao buscar pagamentos",
          lastPage: 1,
        };
      }
      const dataResponse = await res.json();
      console.log(dataResponse);
      return {
        hasError: false,
        message: dataResponse.message,
        data: dataResponse.data,
        lastPage: dataResponse.lastPage == 0 ? 1 : dataResponse.lastPage,
      };
    } catch (error) {
      return {
        hasError: true,
        message: "Erro ao fazer a consulta",
      };
    }
  }
}
