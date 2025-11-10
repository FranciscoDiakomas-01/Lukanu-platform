"use client";

import ShinyText from "@/components/animated/ShineText/indext";
import CourseCard, { CourseAssignatureCard } from "@/components/Course";
import DashordHeader from "@/components/DashordHeader";
import mockCouse from "@/constants/mocks/course.mock";
import Course, { CourseAssignature } from "@/types/course";
import { Loader, Loader2, TvMinimalPlay, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
export default function Courses() {
  const [load, setLoad] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignatures, setAssginatures] = useState<CourseAssignature[]>([]);
  const [isShowingAll, setIShowingAll] = useState(true);
  const [tab, setTab] = useState(1);
  useEffect(() => {
    setLoad(true);
    setCourses(mockCouse);
    setAssginatures([
      {
        id: 1,
        title: "Introdução ao HTML e CSS",
        description:
          "Aprenda os fundamentos da criação de sites com HTML5 e CSS3.",
        cover: "https://placehold.co/600x400?text=HTML+e+CSS",
        lessons: 10,
        viewedLessons: 4,
        category: "Front-end",
        level: "1",
        status: "1",
        certificate: true,
        hasAcess: true,
      },
      {
        id: 2,
        title: "JavaScript Intermediário",
        description: "Entenda lógica, arrays, funções e manipulação do DOM.",
        cover: "https://placehold.co/600x400?text=JavaScript",
        lessons: 15,
        viewedLessons: 10,
        category: "Programação",
        level: "2",
        status: "2",
        certificate: true,
        hasAcess: true,
      },
      {
        id: 3,
        title: "Banco de Dados com MySQL",
        description:
          "Aprenda a criar, consultar e gerenciar bancos de dados relacionais.",
        cover: "https://placehold.co/600x400?text=MySQL",
        lessons: 12,
        viewedLessons: 6,
        category: "Banco de Dados",
        level: "2",
        status: "3",
        certificate: true,
        hasAcess: true,
      },
      {
        id: 4,
        title: "TypeScript para Iniciantes",
        description:
          "Tipagem estática, interfaces e generics para JavaScript moderno.",
        cover: "https://placehold.co/600x400?text=TypeScript",
        lessons: 14,
        viewedLessons: 2,
        category: "Programação",
        level: "1",
        status: "1",
        certificate: false,
        hasAcess: true,
      },
      {
        id: 5,
        title: "React com Hooks",
        description:
          "Construa SPAs modernas usando React, useState e useEffect.",
        cover: "https://placehold.co/600x400?text=React+Hooks",
        lessons: 18,
        viewedLessons: 14,
        category: "Front-end",
        level: "2",
        status: "2",
        certificate: true,
        hasAcess: true,
      },
      {
        id: 6,
        title: "Next.js para Aplicações SSR",
        description: "Crie aplicações React com renderização no servidor.",
        cover: "https://placehold.co/600x400?text=Next.js",
        lessons: 20,
        viewedLessons: 20,
        category: "Full-stack",
        level: "3",
        status: "3",
        certificate: true,
        hasAcess: true,
      },
      {
        id: 7,
        title: "Git e GitHub",
        description: "Controle de versão, branches e pull requests para times.",
        cover: "https://placehold.co/600x400?text=Git+e+GitHub",
        lessons: 8,
        viewedLessons: 3,
        category: "DevOps",
        level: "1",
        status: "1",
        certificate: false,
        hasAcess: true,
      },
      {
        id: 8,
        title: "Design de Interfaces com Figma",
        description: "Crie protótipos modernos para web e mobile.",
        cover: "https://placehold.co/600x400?text=Figma",
        lessons: 10,
        viewedLessons: 0,
        category: "Design",
        level: "1",
        status: "2",
        certificate: false,
        hasAcess: true,
      },
      {
        id: 9,
        title: "Node.js com Express",
        description: "Desenvolva APIs RESTful com Express e middlewares.",
        cover: "https://placehold.co/600x400?text=Node.js+Express",
        lessons: 16,
        viewedLessons: 16,
        category: "Back-end",
        level: "2",
        status: "3",
        certificate: true,
        hasAcess: false,
      },
      {
        id: 10,
        title: "Docker na Prática",
        description: "Containerize suas aplicações e melhore o fluxo DevOps.",
        cover: "https://placehold.co/600x400?text=Docker",
        lessons: 11,
        viewedLessons: 4,
        category: "DevOps",
        level: "3",
        status: "1",
        certificate: true,
        hasAcess: false,
      },
      {
        id: 11,
        title: "Cibersegurança para Iniciantes",
        description: "Entenda vulnerabilidades básicas e boas práticas.",
        cover: "https://placehold.co/600x400?text=Segurança",
        lessons: 13,
        viewedLessons: 1,
        category: "Segurança",
        level: "1",
        status: "3",
        certificate: false,
        hasAcess: false,
      },
      {
        id: 12,
        title: "MongoDB com Mongoose",
        description: "Modelagem de dados em banco NoSQL com Node.js.",
        cover: "https://placehold.co/600x400?text=MongoDB",
        lessons: 17,
        viewedLessons: 9,
        category: "Banco de Dados",
        level: "2",
        status: "2",
        certificate: true,
        hasAcess: false,
      },
    ]);
    setTimeout(() => {
      setLoad(false);
    }, 3000);
  }, [isShowingAll]);
  return (
    <main className="w-full  flex-col min-h-screen flex gap-4 pb-10">
      <DashordHeader whoIs="seller" showInput placeholder="Buscar por cursos" />

      <Tabs defaultValue="all" className="px-4">
        <TabsList>
          <TabsTrigger
            id="all"
            value="all"
            onClick={() => {
              setCourses([]);
              setAssginatures([]);
              setLoad(true);
              setIShowingAll((prev) => !prev);
            }}
          >
            <Video className="text-green-500" />
            Cursos disponíveis
          </TabsTrigger>
          <TabsTrigger
            value="my"
            onClick={() => {
              setCourses([]);
              setAssginatures([]);
              setLoad(true);
              setIShowingAll((prev) => !prev);
            }}
          >
            <TvMinimalPlay className="text-blue-500" />
            Cursos inscritos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          {load ? (
            <div className="flex justify-center items-center min-h-[70dvh]  dark:text-white/50 gap-1">
              <Loader2 size={16} className="transition-all animate-spin " />

              <h1>Carregando</h1>
            </div>
          ) : (
            <>
              {Array.isArray(courses) && courses.length > 0 ? (
                <article className="flex gap-6 w-full lg:flex-row flex-col-reverse ">
                  <aside className="grid w-full  gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
                    {courses.map((item, index) => (
                      <CourseCard course={item} key={index} />
                    ))}
                  </aside>
                </article>
              ) : (
                <span className="flex justify-center items-center pt-32">
                  <ShinyText
                    text="Cursos não encontrados"
                    className="lg:text-3xl text-2xl "
                  />
                </span>
              )}
            </>
          )}
        </TabsContent>
        <TabsContent value="my">
          {load ? (
            <div className="flex justify-center items-center min-h-[70dvh]  dark:text-white/50 gap-1">
              <Loader size={16} className="transition-all animate-spin " />

              <h1>Carregando</h1>
            </div>
          ) : (
            <>
              {Array.isArray(assignatures) && assignatures.length > 0 ? (
                <article className="flex gap-6 w-full lg:flex-row flex-col-reverse ">
                  <aside className="grid w-full  gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
                    {assignatures.map((item, index) => (
                      <CourseAssignatureCard course={item} key={index} />
                    ))}
                  </aside>
                </article>
              ) : (
                <span className="flex justify-center items-center pt-32 gap-8 flex-col">
                  <ShinyText
                    text="Cursos não tem matrículas "
                    className="lg:text-3xl text-2xl "
                  />
                  <Button
                    onClick={() => {
                      const element = document.getElementById("all");
                      element && element.click();
                      setTab(1);
                    }}
                  >
                    Ver cursos
                  </Button>
                </span>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
}
