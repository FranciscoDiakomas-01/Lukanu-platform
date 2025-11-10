import React from "react";
import { Timeline } from "@/components/animated/timeline";
import mock1 from "@/assets/mock1.png";
import mock2 from "@/assets/mock2.png";
import dash from "@/assets/dash.jpg";
import dash2 from "@/assets/dash2.jpg";
import ShinyText from "@/components/animated/Shine";
export default function About() {
  const data = [
    {
      title: "Quem somos",
      content: (
        <div>
          <p
            className="mb-8 text-sm font-normal text-white
          "
          >
            Somos uma plataforma de mobilidade colaborativa que conecta pessoas
            indo para os mesmos destinos, promovendo economia e
            sustentabilidade. O 4Ride nasceu da necessidade de tornar o
            transporte urbano mais acessível, seguro e eficiente para todos.
          </p>
          <div className="lg:grid grid-cols-2 gap-4 hidden">
            <img
              src={mock1.src}
              alt="startup template"
              width={500}
              height={500}
              className="w-full h-full rounded-lg object-cover"
            />{" "}
            <img
              src={mock2.src}
              alt="startup template"
              width={500}
              height={500}
              className="w-full rounded-lg object-cover"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Missão",
      content: (
        <div>
          <p
            className="mb-8 text-sm font-normal text-white
          "
          >
            Facilitar o compartilhamento de rotas entre pessoas com trajetos
            semelhantes, incentivando a economia compartilhada e reduzindo os
            custos com transporte individual.
          </p>

          <div className="lg:grid grid-cols-2 gap-4 hidden">
            <img
              src={dash.src}
              alt="startup template"
              width={500}
              height={500}
              className="w-full h-full rounded-lg object-cover"
            />{" "}
            <img
              src={dash2.src}
              alt="startup template"
              width={500}
              height={500}
              className="w-full rounded-lg object-cover"
            />{" "}
          </div>
        </div>
      ),
    },
    {
      title: "Visão & Diferencias",
      content: (
        <div>
          <p
            className="mb-8 text-sm font-normal text-white
          "
          >
            Ser referência em mobilidade urbana colaborativa em Angola e além,
            promovendo inclusão, economia e consciência ambiental nas grandes
            cidades.
          </p>
          <div className="mb-8 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs text-white md:text-sm dark:text-neutral-300">
              ✅ Facilitar
            </div>
            <div className="flex items-center gap-2 text-xs text-white md:text-sm dark:text-neutral-300">
              ✅ Economizar
            </div>
            <div className="flex items-center gap-2 text-xs text-white md:text-sm dark:text-neutral-300">
              ✅ Compartilhar
            </div>
            <div className="flex items-center gap-2 text-xs text-white md:text-sm dark:text-neutral-300">
              ✅ Minimizar os Custos
            </div>

            <ShinyText
              text="4RIDE veio para facilitar o compartilhamento de rotas"
              className="flex items-center gap-2 text-[14pt] lg:text-xl text-white"
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
