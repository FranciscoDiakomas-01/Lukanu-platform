"use client";

import { useEffect, useState } from "react";
import DashordHeader from "../../../../components/DashordHeader";
import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  Coins,
  DollarSign,
  Download,
  HandCoinsIcon,
  Loader2,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Copy, ChevronRight } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Payments } from "@/types/Payments";
import { PurchaserviceClient } from "@/service/Payments";
import { User } from "@/types/User";

export default function PaymentsComponents() {
  const [payments, setPayments] = useState([]);
  const [iban, setIban] = useState("");
  const [load, setIsLoad] = useState(true);
  const myCoins = 10000;
  const [data, setData] = useState<Payments[]>([]);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [lastPage, setLasPage] = useState(1);
  const [userId, setUserId] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem("acess");
    if (!token) {
      localStorage.clear();
      router.push("/enter");
      return;
    }
    async function get() {
      const response = await new PurchaserviceClient(
        token as string
      ).getMypurchase(page);
      if (response.hasError) {
        toast.info(response.message);
      }
      setData(response.data);
      setPayments(response.stats);
      setUserId(response.myId);
      setLasPage(response.lastPage);
    }

    get()
      .then()
      .catch()
      .finally(() => {
        setTimeout(() => {
          setIsLoad(false);
        }, 1000);
      });

    const interval = setInterval(() => {
      get()
        .then()
        .catch()
        .finally(() => {
          setTimeout(() => {
            setIsLoad(false);
          }, 1000);
        });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [page]);

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
    toast.success("Pedido de saque enviado", {
      description: `O valor será enviado para o IBAN: ${iban}`,
    });
  };

  return (
    <main className="w-full pb-20  flex-col min-h-screen flex gap-8">
      <DashordHeader whoIs="seller" showInput={false} />
      {load ? (
        <div className="flex justify-center items-center h-[70dvh] gap-1 opacity-60 scale-80">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          {" "}
          <div className="w-full grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 px-4 gap-4">
            {payments.map((stats, index) => (
              <Stats prop={stats} key={index} />
            ))}
          </div>
       
          <>
            {Array.isArray(data) && data.length > 0 ? (
              <>
                <Table>
                  <TableCaption>Vendas recentes</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Livro</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Pago</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Comprovativo</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((p, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <Badge variant="outline">
                            {p.status == "PAID" ? (
                              <CheckCircle
                                className="text-green-500 mr-1"
                                size={16}
                              />
                            ) : p.status == "PENDING" ? (
                              <Loader2
                                className="text-yellow-500 animate-spin mr-1"
                                size={16}
                              />
                            ) : (
                              <AlertCircle
                                className="text-red-500 mr-1"
                                size={16}
                              />
                            )}

                            {p.status === "PAID"
                              ? "Aprovado"
                              : p.status === "PENDING"
                              ? "Pendente"
                              : "Rejeitado"}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <div className="flex flex-col">
                            {(() => {
                              try {
                                const client = JSON.parse(p.client) as User;
                                return (
                                  <>
                                    <Avatar className="w-10 h-10">
                                      <AvatarImage
                                        src={client.profileUrl}
                                        alt={`@${client.lastName}`}
                                        className="h-10 rounded-full"
                                      />
                                      <AvatarFallback className="uppercase">
                                        {client.firstName?.charAt(0)}{" "}
                                        {client.lastName?.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span>
                                      {client.firstName} {client.lastName}
                                    </span>
                                    <small>{client.email}</small>
                                  </>
                                );
                              } catch (error) {
                                return <p>Sem informação</p>;
                              }
                            })()}
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex flex-col">
                            <img
                              src={p.ebook.coverUrl}
                              className="h-12 w-10 "
                              alt="Livro"
                            />
                            <span>{p.ebook.title?.slice(0, 10)} ...</span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant="outline"
                            className=" bordergre bg-green-500/10 text-green-500"
                          >
                            {p.owner.id == userId ? "Venda" : "Compra"}
                          </Badge>
                        </TableCell>

                        <TableCell>{p.price.toLocaleString("pt")} Kz</TableCell>
                        <TableCell>{p.payed.toLocaleString("pt")} Kz</TableCell>

                        <TableCell>
                          {new Date(p.createdAt).toLocaleTimeString("pt") +
                            " : " +
                            new Date(p.createdAt).toLocaleDateString("pt")}{" "}
                        </TableCell>
                        <TableCell>
                          <Button asChild variant={"secondary"}>
                            <a href={p.fileUrl} target="_blank">
                              Compravativo
                            </a>
                          </Button>
                        </TableCell>

                        {p.status == "PAID" && p.owner.id == userId ? (
                          <TableCell>
                            <Button asChild>
                              <a
                                href={p.ebook.fileURl}
                                target="_blank"
                                download
                              >
                                Baixar <Download />
                              </a>
                            </Button>
                          </TableCell>
                        ) : (
                          <TableCell className="text-sm text-muted">
                            Sem acções
                          </TableCell>
                        )}
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
              </>
            ) : (
              <p className="text-center mt-5 ">Sem vendas realizadas</p>
            )}
          </>
        </>
      )}
    </main>
  );
}
