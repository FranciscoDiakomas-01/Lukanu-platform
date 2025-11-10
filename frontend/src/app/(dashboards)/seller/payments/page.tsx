"use client";

import { useEffect, useState } from "react";
import DashordHeader from "../../../../components/DashordHeader";
import {
  BookOpenIcon,
  CheckCircle,
  Coins,
  DollarSign,
  FileText,
  HandCoinsIcon,
  Loader,
  Verified,
} from "lucide-react";
import Stats from "@/components/Stats";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import PaymentsTable from "./table";
export default function Payments() {
  const [payments, setPayments] = useState([
    {
      title: "Total Vendas",
      description: "total de ebooks criados por min",
      value: 4,
      icon: <DollarSign className="text-amber-500" size={22} />,
      isCoin: false,
    },
    {
      title: "Vendas confirmadas",
      description: "total de ebooks criados por min",
      value: 4,
      icon: <HandCoinsIcon className="text-blue-500" size={22} />,
      isCoin: false,
    },
    {
      title: "Vendas Pendentes",
      description: "total de ebooks criados por min",
      value: 4,
      icon: <DollarSign className="text-green-500" size={22} />,
      isCoin: false,
    },
    {
      title: "Saldo Actual",
      description: "total de ebooks criados por min",
      value: 4000,
      icon: <Coins className="text-amber-500" size={22} />,
      isCoin: true,
    },
    {
      title: "Total Produtos",
      description: "total de ebooks criados por min",
      value: 4000,
      icon: <Coins className="text-blue-500" size={22} />,
      isCoin: false,
    },
  ]);
  const [iban, setIban] = useState("");
  const [load, setIsLoad] = useState(true);

  const myCoins = 10000;

  useEffect(() => {
    setTimeout(() => {
      setIsLoad(false);
    }, 1000);
  }, []);

  const handleSaque = () => {
    if (!iban) {
      toast.error("IBAN obrigatório", {
        description: "Por favor, insira um IBAN válido antes de continuar.",
      });
      return;
    }

    if (myCoins < 50000) {
      toast.info("Saldo insuficiente", {
        description: "Você precisa de pelo menos 50.000,00 Kz para sacar.",
      });
      return;
    }

    // Aqui você pode fazer a requisição de saque
    toast.success("Pedido de saque enviado", {
      description: `O valor será enviado para o IBAN: ${iban}`,
    });
  };

  return (
    <main className="w-full pb-20  flex-col min-h-screen flex gap-4">
      <DashordHeader  whoIs="seller" showInput={false} />
      {load ? (
        <div className="flex justify-center items-center h-[70dvh] gap-1 opacity-60 scale-80">
          <Loader className="animate-spin" /> Carregando
        </div>
      ) : (
        <>
          {" "}
          <div className="w-full grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 px-4 gap-4">
            {payments.map((stats, index) => (
              <Stats prop={stats} key={index} />
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-3 lg:w-[30%] px-4">
            <Button>Relatório</Button>
            <AlertDialog>
              <Button variant={"outline"} asChild>
                <AlertDialogTrigger>Sacar</AlertDialogTrigger>
              </Button>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmar saque via IBAN</AlertDialogTitle>
                  <AlertDialogDescription>
                    Insira o seu IBAN para receber o valor. O valor mínimo para
                    saque é de <strong>50.000,00 Kz</strong>. Confirme os dados
                    antes de prosseguir.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="py-4">
                  <label className="block text-sm font-medium mb-1">IBAN</label>
                  <Input
                    type="text"
                    placeholder="Ex: AO06004400000123456789012"
                    value={iban}
                    onChange={(e) => setIban(e.target.value)}
                  />
                </div>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={(e) => {
                      e.preventDefault();
                      handleSaque();
                    }}
                  >
                    Confirmar Saque
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <PaymentsTable />
        </>
      )}
    </main>
  );
}




