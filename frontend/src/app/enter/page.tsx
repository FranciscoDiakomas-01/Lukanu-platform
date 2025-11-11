"use client";
import logo from "@/assets/logo.png";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, Loader2, MessageCircleCode } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("acessToken");
    if (token) {
      router.push("/seller");
      return;
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div className=" bg-[#000a10] flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      {loading ? (
        <div className="text-white flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <span>
          <Card className="flex w-full bg-transparent text-white border border-white/10">
            <div className="flex justify-center items-center flex-col gap-1">
              <Image src={logo} alt="logo" className="h-10 w-10" />
              <h1>Lukanu</h1>
              <small className="text-muted opacity-50">Livros que mudam destinos</small>
            </div>
            <Tabs defaultValue="login" className="min-w-[400px] p-3">
              <TabsList className="bg-white/1 border justify-center items-center place-self-center border-white/10">
                <TabsTrigger
                  value="login"
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
                <form action="" className="mt-6 flex flex-col gap-1">
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
                    <Input
                      required
                      className="border border-white/10"
                      type="password"
                      placeholder="******"
                      name="password"
                    />
                  </span>

                  <Button className="w-full">Acessar conta</Button>
                </form>
              </TabsContent>
              <TabsContent value="signin">
                <form action="" className="mt-6 flex flex-col gap-1">
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
                    <Input
                      required
                      className="border border-white/10"
                      type="password"
                      placeholder="******"
                      name="password"
                    />
                  </span>

                  <Button>Criar conta</Button>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </span>
      )}
    </div>
  );
}
