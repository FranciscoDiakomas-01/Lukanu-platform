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
import Course from "@/types/course";
import Lesson from "@/types/lesson";
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
  const mockLessons = [
    {
      courseid: 1,
      id: 101,
      videoURL:
        "https://www.youtube.com/embed/rJN-ED2D4xQ?modestbranding=1&rel=0&controls=1&showinfo=0",
      title: "Introdução ao HTML",
      description: "Aprenda o básico da estrutura HTML e como usá-la.",
      order: 1,
      tags: ["html", "web", "frontend"],
    },
    {
      courseid: 1,
      id: 102,
      videoURL: "https://youtu.be/rJN-ED2D4xQ",
      title: "Principais Tags HTML",
      description: "Conheça as principais tags usadas em HTML.",
      order: 2,
      tags: ["html", "tags", "estrutura"],
    },
    {
      courseid: 2,
      id: 201,
      videoURL: "https://www.youtube.com/embed/rJN-ED2D4xQ",
      title: "Introdução ao CSS",
      description: "Entenda como estilizar suas páginas com CSS.",
      order: 1,
      tags: ["css", "estilo", "frontend"],
    },
    {
      courseid: 2,
      id: 202,
      videoURL: "https://videos.courses.com/css-selectors.mp4",
      title: "Seletores CSS",
      description: "Aprenda a usar seletores para estilizar elementos.",
      order: 2,
      tags: ["css", "seletores", "design"],
    },
    {
      courseid: 3,
      id: 301,
      videoURL: "https://www.youtube.com/embed/rJN-ED2D4xQ",
      title: "Introdução ao JavaScript",
      description: "Veja como dar vida às suas páginas com JavaScript.",
      order: 1,
      tags: ["javascript", "frontend", "interatividade"],
    },
    {
      courseid: 3,
      id: 302,
      videoURL: "https://www.youtube.com/embed/rJN-ED2D4xQ",
      title: "Variáveis em JavaScript",
      description: "Como declarar e usar variáveis em JavaScript.",
      order: 2,
      tags: ["javascript", "variáveis", "tipos"],
    },
    {
      courseid: 3,
      id: 303,
      videoURL: "https://www.youtube.com/embed/rJN-ED2D4xQ",
      title: "Funções em JavaScript",
      description: "Crie e utilize funções para organizar seu código.",
      order: 3,
      tags: ["javascript", "funções", "modularidade"],
    },
    {
      courseid: 4,
      id: 401,
      videoURL: "https://videos.courses.com/react-intro.mp4",
      title: "React: Primeiros Passos",
      description: "Comece a construir interfaces com React.",
      order: 1,
      tags: ["react", "js", "componentes"],
    },
    {
      courseid: 4,
      id: 402,
      videoURL: "https://videos.courses.com/react-state.mp4",
      title: "Gerenciando estado no React",
      description: "Entenda como funciona o estado nos componentes.",
      order: 2,
      tags: ["react", "estado", "hooks"],
    },
    {
      courseid: 5,
      id: 501,
      videoURL: "https://videos.courses.com/nodejs-intro.mp4",
      title: "Node.js: Introdução",
      description: "Aprenda como usar JavaScript no backend.",
      order: 1,
      tags: ["nodejs", "backend", "javascript"],
    },
    {
      courseid: 5,
      id: 502,
      videoURL: "https://videos.courses.com/nodejs-api.mp4",
      title: "Criando APIs com Express",
      description: "Construa uma API REST com Express.js.",
      order: 2,
      tags: ["nodejs", "express", "api"],
    },
    {
      courseid: 5,
      id: 503,
      videoURL: "https://videos.courses.com/nodejs-db.mp4",
      title: "Conectando ao Banco de Dados",
      description: "Como conectar o Node.js ao banco de dados.",
      order: 3,
      tags: ["nodejs", "banco de dados", "sql"],
    },
  ];
  const [currentLesson, setCurrentLesson] = useState<Lesson | undefined>();
  useEffect(() => {
    const Course = mockCouse.find((item) => {
      return item.id == id;
    });
    if (!Course) {
      setCourse(undefined);
    } else {
      setCourse(Course);
      setLessons(mockLessons);
      setCurrentLesson(mockLessons[0]);
    }
    setLoad(true);

    setTimeout(() => {
      setLoad(false);
    }, 1500);
  }, []);
  return (
    <main className="w-full  flex-col min-h-screen flex gap-4 pb-10">
      <DashordHeader
       
        whoIs="seller"
        showInput
        placeholder="Buscar por cursos"
      />

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
                      src={currentLesson.videoURL}
                      title="Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <span className="flex flex-col gap-3 border dark:border-white/10 rounded-sm p-2">
                      <ShinyText text="Informações da aula" />
                      <h1>{currentLesson.title}</h1>
                      <p>{currentLesson.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {currentLesson.tags.map((item, index) => (
                          <Badge key={index} variant={"outline"}>
                            <Goal />
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </span>

                    <span className="flex flex-col gap-3 border dark:border-white/10 rounded-sm p-2">
                      <ShinyText text="Informações do curso" />
                      <h1>{course.title}</h1>
                      <small>{course.description}</small>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant={"outline"}>
                          <Goal />
                          {course.lessons} aulas
                        </Badge>
                        <Badge variant={"outline"}>
                          <Goal />
                          {course.level == "1"
                            ? "Inciantes"
                            : course.level == "2"
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
                          src={getYouTubeThumbnail(item.videoURL) ?? "thum"}
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
                      <CardFooter className="w-full justify-start items-start px-0 flex flex-col gap-1">
                        <ShinyText text="Tópicos" className="text-sm" />
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag, index) => (
                            <Badge variant={"outline"} key={index}>
                              <Goal />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardFooter>
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
