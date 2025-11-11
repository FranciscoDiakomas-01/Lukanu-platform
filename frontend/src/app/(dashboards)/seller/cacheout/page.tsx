"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  FormEvent,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import {
  Banknote,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  ChevronRight,
  ChevronLeft,
  Download,
} from "lucide-react";
import { format } from "date-fns";
import DashordHeader from "@/components/DashordHeader";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserContext, UserContextType } from "@/context/userContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Stats from "@/components/Stats";
import { PurchaserviceClient } from "@/service/Payments";
import { toast } from "sonner";
import { WidthDrwal } from "@/types/Withdral";
import useIsAdmin from "@/hooks/useIsAdmin";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
export default function WithdrawalHistory() {
  const [loading, setLoading] = useState(true);
  const [withdrawals, setWithdrawals] = useState<WidthDrwal[]>([]);
  const [ammount, setAmmount] = useState(1000);
  const [isPending, starttrantotion] = useTransition();
  const { isAdmin, role } = useIsAdmin();
  const { user } = useContext(UserContext) as UserContextType;
  const [page, setPage] = useState(1);
  const [lastPage, setLasPage] = useState(1);
  useEffect(() => {
    async function get() {
      const token = localStorage.getItem("acess") as string;
      const data = await new PurchaserviceClient(token).getMyWidthDrawl(page);
      setWithdrawals(data.data);
      setLasPage(data.lastPage);
    }

    get()
      .then()
      .catch()
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });

    const interval = setInterval(() => {
      get()
        .then()
        .catch()
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        });
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [page]);

  function handleOnSubmit(e: FormEvent) {
    e.preventDefault();

    starttrantotion(async () => {
      const token = localStorage.getItem("acess") as string;
      if (ammount < 1_000) {
        toast.warning("Valor mínimo 1.000.00 kz");
        return;
      }
      const data = await new PurchaserviceClient(token).createWidthDraw({
        amount: ammount,
      });
      toast.info(data.message);
    });
  }
  return (
    <main className="w-full  pb-20 flex flex-col gap-5">
      <DashordHeader whoIs="seller" showInput={false} />
      <span className="grid md:grid-cols-2 gap-3 px-2 my-4">
        <Stats
          prop={{
            title: "Saldo",
            isCoin: true,
            value: user?.totalAvaliable ?? 0,
            description: "Valor disponível para saque",
          }}
        />

        <Stats
          prop={{
            title: "Facturamento",
            isCoin: true,
            value: user?.totalErned ?? 0,
            description: "Valor feito na plataforma",
          }}
        />

        <Stats
          prop={{
            title: "Saque efectuado",
            isCoin: true,
            value: user?.totalTaked ?? 0,
            description: "Total de valores sacado por mim",
          }}
        />
      </span>
      <Sheet>
        <Button asChild className="ml-3 w-20">
          <SheetTrigger>Sacar</SheetTrigger>
        </Button>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Registro de saque</SheetTitle>
            <SheetDescription>
              Informe o montante para saque , lembrando que <b>1.000.00 Kz</b> é
              um valor mínimo de saque
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleOnSubmit} className="flex flex-col gap-3 px-3">
            <Input
              placeholder="Valor de saque"
              min={1000}
              onChange={(e) => {
                setAmmount(+e.target.value);
              }}
              value={ammount}
              required
            />
            <Button className="w-full">
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>Sacar {ammount.toFixed(2)} kz </>
              )}
            </Button>
          </form>
        </SheetContent>
      </Sheet>
      <div className="px-2 w-full flex flex-col gap-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Valor</TableHead>
              {isAdmin && <TableHead>Usuário</TableHead>}
              <TableHead>Status</TableHead>
              <TableHead>Banco</TableHead>
              <TableHead>IBAN</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>{isAdmin ? "Acções" : "Comprovativo"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: 9 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-4 w-[40px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[70px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[90px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[80px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[120px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[100px]" />
                    </TableCell>
                  </TableRow>
                ))
              : withdrawals.map((withdrawal) => (
                  <TableRow key={withdrawal.id}>
                    <TableCell className="font-medium">
                      #{withdrawal.id}
                    </TableCell>
                    <TableCell>
                      {withdrawal.amount.toLocaleString("pt")} Kz
                    </TableCell>

                    {isAdmin && (
                      <TableCell>
                        <span className="flex flex-col gap-1">
                          <Avatar className="w-10 h-10">
                            <AvatarImage
                              src={withdrawal.user.profileUrl}
                              alt={`@${withdrawal.user.lastName}`}
                              className="h-10 rounded-full"
                            />
                            <AvatarFallback className="uppercase">
                              {withdrawal.user.firstName?.charAt(0)}{" "}
                              {withdrawal.user.lastName?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span>
                            {withdrawal.user.firstName}{" "}
                            {withdrawal.user.lastName}
                          </span>
                          <small>{withdrawal.user.email}</small>
                        </span>
                      </TableCell>
                    )}
                    <TableCell>
                      <Badge
                        variant={
                          withdrawal.status === "ACTIVED"
                            ? "success"
                            : withdrawal.status === "PENDING"
                            ? "outline"
                            : ("destructive" as any)
                        }
                        className="flex items-center gap-1"
                      >
                        {withdrawal.status === "ACTIVED" && (
                          <>
                            <CheckCircle2
                              className="text-green-500"
                              size={14}
                            />{" "}
                            Aprovado
                          </>
                        )}
                        {withdrawal.status === "PENDING" && (
                          <>
                            <Clock className="text-amber-500 " size={14} />{" "}
                            Pendente
                          </>
                        )}
                        {withdrawal.status === "DESACTIVED" && (
                          <>
                            <XCircle size={14} /> Rejeitado
                          </>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell>{withdrawal.user?.bank ?? "..."}</TableCell>
                    <TableCell className="text-sm">
                      {withdrawal.user?.iban ?? "..."}
                    </TableCell>
                    <TableCell className="text-sm">
                      <h1>
                        {new Date(withdrawal.createdAt).toLocaleTimeString(
                          "pt",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </h1>

                      <span>
                        {new Date(withdrawal.createdAt).toLocaleDateString(
                          "pt",
                          {
                            weekday: "long",
                            day: "2-digit", // 22
                            month: "long", // novembro
                            year: "numeric", // 2025
                          }
                        )}
                      </span>
                    </TableCell>

                    <TableCell>
                      {isAdmin ? (
                        <span>
                          <Button disabled={withdrawal.status != "PENDING"}>
                            Aprovar
                          </Button>
                          <Button disabled={withdrawal.status != "PENDING"}>
                            Reprovar
                          </Button>
                        </span>
                      ) : (
                        <>
                          {withdrawal.status == "ACTIVED" && withdrawal.file ? (
                            <Button asChild>
                              <Link href={withdrawal.file}>
                                <Download /> Baixar
                              </Link>
                            </Button>
                          ) : (
                            <span>Sem acção</span>
                          )}
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>

        <span className="flex items-center justify-between">
          <span>{page + " de " + lastPage}</span>
          <span className="space-x-2 pr-5">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              disabled={page === lastPage}
              onClick={() => setPage(page + 1)}
            >
              <ChevronRight />
            </Button>
          </span>
        </span>
      </div>
    </main>
  );
}
