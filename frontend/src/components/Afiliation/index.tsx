import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ExternalLink, User, BookOpen, DollarSign } from "lucide-react";
import Image from "next/image";
import { Afiliation } from "@/types/Afiliation";

interface EbookAffiliateProps {
  data: Afiliation;
}
export default function EbookAffiliateCard({ data }: EbookAffiliateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-lg mx-auto"
    >
      <Card className="rounded-sm shadow-xl border p-0 overflow-hidden transition hover:shadow-2xl duration-300">
        <CardContent className="p-6 space-y-8">
          <div className="relative w-full h-64 overflow-hidden rounded-xl">
            <img
              src={data.ebook.coverUrl}
              alt={data.ebook.title}
              className="object-cover"
            />
          </div>
          <div>
            <CardTitle>{data.ebook.title}</CardTitle>
            <CardDescription>{data.ebook.subtitle}</CardDescription>
            <small>{data.ebook.description}</small>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex flex-col gap-1">
              <span className="font-semibold">Preço atual:</span>
              <span className="flex items-center gap-1 font-medium">
                <DollarSign className="h-4 w-4" /> {data.ebook.currentPrice} KZ
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">Categoria:</span>
              <Badge variant="secondary">{data.ebook.category}</Badge>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">Páginas:</span>
              <span>{data.ebook.pages}</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <User className="h-4 w-4" /> Autor da partilha
            </h3>

            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={data.user.profileUrl} />
              </Avatar>
              <div>
                <p className="font-semibold">
                  {data.user.firstName} {data.user.lastName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {data.user.email}
                </p>
              </div>
            </div>
          </div>

          <Button asChild className="w-full mt-4">
            <a
              href={`/checkout/${data.ebook.id}?aff=${data.user.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Acessar Página <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          <div className="grid grid-cols-2 gap-4 border-t pt-6">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">Comissão:</span>
              <span className="font-semibold text-lg">
                {data.ebook.sharePercent}%
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">
                Vendas geradas:
              </span>
              <span className="font-semibold text-lg">
                {data.purchaseCount}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">
                Ganhos totais:
              </span>
              <span className="font-semibold text-lg">
                {(
                  data.purchaseCount *
                  ((data.ebook.currentPrice * data.ebook.sharePercent) / 100)
                ).toFixed(2)}{" "}
                KZ
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">
                Preço do produto:
              </span>
              <span className="font-semibold text-lg">
                {data.ebook.currentPrice} KZ
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
