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
import { useEffect, useState } from "react";
import { Banknote, Clock, CheckCircle2, XCircle } from "lucide-react";
import { format } from "date-fns";
import DashordHeader from "@/components/DashordHeader";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
type WithdrawalStatus = "approved" | "pending" | "rejected";

interface Withdrawal {
  id: number;
  amount: number;
  status: WithdrawalStatus;
  createdAt: Date;
  iban: string;
  bank: string;
}

export default function WithdrawalHistory() {
  const [loading, setLoading] = useState(true);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setWithdrawals([
        {
          id: 1,
          amount: 15000,
          status: "approved",
          createdAt: new Date("2025-08-01T10:15:00"),
          iban: "AO06 1234 5678 0001",
          bank: "BAI",
        },
        {
          id: 2,
          amount: 9000,
          status: "pending",
          createdAt: new Date("2025-08-04T15:45:00"),
          iban: "AO06 1234 5678 0002",
          bank: "BFA",
        },
        {
          id: 3,
          amount: 20000,
          status: "rejected",
          createdAt: new Date("2025-07-29T09:20:00"),
          iban: "AO06 1234 5678 0003",
          bank: "Millennium",
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <main className="w-full  pb-20">
      <DashordHeader whoIs="seller" showInput={false} />
      <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2 p-4">
        <Banknote /> Histórico de Saques
      </h1>

      <div className="px-2 w-full flex flex-col gap-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Banco</TableHead>
              <TableHead>IBAN</TableHead>
              <TableHead>Data</TableHead>
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
                    <TableCell>
                      <Badge
                        variant={
                          withdrawal.status === "approved"
                            ? "success"
                            : withdrawal.status === "pending"
                            ? "outline"
                            : ("destructive" as any)
                        }
                        className="flex items-center gap-1"
                      >
                        {withdrawal.status === "approved" && (
                          <>
                            <CheckCircle2
                              className="text-green-500"
                              size={14}
                            />{" "}
                            Aprovado
                          </>
                        )}
                        {withdrawal.status === "pending" && (
                          <>
                            <Clock className="text-amber-500 " size={14} />{" "}
                            Pendente
                          </>
                        )}
                        {withdrawal.status === "rejected" && (
                          <>
                            <XCircle size={14} /> Rejeitado
                          </>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell>{withdrawal.bank}</TableCell>
                    <TableCell className="text-sm">{withdrawal.iban}</TableCell>
                    <TableCell className="text-sm">
                      {format(withdrawal.createdAt, "dd/MM/yyyy HH:mm")}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        {Array.isArray(withdrawals) && withdrawals.length > 0 && (
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
        )}
      </div>
    </main>
  );
}
