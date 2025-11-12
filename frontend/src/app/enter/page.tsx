"use client";
import logo from "@/assets/logo.png";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginAction, signinAction } from "./actio";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showPassword, setShworPasword] = useState(false);

  const { theme } = useTheme();
  useEffect(() => {
    const token = localStorage.getItem("acess");
    const role = localStorage.getItem("role");
    if (token && role) {
      router.push(role == "ADMIN" ? "/admin" : "/seller");
      setLoading(false);
      return;
    } else {
      localStorage.clear();
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const [isPending, startTransition] = useTransition();
  const [currentTab, setCurrentTab] = useState("login");
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      let res: any;
      if (currentTab == "login") {
        res = await loginAction(formData);
      } else {
        res = await signinAction(formData);
      }
      if (res?.hasError) {
        toast.error(res?.message ?? res?.error);
        return;
      }
      if (res?.data?.acessToken) {
        localStorage.setItem("acess", res?.data?.acessToken);
        localStorage.setItem("role", res?.data?.role);
        router.push("/seller");
        return;
      } else {
        const apiMessage = Array.isArray(res?.data?.message)
          ? res?.data?.message[0]
          : res?.data?.message;
        toast.error(res?.message ?? apiMessage);
        return;
      }
    });
  }
  return (
    <div className=" bg-[#000a10] flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <Toaster
        className="z-[9999999999999999]"
        theme={theme == "dark" ? "dark" : "light"}
      />
      {loading ? (
        <div className="text-white flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <span className="w-full flex justify-center items-center">
          <Card className="flex  bg-transparent text-white border-none lg:w-[400px] w-[98%]">
            <div className="flex justify-center items-center flex-col gap-1">
              <Image src={logo} alt="logo" className="h-10 w-10" />
              <h1>Lukanu</h1>
              <small className="opacity-50">Livros que mudam destinos</small>
            </div>
            <Tabs defaultValue="login" className=" p-3">
              <TabsList className="bg-white/1 border justify-center items-center place-self-center border-white/10">
                <TabsTrigger
                  value="login"
                  onClick={() => {
                    setCurrentTab("login");
                  }}
                  className=" data-[state=active]:bg-primary  text-white"
                >
                  Acessar conta
                </TabsTrigger>
                <TabsTrigger
                  value="signin"
                  className="data-[state=active]:bg-primary  text-white"
                >
                  Criar conta
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form
                  onSubmit={handleSubmit}
                  className="mt-6 flex flex-col gap-1"
                >
                  <CardTitle className="my-6">Benvindo de volta</CardTitle>
                  <span className="flex flex-col gap-3 relative my-2">
                    <Label>Email</Label>
                    <Input
                      required
                      className="border border-white/10"
                      placeholder="seuemail@gmail.com"
                      type="email"
                      name="email"
                    />
                  </span>
                  <span className="flex flex-col gap-3 relative my-2">
                    <Label>Senha</Label>
                    <Button
                      type="button"
                      onClick={() => {
                        setShworPasword((prev) => !prev);
                      }}
                      variant={"ghost"}
                      className="absolute bottom-0 right-0 hover:bg-transparent hover:text-white "
                    >
                      {showPassword ? <Eye /> : <EyeClosed />}
                    </Button>
                    <Input
                      required
                      className="border border-white/10"
                      type={showPassword ? "text" : "password"}
                      placeholder="******"
                      name="password"
                    />
                  </span>

                  <Button type="submit" disabled={isPending} className="w-full">
                    {isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      " Acessar conta"
                    )}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent
                value="signin"
                onClick={() => {
                  setCurrentTab("signin");
                }}
              >
                <form
                  onSubmit={handleSubmit}
                  className="mt-6 flex flex-col gap-1"
                >
                  <CardTitle className="my-2">Benvindo a Lukanu</CardTitle>
                  <CardDescription className="mb-4">
                    A única plataforma angolana que disponibliza venda de ebooks
                  </CardDescription>
                  <span className="flex flex-col gap-3 relative my-2">
                    <Label>Nome</Label>
                    <Input
                      required
                      className="border border-white/10"
                      placeholder="seu nome"
                      type="text"
                      name="name"
                    />
                  </span>

                  <span className="flex flex-col gap-3 relative my-2">
                    <Label>Sobrenome</Label>
                    <Input
                      required
                      className="border border-white/10"
                      placeholder="seu sobrenome"
                      type="text"
                      name="lastname"
                    />
                  </span>
                  <span className="flex flex-col gap-3 relative my-2">
                    <Label>Email</Label>
                    <Input
                      required
                      className="border border-white/10"
                      placeholder="seuemail@gmail.com"
                      type="email"
                      name="email"
                    />
                  </span>
                  <span className="flex flex-col gap-3 relative my-2">
                    <Label>Senha</Label>
                    <Button
                      type="button"
                      onClick={() => {
                        setShworPasword((prev) => !prev);
                      }}
                      variant={"ghost"}
                      className="absolute bottom-0 right-0 hover:bg-transparent hover:text-white "
                    >
                      {showPassword ? <Eye /> : <EyeClosed />}
                    </Button>
                    <Input
                      required
                      className="border border-white/10"
                      type={showPassword ? "text" : "password"}
                      placeholder="******"
                      name="password"
                    />
                  </span>

                  <Button type="submit" disabled={isPending} className="w-full">
                    {isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Criar conta"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </span>
      )}
    </div>
  );
}
