"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import ShinyText from "@/components/animated/ShineText/indext";
import DashordHeader from "@/components/DashordHeader";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AvatarFallback } from "@radix-ui/react-avatar";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Payment } from "@/types/payments";
import { paymentsMock } from "@/constants/mocks/payments.mock";
export default function PaymentDetails() {
  const { id } = useParams();
  const [payment, setPayment] = useState<Payment | null>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const statusLabel = {
    "1": "Pendente",
    "2": "Aprovado",
    "3": "Rejeitado",
  };

  const statusColor = {
    "1": "default",
    "2": "success",
    "3": "destructive",
  };
  useEffect(() => {
    setIsLoading(true);
    const paymentId = Number(id);
    const Payment = paymentsMock.find((item) => {
      return item.id == paymentId;
    });
    setPayment(Payment);
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);
  return (
    <main className="w-full  flex-col min-h-screen flex gap-4">
      <DashordHeader whoIs="seller" showInput={false} />

      {isLoading ? (
        <div className="flex lg:flex-row flex-col w-full px-4 gap-4">
          <span className="lg:w-[50%] h-[400px] w-full ">
            <Skeleton className="w-full h-full" />
          </span>
          <span className="lg:w-[50%] w-full flex flex-col gap-4 justify-between">
            <div className="flex flex-col gap-2">
              <Skeleton className="w-[30%] h-4 mb-4" />{" "}
              <Skeleton className="w-full h-2" />{" "}
              <Skeleton className="w-full h-2" />{" "}
              <Skeleton className="w-full h-2" />{" "}
              <Skeleton className="w-full h-2" />
              <Skeleton className="w-full h-2" />{" "}
              <Skeleton className="w-full h-2" />{" "}
              <Skeleton className="w-full h-2" />{" "}
              <Skeleton className="w-full h-2" />
            </div>
            <div className="flex gap-4 mt-4">
              <Skeleton className="h-[50px] w-full" />
              <Skeleton className="h-[50px] w-full" />
            </div>
          </span>
        </div>
      ) : (
        <>
          {!payment ? (
            <div className="h-[80dvh] flex justify-center items-center flex-col gap-8">
              <ShinyText
                text="Pagamento não encontrado não encontrado"
                className="lg:text-5xl"
              />
              <Button
                className="lg:w-[150px]"
                onClick={() => {
                  router.push("/seller/payments");
                }}
              >
                Voltar
                <ArrowLeft />
              </Button>
            </div>
          ) : (
            <div className="px-4 flex flex-col gap-4">
              {" "}
              <div className="flex lg:flex-row flex-col w-full  gap-4 mb-15">
                <span className="lg:w-[50%] h-[400px] w-full justify-center items-centerflex relative border rounded-md bg-radial ">
                  <svg
                    className="absolute inset-0 w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <radialGradient
                        id="light-mode-gradient"
                        cx="30%"
                        cy="30%"
                        r="80%"
                      >
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                        <stop
                          offset="100%"
                          stopColor="#ffffff"
                          stopOpacity="1"
                        />
                      </radialGradient>
                      <radialGradient
                        id="dark-mode-gradient"
                        cx="70%"
                        cy="70%"
                        r="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#3b82f6"
                          stopOpacity="0.1"
                        />
                        <stop
                          offset="100%"
                          stopColor="#000000"
                          stopOpacity="0.6"
                        />
                      </radialGradient>
                    </defs>

                    <rect
                      className="hidden dark:block"
                      width="100%"
                      height="100%"
                      fill="url(#dark-mode-gradient)"
                    />
                  </svg>
                  <div className="w-full h-full absolute flex justify-center items-center z-10">
                    {payment.book.cover ? (
                      <Image
                        src={payment.book.cover}
                        alt={payment.book.title}
                        className="rounded"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center rounded text-xs">
                        Sem capa
                      </div>
                    )}
                  </div>
                </span>
                <Card className="w-full max-w-2xl shadow-xl">
                  <CardHeader>
                    <div className="flex flex-col gap-1">
                      <CardTitle className="text-lg dark:hidden">
                        {payment.book.title}
                      </CardTitle>
                      <div className="dark:flex hidden">
                        <ShinyText
                          text={payment.book.title}
                          className="text-lg font-bold"
                        />
                      </div>
                      <CardDescription className="text-sm">
                        {payment.book.description}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="flex flex-col gap-4">
                    <Separator />

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex flex-col gap-1">
                        <span className="text-muted-foreground">Status</span>
                        <Badge variant={statusColor[payment.status] as any}>
                          {statusLabel[payment.status]}
                        </Badge>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-muted-foreground">
                          Valor Pago
                        </span>
                        <span className="font-semibold">
                          {Number(payment.payed).toLocaleString("pt")} kz
                        </span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-muted-foreground">
                          Preço Original
                        </span>
                        <span>
                          {Number(payment.book.price).toLocaleString("pt")} kz
                        </span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-muted-foreground">
                          Data da Compra
                        </span>
                        <span>
                          {new Date(payment.createdAt).toLocaleString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <Button
                        className="h-[45px]"
                        disabled={payment.status != "1"}
                      >
                        <ShoppingCart size={16} className="mr-2" />
                        Aprovar
                      </Button>

                      <Button
                        className="h-[45px]"
                        onClick={() => router.back()}
                        variant="outline"
                      >
                        <ArrowLeft size={16} className="mr-2" />
                        Voltar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-4 flex flex-col gap-4 ">
                <ShinyText
                  text={"Informações do cliente"}
                  className="text-2xl -mt-10"
                />
                <span className="flex gap-3 ">
                  <Avatar>
                    <AvatarImage
                      src={payment.client.profil}
                      alt={`${payment.client.name}`}
                    />
                    <AvatarFallback className="dark:bg-white bg-[#080808] text-white dark:text-black justify-center flex items-center w-10 uppercase font-semibold">
                      {payment.client.name?.charAt(0) +
                        payment.client.lastname?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p>{payment.client.name + " " + payment.client.lastname}</p>
                    <small className="text-[11px] ">
                      {payment.client.email}
                    </small>
                  </div>
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}
