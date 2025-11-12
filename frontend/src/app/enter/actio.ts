"use server";

import AuthService from "@/service/enter";

export async function loginAction(data: FormData) {
  const client = new AuthService();
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  if (!email || !password) {
    return {
      hasError: true,
      message: "Preeche os campos",
    };
  }

  const response = await client.login(email, password);
  return {
    hasError: response?.error,
    ...response,
  } as any;
}

export async function signinAction(data: FormData) {
  const client = new AuthService();
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  const firstname = data.get("name") as string;
  const lastname = data.get("lastname") as string;
  if (!email || !password || !firstname || !lastname) {
    return {
      hasError: true,
      message: "Preeche os campos",
    };
  }

  const response = await client.signin(email, password, firstname, lastname);
  return {
    hasError: response?.error,
    ...response,
  } as any;
}
