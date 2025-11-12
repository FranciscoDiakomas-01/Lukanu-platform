"use client";

import ShinyText from "@/components/animated/ShineText/indext";
import CourseCard, { CourseAssignatureCard } from "@/components/Course";
import DashordHeader from "@/components/DashordHeader";
import mockCouse from "@/constants/mocks/course.mock";
import Course from "@/types/course";
import { Loader, Loader2, TvMinimalPlay, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
export default function Courses() {
  const [load, setLoad] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignatures, setAssginatures] = useState<Course[]>([]);
  const [isShowingAll, setIShowingAll] = useState(true);
  const [tab, setTab] = useState(1);
  useEffect(() => {
    setLoad(true);
    setCourses(mockCouse);
    setAssginatures([]);
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
