"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bell, Coins, Lock, Settings, User } from "lucide-react";
import { useEffect, useState } from "react";
import DashordHeader from "@/components/DashordHeader";

export default function SettingsPage() {
  const [emailNotify, setEmailNotify] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    const html = document.documentElement;
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      html.classList.add("dark");
      setDarkMode(true);
    } else {
      html.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);
  return (
    <main className="w-full  ">
      <DashordHeader whoIs="teacher" showInput={false} />
      <div className="flex items-center gap-2 my-6  w-full px-6">
        <Settings className="text-muted-foreground" />
        <h1 className="text-xl font-semibold">Configurações da Conta</h1>
      </div>

      <Tabs defaultValue="profile" className=" w-full px-6 ">
        <TabsList className=" flex-wrap items-start h-auto justify-start mb-12">
          <TabsTrigger value="profile">
            <User className="mr-2" size={16} />
            Perfil
          </TabsTrigger>

          <TabsTrigger value="preferences">
            <Bell className="mr-2" size={16} />
            Preferências
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="mr-2" size={16} />
            Segurança
          </TabsTrigger>
        </TabsList>

        {/* Perfil */}
        <TabsContent value="profile" className="space-y-6">
          <h2 className="text-lg font-semibold">Informações do Perfil</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Ex: Francisco" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lastname">Sobrenome</Label>
              <Input id="lastname" placeholder="Ex: Diakomas" />
            </div>

            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="exemplo@email.com" />
            </div>

            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" type="tel" placeholder="+244 999 999 999" />
            </div>

            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="avatar">Foto de Perfil</Label>
              <Input id="avatar" type="file" accept="image/*" />
              <small className="text-muted-foreground">
                Escolha uma imagem nítida. JPG ou PNG até 2MB.
              </small>
            </div>

            <div className="flex items-center justify-between sm:col-span-2 mt-2">
              <div className="flex flex-col">
                <Label className="font-medium">
                  Exibir perfil publicamente
                </Label>
                <span className="text-muted-foreground text-sm">
                  Permite que outros usuários visualizem seu perfil e livros.
                </span>
              </div>
              <Switch />
            </div>
          </div>

          <Button className="mt-4">Salvar Alterações</Button>
        </TabsContent>

        {/* Preferências */}
        <TabsContent value="preferences" className="space-y-6">
          <h2 className="text-lg font-semibold">Notificações e Aparência</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Receber e-mails de atividades</p>
              <p className="text-sm text-muted-foreground">
                Ser notificado sobre novas vendas, saques e mensagens.
              </p>
            </div>
            <Switch checked={emailNotify} onCheckedChange={setEmailNotify} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Modo escuro</p>
              <p className="text-sm text-muted-foreground">
                Ative o modo escuro para uma melhor experiência visual.
              </p>
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={() => {
                const html = document.documentElement;
                const theme = localStorage.getItem("theme");
                if (theme === "dark") {
                  html.classList.remove("dark");
                  localStorage.setItem("theme", "light");
                  setDarkMode(false);
                } else {
                  html.classList.add("dark");
                  localStorage.setItem("theme", "dark");
                  setDarkMode(true);
                }
              }}
            />
          </div>
        </TabsContent>

        {/* Segurança */}
        <TabsContent value="security" className="space-y-6">
          <h2 className="text-lg font-semibold">Alterar Senha</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="password">Nova senha</Label>
              <Input id="password" type="password" placeholder="********" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm">Confirmar senha</Label>
              <Input id="confirm" type="password" placeholder="********" />
            </div>
          </div>
          <Button className="mt-4">Atualizar Senha</Button>
        </TabsContent>
      </Tabs>
    </main>
  );
}
