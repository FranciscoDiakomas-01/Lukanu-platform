"use client";

import DashordHeader from "@/components/DashordHeader";
import Student from "@/types/student";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
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
  Loader,
  Users,
} from "lucide-react";

import { mockStudents } from "@/constants/mocks/students";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Stats from "@/components/Stats";
export default function CourseDetails() {
  const { id } = useParams();
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoad, setIsLoad] = useState(true);
  useEffect(() => {
    setIsLoad(true);
    setStudents(mockStudents);
    setTimeout(() => {
      setIsLoad(false);
    }, 2500);
  }, []);
  return (
    <main className="w-full pb-20  flex-col min-h-screen flex gap-4">
      <DashordHeader whoIs="teacher" showInput={false} />

      <>
        {isLoad ? (
          <aside>
            <span className="grid px-4 lg:grid-cols-3 md:grid-cols-2 gap-4 my-6">
              {[1, 2, 3].map((_, indx) => (
                <Skeleton key={indx} className="h-40 w-full"></Skeleton>
              ))}
            </span>

            <Table>
              <TableCaption>Lista dos meus Livros</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Perfil</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Sobrenome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="w-[130px]">Detalhes</TableHead>
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
                  </TableRow>
                ))}
              </TableBody>

              <TableFooter className="w-full">
                <TableRow>
                  <TableCell colSpan={5}>Total</TableCell>
                  <TableCell className="text-right">
                    {Number(students.length)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </aside>
        ) : (
          <>
            {Array.isArray(students) && (
              <aside className="grid px-4 lg:grid-cols-3 md:grid-cols-2 gap-4 my-6">
                <Stats
                  prop={{
                    icon: <Users className="text-blue-500" />,
                    isCoin: false,
                    title: "Total Alunos",
                    description: "Alunos inscritos no curso",
                    value: students.length,
                  }}
                />{" "}
                <Stats
                  prop={{
                    icon: <Users className="text-green-500" />,
                    isCoin: false,
                    title: "Alunos Activos",
                    description: "Alunos inscritos no curso",
                    value: students.filter((i) => {
                      i.status == "2";
                    }).length,
                  }}
                />{" "}
                <Stats
                  prop={{
                    icon: <Users className="text-red-500" />,
                    isCoin: false,
                    title: "Alunos Desactivos",
                    description: "Alunos inscritos no curso",
                    value: students.filter((i) => {
                      i.status == "1";
                    }).length,
                  }}
                />
              </aside>
            )}
            {Array.isArray(students) && students.length > 0 ? (
              <aside className="px-4">
                <Table>
                  <TableCaption>Lista dos meus Livros</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Código</TableHead>

                      <TableHead>Perfil</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Sobrenome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="">
                    {students.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          <Badge variant={"outline"}>
                            <Copy />
                            {item.id}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <Avatar className="md:flex hidden">
                            <AvatarImage
                              src={`${item.profile}`}
                              alt={`@${item.name}`}
                            />
                            <AvatarFallback className="dark:bg-white bg-[#080808] text-white dark:text-black justify-center flex items-center w-10 uppercase font-semibold">
                              {item.name?.charAt(0) + item.lasname?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.lasname} </TableCell>
                        <TableCell>{item.email}</TableCell>
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
                              ? "Activo"
                              : item.status == "2"
                              ? "Pendente"
                              : "Rejeitado"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                  <TableFooter className="w-full">
                    <TableRow>
                      <TableCell colSpan={6}>Total</TableCell>
                      <TableCell className="text-right">
                        {Number(students.length)}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </aside>
            ) : (
              <div>
                <h1>Você ainda não crio livros</h1>
              </div>
            )}
          </>
        )}
      </>
    </main>
  );
}
