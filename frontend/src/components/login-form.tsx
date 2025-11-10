"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  return (
    <div className={cn("flex  flex-col gap-6", className)} {...props}>
      <Card className="bg-[#000a10] border-white/10 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-white">
            Bem vindo de volta
          </CardTitle>
          <CardDescription>
            Venda e desfrute da literatura mundial
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className=" after:border-white/10 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-primary text-white relative z-10 px-2">
                  Lukanu
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="border-white/10"
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Esqueci minha senha?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    className="border-white/10"
                    required
                  />
                </div>
                <div className="grid lg:grid-cols-2 gap-4">
                  <Button
                    onClick={() => {
                      router.push("/seller");
                    }}
                    type="submit"
                    className="w-full"
                  >
                    Entrar
                  </Button>{" "}
                  <Button
                    onClick={() => {
                      router.push("/");
                    }}
                    type="reset"
                    variant={"outline"}
                    className="w-full  bg-transparent border-white/10"
                  >
                    Voltar
                  </Button>
                </div>
              </div>
              <div className="text-center text-sm">
                Não tem conta?{" "}
                <a href="#" className="underline underline-offset-4">
                  Criar conta
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Ao clicar em continuar, você concorda com os nossos{" "}
        <a href="#">Termos de Serviço</a> e com a nossa{" "}
        <a href="#">Política de Privacidade</a> da Lukanu.
      </div>
    </div>
  );
}
