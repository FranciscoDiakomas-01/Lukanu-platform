"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bell, Coins, Lock, Settings, User2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import DashordHeader from "@/components/DashordHeader";
import { UserContext } from "@/context/userContext";
import { User } from "@/types/User";

export default function SettingsPage() {
  const { user, setUser } = useContext(UserContext) as {
    user: User;
    setUser(data: User): void;
  };
  return (
    <main className="w-full  ">
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
          <h2 className="text-lg font-semibold">Informações do Perfil</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                value={user.firstName}
                id="name"
                placeholder="Ex: Francisco"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lastname">Sobrenome</Label>
              <Input
                id="lastname"
                value={user.lastName}
                placeholder="Ex: Diakomas"
              />
            </div>

            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                placeholder="exemplo@email.com"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="iban">IBAN</Label>
              <Input
                id="iban"
                value={user.iban}
                placeholder="Ex: AO06 1234 5678 9012"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bank">Banco</Label>
              <Input
                id="bank"
                value={user.bank}
                placeholder="Nome do banco (ex: BAI)"
              />
            </div>
          </div>

          <Button className=" w-full">Salvar Alterações</Button>
        </TabsContent>
        {/* Segurança */}
        <TabsContent value="security" className="space-y-6  pb-20">
          <h2 className="text-lg font-semibold">Alterar Senha</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="password">Senha actual</Label>
              <Input id="password" type="password" placeholder="********" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Nova senha</Label>
              <Input id="password" type="password" placeholder="********" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm">Confirmar senha</Label>
              <Input id="confirm" type="password" placeholder="********" />
            </div>
          </div>
          <Button className=" w-full">Salvar Alterações</Button>
        </TabsContent>
      </Tabs>
    </main>
  );
}
