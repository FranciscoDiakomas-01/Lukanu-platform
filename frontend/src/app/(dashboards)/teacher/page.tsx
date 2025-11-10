"use client";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import DashordHeader from "@/components/DashordHeader";
import { useEffect, useRef, useState } from "react";
import card1 from "@/assets/carousel1.png";
import card2 from "@/assets/carousel2.png";
import card3 from "@/assets/carousel3.png";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { EbookCardSkeleton } from "@/components/Ebook";
import Course from "@/types/course";
import mockCouse from "@/constants/mocks/course.mock";
import { TeacherCourseCard } from "@/components/Course";
export default function Home() {
  const plugin = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: true,
    })
  );
  const cards = [
    {
      text: "Converse diretamente com seus alunos em tempo real",
      img: card3,
    },
    {
      text: "Responda dúvidas de forma rápida e clara",
      img: card2,
    },
    {
      text: "Acompanhe o progresso dos alunos durante as conversas",
      img: card1,
    },
    {
      text: "Crie grupos de bate-papo para discutir conteúdos",
      img: card3,
    },
    {
      text: "Mantenha um canal aberto para apoio e orientação",
      img: card2,
    },
    {
      text: "Ofereça atendimento individual ou coletivo com segurança",
      img: card1,
    },
  ];

  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoad, setIsLoad] = useState(true);
  useEffect(() => {
    setIsLoad(true);
    setCourses(mockCouse);
    setTimeout(() => {
      setIsLoad(false);
    }, 2500);
  }, []);
  return (
    <section className="w-full pb-20  flex-col min-h-screen flex gap-4">
      <DashordHeader whoIs="teacher" showInput={false} />
      <article className="flex justify-between gap-6 px-2  w-full ">
        <Carousel
          plugins={[plugin.current]}
          className="w-full relative  rounded-md "
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="md:h-[350px] h-[200px] rounded-md ">
            {cards.map((item, index) => (
              <CarouselItem key={index}>
                <div
                  className={` px-4 flex  relative   rounded-md h-full border dark:border-white/10 dark:bg-transparent bg-blue-600`}
                >
                  <svg
                    className="absolute inset-0 w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <radialGradient
                        id="dark-mode-gradient"
                        cx="70%"
                        cy="70%"
                        r="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#3b82f6"
                          stopOpacity="0.1"
                        />
                        <stop
                          offset="100%"
                          stopColor="#000000"
                          stopOpacity="0.6"
                        />
                      </radialGradient>
                    </defs>
                    <rect
                      className="dark:hidden"
                      width="100%"
                      height="100%"
                      fill="url(#light-mode-gradient)"
                    />
                    <rect
                      className="hidden dark:block"
                      width="100%"
                      height="100%"
                      fill="url(#dark-mode-gradient)"
                    />
                  </svg>

                  <div className="relative z-10 flex justify-between h-full">
                    <h1 className="max-w-[50%] text-white dark:text-white lg:pt-12 pt-4 lg:text-5xl md:text-4xl font-bold leading-[1.4] text-2xl">
                      {item.text}
                    </h1>
                    <div className="flex lg:items-end lg:justify-end h-full  justify-start items-start ">
                      <Image
                        className="object-contain md:h-full  h-[200px] "
                        src={item.img}
                        alt={item.text}
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="absolute  bg-red-50 bottom-0 right-[50%] z-2  lg:h-20">
            <CarouselPrevious className="dark:bg-transparent dark:border-white dark:text-white" />
            <CarouselNext className="dark:bg-transparent dark:border-white dark:text-white" />
          </div>
        </Carousel>
      </article>
      <aside className="flex pt-10 w-full flex-col gap-8 min-h-screen px-4">
        <div className="flex md:flex-row flex-col-reverse justify-center w-full gap-4 ">
          <form action="" className="lg:w-[30%] w-full relative">
            <Input className="w-full" placeholder="Buscar por turma" />
            <Search size={18} className="absolute right-2 top-2" />
          </form>
        </div>

        <>
          {isLoad ? (
            <aside className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6 mt-8">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <EbookCardSkeleton key={index} />
              ))}
            </aside>
          ) : (
            <>
              {Array.isArray(courses) && courses.length > 0 ? (
                <aside className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6 mt-8">
                  {courses.map((item, index) => (
                    <TeacherCourseCard course={item} key={index} />
                  ))}
                </aside>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      </aside>
    </section>
  );
}
