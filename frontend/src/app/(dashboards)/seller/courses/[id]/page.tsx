"use client";
import ShinyText from "@/components/animated/ShineText/indext";
import DashordHeader from "@/components/DashordHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import mockCouse from "@/constants/mocks/course.mock";
import { getYouTubeThumbnail } from "@/lib/utils";
import Course, { Lesson } from "@/types/course";
import clsx from "clsx";
import { Download, Goal, Loader, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export default function Coursedetails() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [load, setLoad] = useState(true);
  const [course, setCourse] = useState<Course | undefined>();
  const { id } = useParams();
  const router = useRouter();
  const [currentLesson, setCurrentLesson] = useState<Lesson | undefined>();
  useEffect(() => {
    const Course = mockCouse.find((item) => {
      return item.id == id;
    });
    if (!Course) {
      setCourse(undefined);
    } else {
      setCourse(Course);
      setLessons([]);
    }
    setLoad(true);

    setTimeout(() => {
      setLoad(false);
    }, 1500);
  }, []);
  return (
    <main className="w-full  flex-col min-h-screen flex gap-4 pb-10">
      <DashordHeader whoIs="seller" showInput placeholder="Buscar por cursos" />

      {load ? (
        <div
          className="text-black dark:text-white/20 flex justify-center items-center gap-1
         flex-nowrap text-sm mt-40"
        >
          <Loader className="animate-spin" size={18} /> Carregando
        </div>
      ) : (
        <>
          {course ? (
            <aside className="w-full lg:justify-between lg:gap-10 px-4 flex lg:flex-row flex-col gap-4">
              <article className="w-full flex flex-col gap-4 lg:w-[70%]">
                {currentLesson && (
                  <span className="flex flex-col gap-3">
                    <iframe
                      width="100%"
                      height="400"
                      src={currentLesson.videoURl}
                      title="Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <span className="flex flex-col gap-3 border dark:border-white/10 rounded-sm p-2">
                      <ShinyText text="Informações da aula" />
                      <h1>{currentLesson.title}</h1>
                      <p>{currentLesson.description}</p>

                     
                    </span>

                    <span className="flex flex-col gap-3 border dark:border-white/10 rounded-sm p-2">
                      <ShinyText text="Informações do curso" />
                      <h1>{course.title}</h1>
                      <small>{course.description}</small>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant={"outline"}>
                          <Goal />
                          {course.totalLessons} aulas
                        </Badge>
                        <Badge variant={"outline"}>
                          <Goal />
                          {course.level == "BEGINNER"
                            ? "Inciantes"
                            : course.level == "INTERMEDIATE"
                            ? "intermediário"
                            : "Avançados"}
                        </Badge>
                      </div>
                      <footer className="w-full gap-4 grid lg:grid-cols-2">
                        <Link href={`/seller/chat/${course.id}`}>
                          <Button className="w-full">
                            <MessageCircle />
                            Falar com o tutor
                          </Button>
                        </Link>
                        <Button variant={"outline"} className="w-full">
                          <Download />
                          Obter certificado
                        </Button>
                      </footer>
                    </span>
                  </span>
                )}
              </article>
              <article className="w-full flex flex-col gap-4 lg:w-[30%]">
                {lessons.map((item, index) => (
                  <Card
                    className={clsx(
                      "flex p-2 rounded-sm  transition-all active:scale-95 cursor-pointer",
                      {
                        "border-blue-500":
                          currentLesson && item.id == currentLesson.id,
                      }
                    )}
                    onClick={() => {
                      setCurrentLesson(item);
                    }}
                    key={index}
                  >
                    <div className="flex h-6 w-6 border dark:border-white/10 rounded-full justify-center items-center -mb-4">
                      {index + 1}
                    </div>
                    <CardContent className="flex-col  flex p-0 gap-2">
                      <div className="flex gap-3">
                        <img
                          src={getYouTubeThumbnail(item.videoURl) ?? "thum"}
                          className="h-15 w-10"
                          alt="thumb"
                        />
                        <span>
                          <CardTitle className="font-semibold">
                            {item.title}
                          </CardTitle>{" "}
                          <CardDescription>
                            {item.description?.slice(0, 40)} ...
                          </CardDescription>
                        </span>
                      </div>
                      
                    </CardContent>
                  </Card>
                ))}
              </article>
            </aside>
          ) : (
            <aside className="flex w-full flex-col justify-center items-center gap-5 mt-10">
              <ShinyText
                className="lg:text-3xl text-2xl"
                text="Curso não encontrado"
              />
              <Button variant={"outline"} onClick={() => {}}>
                Voltar
              </Button>
            </aside>
          )}
        </>
      )}
    </main>
  );
}
