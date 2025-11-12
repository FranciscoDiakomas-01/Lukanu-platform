"use client";

import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CoinsIcon } from "lucide-react";

interface Props {
  value: number;
  title: string;
  description?: string;
  icon?: ReactNode;
  isCoin: boolean;
}
export default function Stats({ prop }: { prop: Props }) {
  return (
    <Card className="px-2 bg-transparent gap-2 rounded-sm">
      <div className="flex justify-between px-1 relative">
        <CoinsIcon />
        <h1 className="text-xl opacity-60 absolute right-0 top-0">
          {Number(prop.value).toFixed(2)}
          {prop.isCoin && " kz"}
        </h1>
      </div>
      <CardContent className="px-0 flex flex-col gap-2">
        <CardTitle>{prop.title}</CardTitle>
        <CardDescription>{prop.description}</CardDescription>
      </CardContent>
    </Card>
  );
}
