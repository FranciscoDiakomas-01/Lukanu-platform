import React from "react";
import { Timeline } from "@/components/animated/timeline";
import mock1 from "@/assets/dash1.jpg";
import mock2 from "@/assets/dash2.jpg";
import dash from "@/assets/dash1.jpg";
import dash2 from "@/assets/dash2.jpg";
import ShinyText from "@/components/animated/Shine";
export default function About() {
  const data = [
    {
      title: "Quem somos",
      content: (
        <div>
          <p className="mb-8 text-sm font-normal text-white">
            A <strong>Lukanu</strong> é uma plataforma que conecta autores,
            leitores e afiliados em um único espaço. Nossa missão é democratizar
            o acesso ao conhecimento por meio de livros digitais e físicos,
            oferecendo uma vitrine para escritores e uma oportunidade de renda
            para afiliados.
          </p>
          <div className="lg:grid grid-cols-2 gap-4 hidden">
            <img
              src={mock1.src}
              alt="marketplace"
              width={500}
              height={500}
              className="w-full h-full rounded-lg object-cover"
            />
            <img
              src={mock2.src}
              alt="leitores e autores"
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
          <p className="mb-8 text-sm font-normal text-white">
            Tornar o conhecimento acessível e rentável, promovendo a leitura, a
            publicação independente e a monetização por afiliação. Na Lukanu,
            qualquer pessoa pode comprar, vender, indicar e lucrar com livros.
          </p>

          <div className="lg:grid grid-cols-2 gap-4 hidden">
            <img
              src={dash.src}
              alt="livros digitais"
              width={500}
              height={500}
              className="w-full h-full rounded-lg object-cover"
            />
            <img
              src={dash2.src}
              alt="dashboard de vendas"
              width={500}
              height={500}
              className="w-full rounded-lg object-cover"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Visão & Diferenciais",
      content: (
        <div>
          <p className="mb-8 text-sm font-normal text-white">
            Ser a maior plataforma de distribuição de livros e eBooks em Angola
            e em toda a lusofonia, criando um ecossistema onde autores ganham
            visibilidade, leitores têm acesso facilitado e afiliados geram renda
            promovendo obras.
          </p>
          <div className="mb-8 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs text-white md:text-sm dark:text-neutral-300">
              ✅ Plataforma para autores independentes
            </div>
            <div className="flex items-center gap-2 text-xs text-white md:text-sm dark:text-neutral-300">
              ✅ Venda de livros digitais e impressos
            </div>
            <div className="flex items-center gap-2 text-xs text-white md:text-sm dark:text-neutral-300">
              ✅ Sistema de afiliação com comissões
            </div>
            <div className="flex items-center gap-2 text-xs text-white md:text-sm dark:text-neutral-300">
              ✅ Pagamentos seguros e gestão simples
            </div>

            <ShinyText
              text="Lukanu está transformando a forma como livros são vendidos e compartilhados"
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
