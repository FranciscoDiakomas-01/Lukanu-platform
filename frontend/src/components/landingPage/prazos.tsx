import { CheckIcon } from "lucide-react";
import ShinyText from "../animated/Shine";

const tiers = [
  {
    name: "Leitor",
    id: "tier-reader",
    href: "/login?tab=sign",
    priceMonthly: "0 Kz",
    description:
      "Crie sua conta gratuitamente e comece a explorar centenas de eBooks nacionais. Sem taxas, sem mensalidade.",
    features: [
      "Acesso gratuito a eBooks pagos e gratuitos",
      "Leitura diretamente no navegador",
      "Favoritos e histórico de leitura",
      "Design responsivo e fluido para mobile",
    ],
    featured: false,
  },
  {
    name: "Autora / Afiliado",
    id: "tier-author",
    href: "/login",
    priceMonthly: "0 Kz",
    description:
      "Publique e venda seus livros digitais sem pagar nada. Ganhe até 80% por cada venda e comissões por indicações.",
    features: [
      "Publicação gratuita de eBooks",
      "Ganhos de até 80% por venda",
      "Sistema de afiliados integrado",
      "Painel com relatórios e controle de ganhos",
    ],
    featured: true,
  },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

import { InfiniteMovingCards } from "@/components/animated/moving-cards";
const testimonials = [
  {
    quote:
      "Vendi meu primeiro eBook em menos de 24h na Lukanu. Nunca imaginei que fosse tão fácil publicar e começar a ganhar.",
    name: "Paulo Andrade",
    title: "PA",
  },
  {
    quote:
      "A plataforma é super intuitiva. Publiquei meu material da faculdade e ainda ganho comissões como afiliada.",
    name: "Elisa Mavungo",
    title: "EM",
  },
  {
    quote:
      "Economizei bastante encontrando eBooks didáticos com preços acessíveis. Muito melhor que procurar por PDFs na internet.",
    name: "Carlos Kiala",
    title: "CK",
  },
  {
    quote:
      "Comecei como leitora e agora também sou autora. A Lukanu me ajudou a dar o primeiro passo no mundo digital.",
    name: "Jéssica Ndalu",
    title: "JN",
  },
  {
    quote:
      "Ganhei um bônus ao me cadastrar e já comprei meu primeiro livro. A experiência foi simples e segura.",
    name: "Mário Samuel",
    title: "MS",
  },
  {
    quote:
      "Vendi meu primeiro eBook em menos de 24h na Lukanu. Nunca imaginei que fosse tão fácil publicar e começar a ganhar.",
    name: "Paulo Andrade",
    title: "PA",
  },
  {
    quote:
      "A plataforma é super intuitiva. Publiquei meu material da faculdade e ainda ganho comissões como afiliada.",
    name: "Elisa Mavungo",
    title: "EM",
  },
  {
    quote:
      "Economizei bastante encontrando eBooks didáticos com preços acessíveis. Muito melhor que procurar por PDFs na internet.",
    name: "Carlos Kiala",
    title: "CK",
  },
  {
    quote:
      "Comecei como leitora e agora também sou autora. A Lukanu me ajudou a dar o primeiro passo no mundo digital.",
    name: "Jéssica Ndalu",
    title: "JN",
  },
  {
    quote:
      "Ganhei um bônus ao me cadastrar e já comprei meu primeiro livro. A experiência foi simples e segura.",
    name: "Mário Samuel",
    title: "MS",
  },
];

export default function HowItWorks() {
  return (
    <section id="integration" className="flex flex-col gap-3 py-32">
      <div className=" rounded-md flex flex-col antialiased   items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
      <div className="relative isolate  px-6  sm:py-32 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="mx-auto aspect-1155/678 w-288.75 bg-gradient-to-tr from-[#075af4] to-[#013267] opacity-30"
          />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold text-blue-600">
            Como funciona
          </h2>
          <ShinyText
            text="Use a Lukanu para ler, vender e lucrar com eBooks"
            className="mt-2 text-5xl font-semibold text-balance text-white sm:text-6xl"
          />
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-white sm:text-xl">
          A Lukanu é gratuita para leitores, autores e afiliados. Com ela, você
          pode ler livros, publicar seus próprios e lucrar com cada venda.
          Simples, prático e 100% angolano.
        </p>

        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tier.featured
                  ? "relative bg-gray-900 shadow-2xl"
                  : " sm:mx-8 lg:mx-0 border border-white/10",
                tier.featured
                  ? ""
                  : tierIdx === 0
                  ? "rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl"
                  : "sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none",
                "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10"
              )}
            >
              <h3
                id={tier.id}
                className={classNames(
                  tier.featured ? "text-blue-400" : "text-blue-600",
                  "text-base font-semibold"
                )}
              >
                {tier.name}
              </h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span
                  className={classNames(
                    tier.featured ? "text-white" : "text-white",
                    "text-5xl font-semibold tracking-tight"
                  )}
                >
                  {tier.priceMonthly}
                </span>
                <span
                  className={classNames(
                    tier.featured ? "text-white" : "text-white",
                    "text-base"
                  )}
                >
                  {tier.featured ? "por vendas" : "em pontos"}
                </span>
              </p>
              <p
                className={classNames(
                  tier.featured ? "text-white" : "text-white",
                  "mt-6 text-base"
                )}
              >
                {tier.description}
              </p>
              <ul
                role="list"
                className={classNames(
                  tier.featured ? "text-white" : "text-white",
                  "mt-8 space-y-3 text-sm sm:mt-10"
                )}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      aria-hidden="true"
                      className={classNames(
                        tier.featured ? "text-blue-400" : "text-blue-600",
                        "h-6 w-5 flex-none"
                      )}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.featured
                    ? "bg-blue-500 text-white hover:bg-blue-400 "
                    : "text-white ring-1 border border-white/10  ",
                  "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold sm:mt-10"
                )}
              >
                {tier.featured ? "Acessar a conta" : "Criar conta"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
