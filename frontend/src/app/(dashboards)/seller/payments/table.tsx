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
import {
  AlertCircle,
  CheckCircle,
  Copy,
  Eye,
  EllipsisVertical,
  Loader,
  Trash,
} from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Payment } from "@/types/payments";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { paymentsMock } from "@/constants/mocks/payments.mock";
export default function PaymentsTable() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoad, setIsLoad] = useState(true);
  useEffect(() => {
    setIsLoad(true);
    setPayments(paymentsMock);
    setTimeout(() => {
      setIsLoad(false);
    }, 2000);
  }, []);

  return (
    <>
      {isLoad ? (
        <Table>
          <TableCaption>Pagamentos recentes</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Livro</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Comprovativo</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                {[...Array(8)].map((__, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <>
          {" "}
          <Table>
            <TableCaption>Pagamentos recentes</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Livro</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Comprovativo</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((p, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Badge
                      variant="outline"
                      onClick={() => {
                        toast.success(`Código copiado #${p.id}`);
                      }}
                    >
                      <Copy className="mr-1" size={14} />
                      {p.id}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline">
                      {p.status === "2" ? (
                        <CheckCircle
                          className="text-green-500 mr-1"
                          size={16}
                        />
                      ) : p.status === "1" ? (
                        <Loader
                          className="text-yellow-500 animate-spin mr-1"
                          size={16}
                        />
                      ) : (
                        <AlertCircle className="text-red-500 mr-1" size={16} />
                      )}
                      {p.status === "2"
                        ? "Aprovado"
                        : p.status === "1"
                        ? "Pendente"
                        : "Rejeitado"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={p.client.profil} alt={`@${p.client.name}`} />
                        <AvatarFallback className="uppercase">
                          {p.client.name?.charAt(0)}{" "}
                          {p.client.lastname?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>
                        {p.client.name} {p.client.lastname}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>{p.book.title}</TableCell>

                  <TableCell>
                    <Badge variant="outline">
                      {p.book.type === "1" ? "Digital" : "Físico"}
                    </Badge>
                  </TableCell>

                  <TableCell>{p.payed.toLocaleString("pt")} Kz</TableCell>

                  <TableCell>
                    <Button asChild>
                      <a href={p.comprovative} target="_blank">
                        Baixar
                      </a>
                    </Button>
                  </TableCell>

                  <TableCell className="text-right">
                    <Menubar className="shadow-none border-none justify-end bg-transparent">
                      <MenubarMenu>
                        <MenubarTrigger className="w-[40px] justify-center border dark:border-white/10">
                          <EllipsisVertical size={18} />
                        </MenubarTrigger>
                        <MenubarContent className=" dark:text-black backdrop-blur-2xl gap-2 flex flex-col">
                          <Link href={`/seller/payments/${p.id}`}>
                            <MenubarItem className="flex cursor-pointer gap-2 dark:bg-amber-500/10">
                              <Eye size={14} className="text-amber-500" />
                              <span className="text-amber-500">
                                Ver detalhes
                              </span>
                            </MenubarItem>
                          </Link>
                          <MenubarItem className="flex cursor-pointer gap-2 dark:bg-red-500/10">
                            <Trash size={14} className="text-red-500" />
                            <span className="text-red-500">Remover</span>
                          </MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>
                    </Menubar>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={7}>Total de Pagamentos</TableCell>
                <TableCell className="text-right">{payments.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </>
  );
}
