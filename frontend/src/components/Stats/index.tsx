"use client";

import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Props {
  value: number;
  title: string;
  description?: string;
  icon: ReactNode;
  isCoin: boolean;
}
export default function Stats({ prop }: { prop: Props }) {
  return (
    <Card className="px-2">
      <div className="flex justify-between px-2 relative">
        {prop.icon}
        <h1 className="text-xl opacity-60 absolute right-0 top-0">
          {Number(prop.value).toLocaleString("pt")}
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
