import server from "../server";
import z from "zod";

const loginSchema = z.object({
  email: z
    .email({
      message: "Email inválido",
    })
    .nonempty(),
  password: z.string().nonempty(),
});

const signInSchema = z.object({
  email: z
    .email({
      message: "Email inválido",
    })
    .nonempty(),
  password: z.string().min(8, {
    message: "Senha precisa conter no  mínimo 8 carácteres",
  }),
  firsname: z.string().nonempty(),
  lastname: z.string().nonempty(),
});

export default class AuthService {
  async login(email: string, password: string) {
    const data = {
      email,
      password,
    };
    try {
      loginSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          error: true,
          message: error?.issues[0].message,
        };
      }
    }
    try {
      const loginRes = await fetch(`${server}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const loginData = await loginRes.json();
      return {
        data: loginData,
      };
    } catch (error) {
      return {
        error: true,
        message: "Vefifique a sua conexão com a internet",
      };
    }
  }
  async signin(
    email: string,
    password: string,
    firsname: string,
    lastname: string
  ) {
    const data = {
      email,
      password,
      firsname,
      lastname,
    };
    try {
      signInSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          error: true,
          message: error?.issues[0].message,
        };
      }
    }
    try {
      const loginRes = await fetch(`${server}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstName: data.firsname,
          lastName: data.lastname,
        }),
      });
      const loginData = await loginRes.json();
      return {
        data: loginData,
      };
    } catch (error) {
      return {
        error: true,
        message: "Vefifique a sua conexão com a internet",
      };
    }
  }
}
