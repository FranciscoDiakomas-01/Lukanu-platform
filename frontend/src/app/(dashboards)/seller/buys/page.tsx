"use client";

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

import ebook from "@/assets/ebook.png";
import { MyEbooksBuy } from "@/types/ebook";
import {
  AlertCircle,
  CheckCircle,
  Copy,
  DollarSign,
  Download,
  FileText,
  HandCoinsIcon,
  Loader,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { toast } from "sonner";
import DashordHeader from "@/components/DashordHeader";
import Stats from "@/components/Stats";
export default function Mybuys() {
  const [myEbooks, setMyEbooks] = useState<MyEbooksBuy[]>([]);
  const [isLoad, setIsLoad] = useState(true);
  const [payments, setPayments] = useState([
    {
      title: "Total Compras",
      description: "total de ebooks criados por min",
      value: 4,
      icon: <DollarSign className="text-amber-500" size={22} />,
      isCoin: false,
    },
    {
      title: "Compras confirmadas",
      description: "total de ebooks criados por min",
      value: 4,
      icon: <HandCoinsIcon className="text-blue-500" size={22} />,
      isCoin: false,
    },
    {
      title: "Compras Pendentes",
      description: "total de ebooks criados por min",
      value: 4,
      icon: <DollarSign className="text-green-500" size={22} />,
      isCoin: false,
    },
  ]);
  useEffect(() => {
    setIsLoad(true);
    setMyEbooks([
      {
        id: 1,
        price: 49.9,
        cover: ebook,
        title: "Dominando o TypeScript",
        category: "Programação",
        status: "1",
        sells: 120,
        createdAt: new Date("2024-03-01T10:00:00"),
        updatedAt: new Date("2024-06-15T12:30:00"),
        type: "2",
      },
      {
        id: 2,
        price: 29.9,
        cover: ebook,
        title: "React Avançado com Hooks e Context",
        category: "Front-end",
        status: "2",
        sells: 85,
        createdAt: new Date("2024-01-12T09:45:00"),
        updatedAt: new Date("2024-07-05T14:00:00"),
        type: "1",
      },
      {
        id: 3,
        price: 0,
        cover: ebook,
        title: "Linux Essencial para Desenvolvedores",
        category: "Sistemas Operacionais",
        status: "3",
        sells: 0,
        createdAt: new Date("2023-12-10T08:00:00"),
        updatedAt: new Date("2024-04-22T10:20:00"),
        type: "1",
      },
    ]);
    setTimeout(() => {
      setIsLoad(false);
    }, 2500);
  }, []);

  return (
    <main className="w-full pb-20  flex-col min-h-screen flex gap-4">
      <DashordHeader whoIs={"seller"} showInput={false} />
      <>
        {isLoad ? (
          <Table>
            <TableCaption>Lista dos meus Livros</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Código</TableHead>
                <TableHead className="w-[130px]">Estado</TableHead>
                <TableHead className="w-[130px]">Vendas</TableHead>
                <TableHead>Livro</TableHead>
                <TableHead>Capa</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead className="text-right w-[130px]">Detalhes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <Skeleton key={index} className="h-5 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton key={index} className="h-5 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton key={index} className="h-5 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton key={index} className="h-5 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton key={index} className="h-5 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton key={index} className="h-5 w-full" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton key={index} className="h-5 w-full" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter className="w-full">
              <TableRow>
                <TableCell colSpan={6}>Total</TableCell>
                <TableCell className="text-right">
                  {Number(myEbooks.length)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        ) : (
          <>
            <div className="w-full grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 px-4 gap-4">
              {payments.map((stats, index) => (
                <Stats prop={stats} key={index} />
              ))}
            </div>
            {Array.isArray(myEbooks) && myEbooks.length > 0 ? (
              <Table>
                <TableCaption>Lista das minha compras</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Código</TableHead>
                    <TableHead className="w-[130px]">Estado</TableHead>
                    <TableHead className="w-[130px]">Vendas</TableHead>
                    <TableHead>Livro</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Capa</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead className="text-right w-[130px]">
                      Detalhes
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="">
                  {myEbooks.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <Badge
                          variant={"outline"}
                          onClick={() => {
                            toast.success(`Código copiado #${item.id}`, {
                              description:
                                "Código do seu livro foi copiado para área de transferência",
                            });
                          }}
                        >
                          <Copy />
                          {item.id}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={"outline"}>
                          {item.status == "1" ? (
                            <CheckCircle className="text-green-500" />
                          ) : item.status == "2" ? (
                            <Loader />
                          ) : (
                            <AlertCircle className="text-red-500" />
                          )}
                          {item.status == "1"
                            ? "Aprovado"
                            : item.status == "2"
                            ? "Pendente"
                            : "Rejeitado"}
                        </Badge>
                      </TableCell>
                      <TableCell>{Number(item.sells)}</TableCell>
                      <TableCell>{item.title?.slice(0, 20)} </TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        <Badge variant={"outline"} className="w-[85px] gap-1">
                          {item.status == "1" ? (
                            <FileText className="text-green-500" />
                          ) : (
                            <AlertCircle className="text-amber-500" />
                          )}
                          {item.type == "1" ? "Digital" : "Impresso"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Image
                          className="h-8 w-9 object-cover"
                          src={item.cover}
                          alt={item.title}
                        />
                      </TableCell>
                      <TableCell>
                        {Number(item.price).toLocaleString("pt")} kz
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant={"outline"}
                          disabled={item.status != "1"}
                        >
                          <Download size={18} /> Baixar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

                <TableFooter className="w-full">
                  <TableRow>
                    <TableCell colSpan={8}>Total</TableCell>
                    <TableCell className="text-right">
                      {Number(myEbooks.length)}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            ) : (
              <div>
                <h1>Você ainda não comprou nenhum ebook</h1>
              </div>
            )}
          </>
        )}
      </>
    </main>
  );
}
