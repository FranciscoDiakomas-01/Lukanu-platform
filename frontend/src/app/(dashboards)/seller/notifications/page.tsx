"use client";

import { Bell, CheckCircle, Info, XCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import notificationsMock from "@/constants/mocks/notification";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import DashordHeader from "@/components/DashordHeader";

export default function NotificationsList() {
  const [notifications, setNotifications] = useState<
    typeof notificationsMock | null
  >(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotifications(notificationsMock);
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="w-full pb-20  lg:h-screen flex-col min-h-screen flex gap-4">
      <DashordHeader whoIs="seller" showInput={false} />
      <Card className="w-[98%] lg:h-[90%]  place-self-center">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bell className="text-primary" size={20} />
            Notificações
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 h-full overflow-hidden">
          <Separator />
          <ScrollArea className=" h-full px-4 ">
            <ul className="divide-y divide-muted">
              {notifications
                ? notifications.map((notif) => (
                    <li
                      key={notif.id}
                      className="py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
                    >
                      <div className="flex items-start gap-3">
                        <IconForTitle title={notif.title} />

                        <div className="flex flex-col">
                          <span className="font-medium">{notif.title}</span>
                          <span className="text-sm text-muted-foreground">
                            {notif.message}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:items-end sm:justify-end gap-2">
                        <Badge variant="outline" className="text-xs w-fit">
                          {new Date(notif.createdAt).toLocaleDateString(
                            "pt-BR",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </Badge>

                        {notif.deeplink && (
                          <Button
                            size="sm"
                            variant="link"
                            className="p-0 h-auto text-xs"
                            asChild
                          >
                            <a href={notif.deeplink}>Ver mais</a>
                          </Button>
                        )}
                      </div>
                    </li>
                  ))
                : Array.from({ length: 5 }).map((_, i) => (
                    <li
                      key={i}
                      className="py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
                    >
                      <div className="flex items-start gap-3">
                        <Skeleton className="w-6 h-6 rounded-full mt-1" />
                        <div className="flex flex-col gap-1">
                          <Skeleton className="h-4 w-[200px]" />
                          <Skeleton className="h-3 w-[250px]" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <Skeleton className="h-4 w-[80px]" />
                        <Skeleton className="h-3 w-[60px]" />
                      </div>
                    </li>
                  ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    </main>
  );
}

function IconForTitle({ title }: { title: string }) {
  if (
    title.toLowerCase().includes("erro") ||
    title.toLowerCase().includes("rejeitado")
  )
    return <XCircle className="text-red-500 mt-1" size={22} />;

  if (
    title.toLowerCase().includes("pagamento") ||
    title.toLowerCase().includes("aprovado")
  )
    return <CheckCircle className="text-green-500 mt-1" size={22} />;

  return <Info className="text-blue-500 mt-1" size={22} />;
}
