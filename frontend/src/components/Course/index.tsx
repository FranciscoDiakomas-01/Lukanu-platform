"use client";
import Course, { CourseAssignature } from "@/types/course";
import { Button } from "../ui/button";
import {
  AlertCircle,
  BadgeCheck,
  Download,
  Goal,
  ImageUp,
  Loader,
  Users,
  Verified,
  Video,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { CourseProgress } from "../CourseProgress";
import { formatBytes } from "@/lib/utils";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "../ui/label";
import { ChangeEvent, useRef, useState } from "react";
import Link from "next/link";

export default function CourseCard({ course }: { course: Course }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type.startsWith("image/")) {
      setFile(selected);
    } else {
      setFile(null);
    }
  };
  return (
    <figure className="flex flex-col gap-4 p-3 rounded-sm border dark:border-white/10">
      <div className="flex  shadow-2xl/10  place-self-end shadow-blue-500 h-40 w-full bg-radial from-blue-900 rounded-sm to-blue-300 justify-center items-center">
        <h1 className="font-bold  text-white text-xl text-center">
          {course.title}
        </h1>
      </div>

      <Badge variant={"outline"} className="bg-blue-500  text-white">
        <Verified />
        {course.category}
      </Badge>
      <p className="text-sm  opacity-70">{course.description}</p>
      <div className="flex flex-wrap gap-3">
        <Badge variant={"outline"}>
          <Video />
          {course.lessons} aulas
        </Badge>
        <Badge variant={"outline"}>
          <Goal />
          {course.level == "1"
            ? "Iniciante"
            : course.level == "2"
            ? "Intermediário"
            : "Avançado"}
        </Badge>
      </div>

      <figcaption className="grid gap-2 grid-cols-2 items-end">
        <h1 className="text-2xl font-bold">
          {Number(course.price).toLocaleString("pt")} kz
        </h1>
        <Drawer
          onClose={() => {
            setFile(null);
          }}
        >
          <DrawerTrigger asChild>
            <Button variant={"outline"}>
              <Video />
              Matricular
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className=" w-full px-4 lg:w-[30%] pb-10 md:w-[80%] md:place-self-center">
              <DrawerHeader>
                <DrawerTitle>Envia um comprovativo</DrawerTitle>
                <DrawerDescription>
                  Clique na caixa de entrada para selecionares um arquivo no
                  formato de imagem
                </DrawerDescription>
              </DrawerHeader>
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium">Comprovativo</Label>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileRef.current?.click()}
                  className="gap-2 h-[60px]"
                >
                  <ImageUp className="w-5 h-5" />
                  Selecionar Imagem
                </Button>

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {file && (
                  <div className="text-sm text-green-500 mt-1">
                    <strong>{file.name}</strong> — {formatBytes(file.size)}
                  </div>
                )}
              </div>
              <DrawerFooter className="w-full px-0 grid grid-cols-2 gap-3">
                <Button>Enviar</Button>
                <DrawerClose asChild>
                  <Button
                    onClick={() => {
                      setFile(null);
                    }}
                    variant="outline"
                  >
                    Cancelar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </figcaption>
    </figure>
  );
}

export function CourseAssignatureCard({
  course,
}: {
  course: CourseAssignature;
}) {
  return (
    <figure className="flex flex-col gap-4 p-3 rounded-sm border dark:border-white/10">
      <div className="flex  shadow-2xl/10  place-self-end shadow-blue-500 h-40 w-full bg-radial from-blue-900 rounded-sm to-blue-300 justify-center items-center">
        <h1 className="font-bold  text-white text-xl text-center">
          {course.title}
        </h1>
      </div>

      <Badge variant={"outline"} className="bg-blue-500  text-white">
        <Verified />
        {course.category}
      </Badge>

      {!course.hasAcess && (
        <Badge variant={"outline"} className="bg-red-500  text-white">
          <Verified />
          Aguarde pela aprovação
        </Badge>
      )}
      <p className="text-sm  opacity-70">{course.description}</p>
      <div className="flex flex-wrap gap-3">
        <Badge variant={"outline"}>
          <Video />
          {course.lessons} aulas
        </Badge>
        <Badge variant={"outline"}>
          <Video />
          {course.viewedLessons} assistidas
        </Badge>
        <Badge variant={"outline"}>
          <Goal />{" "}
          {course.level == "1"
            ? "Iniciante"
            : course.level == "2"
            ? "Intermediário"
            : "Avançado"}
        </Badge>
        <Badge variant={"outline"}>
          {course.status == "1" ? (
            <BadgeCheck className="text-green-500" />
          ) : course.status == "2" ? (
            <Loader />
          ) : (
            <AlertCircle className="text-red-500" />
          )}

          {course.status == "1"
            ? "Concluído"
            : course.status == "2"
            ? "Pendente"
            : "Cancelado"}
        </Badge>
      </div>
      {course.hasAcess && (
        <CourseProgress
          viewedLessons={course.viewedLessons}
          totalLessons={course.lessons}
        />
      )}
      <div className="grid md:grid-cols-2 gap-3">
        <>
          {course.hasAcess ? (
            <Link
              className="flex items-center justify-center gap-1 flex-nowrap"
              prefetch
              href={`/seller/courses/${course.id}`}
            >
              <Button variant={"outline"} className="w-full">
                <Video />
                Entrar
              </Button>
            </Link>
          ) : (
            <Button disabled variant={"outline"} className="w-full">
              <Loader />
              Pendente
            </Button>
          )}
        </>
        {course.hasAcess && course.certificate && (
          <Button>
            <Download />
            Certificado
          </Button>
        )}
      </div>
    </figure>
  );
}

export function TeacherCourseCard({ course }: { course: Course }) {
  return (
    <figure className="flex flex-col gap-4 p-3 rounded-sm border dark:border-white/10">
      <div className="flex  shadow-2xl/10  place-self-end shadow-blue-500 h-40 w-full bg-radial from-blue-900 rounded-sm to-blue-300 justify-center items-center">
        <h1 className="font-bold  text-white text-xl text-center">
          {course.title}
        </h1>
      </div>

      <Badge variant={"outline"} className="bg-blue-500  text-white">
        <Verified />
        {course.category}
      </Badge>
      <p className="text-sm  opacity-70">{course.description}</p>
      <div className="flex flex-wrap gap-3">
        <Badge variant={"outline"}>
          <Video className="text-amber-500" />
          {course.lessons} aulas
        </Badge>
        <Badge variant={"outline"}>
          <Goal className="text-green-500" />
          {course.level == "1"
            ? "Iniciante"
            : course.level == "2"
            ? "Intermediário"
            : "Avançado"}
        </Badge>
        <Badge variant={"outline"}>
          <Users className="text-blue-500" />
          {course.students} estudantes
        </Badge>
      </div>

      <figcaption className="grid gap-2 grid-cols-2 items-end">
        <Button asChild>
          <Link href={`/teacher/${course.id}`}>Detalhes</Link>
        </Button>
      </figcaption>
    </figure>
  );
}
