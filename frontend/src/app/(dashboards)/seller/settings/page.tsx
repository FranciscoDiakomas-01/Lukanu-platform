"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bell, Coins, Loader2, Lock, Settings, User2 } from "lucide-react";
import {
  FormEvent,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import DashordHeader from "@/components/DashordHeader";
import { UserContext } from "@/context/userContext";
import { User } from "@/types/User";
import { useRouter } from "next/navigation";
import UserClientService from "@/service/User";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Checkbox } from "@headlessui/react";

export default function SettingsPage() {
  const { user, setUser } = useContext(UserContext) as {
    user: User;
    setUser(data: User): void;
  };

  const [userUpdatedData, setUserUpdatedData] = useState(user);

  const [credentials, setCedentials] = useState({
    newPassword: "",
    oldPassword: "",
    confirmPassword: "",
  });

  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  function hanldeOnSubmit(e: FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const token = localStorage.getItem("acess");

      if (!token) {
        localStorage.clear();
        router.push("/enter");
        return;
      }
      const data = await new UserClientService(token).updateMyData({
        bank: userUpdatedData.bank as string,
        iban: userUpdatedData.iban?.toUpperCase() as string,
        email: userUpdatedData.email,
        firstName: userUpdatedData.firstName,
        lastName: userUpdatedData.lastName,
      });
      toast.info(data.message);
    });
  }

  function handleOnSubmitPasswordForm(e: FormEvent) {
    e.preventDefault();
    if (
      !credentials.confirmPassword ||
      !credentials.newPassword ||
      !credentials.oldPassword
    ) {
      toast.info("Preenche todos os campos");
      return;
    }
    startTransition(async () => {
      const token = localStorage.getItem("acess");

      if (!token) {
        localStorage.clear();
        router.push("/enter");
        return;
      }
      const data = await new UserClientService(token).updateCredentials({
        confirmNewPassword: credentials.confirmPassword,
        newPassWord: credentials.newPassword,
        odlPassword: credentials.oldPassword,
      });
      toast.info(data.message);
    });
  }

  return (
    <main className="w-full  ">
      <Toaster />
      <DashordHeader whoIs="seller" showInput={false} />

      <Tabs defaultValue="profile" className=" w-full p-6  mt-10 ">
        <TabsList className=" flex-wrap items-start justify-start mb-5 w-full ">
          <TabsTrigger value="profile">
            <User2 size={16} />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock size={16} />
            Segurança
          </TabsTrigger>
        </TabsList>

        {/* Perfil */}
        <TabsContent value="profile" className="space-y-6 pb-20">
          <form className="flex flex-col gap-9" onSubmit={hanldeOnSubmit}>
            <h2 className="text-lg font-semibold">Informações do Perfil</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  value={userUpdatedData.firstName ?? ""}
                  id="name"
                  placeholder="Ex: Francisco"
                  onChange={(e) => {
                    setUserUpdatedData((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }));
                  }}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="lastname">Sobrenome</Label>
                <Input
                  id="lastname"
                  value={userUpdatedData.lastName ?? ""}
                  placeholder="Ex: Diakomas"
                  required
                  onChange={(e) => {
                    setUserUpdatedData((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }));
                  }}
                />
              </div>

              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={userUpdatedData.email ?? ""}
                  placeholder="exemplo@email.com"
                  required
                  onChange={(e) => {
                    setUserUpdatedData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }));
                  }}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="iban">IBAN</Label>
                <Input
                  id="iban"
                  value={userUpdatedData.iban ?? ""}
                  placeholder="Ex: AO06 1234 5678 9012"
                  required
                  onChange={(e) => {
                    setUserUpdatedData((prev) => ({
                      ...prev,
                      iban: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bank">Banco</Label>
                <Input
                  id="bank"
                  value={userUpdatedData.bank ?? ""}
                  placeholder="Nome do banco (ex: BAI)"
                  required
                  onChange={(e) => {
                    setUserUpdatedData((prev) => ({
                      ...prev,
                      bank: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>

            <Button type="submit" className=" w-full" disabled={isPending}>
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Salvar Alterações"
              )}
            </Button>
          </form>
        </TabsContent>
        {/* Segurança */}
        <TabsContent value="security" className="space-y-6  pb-20">
          <form
            onSubmit={handleOnSubmitPasswordForm}
            className="flex flex-col gap-8"
          >
            <h2 className="text-lg font-semibold">Credenciais</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="password">Senha actual</Label>
                <Input
                  id="password"
                  onChange={(e) => {
                    setCedentials((prev) => ({
                      ...prev,
                      oldPassword: e.target.value,
                    }));
                  }}
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Nova senha</Label>
                <Input
                  onChange={(e) => {
                    setCedentials((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }));
                  }}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm">Confirmar senha</Label>
                <Input
                  onChange={(e) => {
                    setCedentials((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }));
                  }}
                  id="confirm"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Label htmlFor="confirm">Mostrar senha</Label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => {
                  setShowPassword((prev) => !prev);
                }}
              />
            </div>
            <Button type="submit" className=" w-full" disabled={isPending}>
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Salvar Alterações"
              )}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </main>
  );
}
