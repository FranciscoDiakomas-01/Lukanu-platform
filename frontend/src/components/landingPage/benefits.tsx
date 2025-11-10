import {
  BookOpen,
  UsersIcon,
  MessageCircleIcon,
  DollarSign,
  Share2,
} from "lucide-react";
import dash2 from "@/assets/dash2.jpg"; // Trocar para imagem de livro, se quiser

export default function Benefits() {
  const features = [
    {
      name: "Publique seu livro digital ou físico",
      description:
        "Autores independentes podem publicar e vender suas obras diretamente na plataforma.",
      icon: BookOpen,
    },
    {
      name: "Conecte-se com leitores",
      description:
        "Alcance leitores de todo o país e receba feedbacks e avaliações.",
      icon: UsersIcon,
    },
    {
      name: "Chat com compradores e afiliados",
      description:
        "Comunique-se diretamente com leitores ou parceiros para impulsionar suas vendas.",
      icon: MessageCircleIcon,
    },
    {
      name: "Receba comissões como afiliado",
      description:
        "Divulgue livros e ganhe comissões por cada venda realizada via seu link exclusivo.",
      icon: DollarSign,
    },
    {
      name: "Compartilhe seu link em redes sociais",
      description:
        "Use seu link de afiliado para promover livros em qualquer canal e ganhar por isso.",
      icon: Share2,
    },
  ];

  return (
    <section id="benefis">
      <div className="overflow-hidden py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <h2 className="text-base/7 font-semibold text-blue-400">
                  Leitura e renda ao seu alcance
                </h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
                  A revolução dos livros em Angola
                </p>
                <p className="mt-6 text-lg/8 text-gray-300">
                  A Lukanu conecta autores, leitores e afiliados em um só lugar.
                  Publique, leia, compartilhe e ganhe com livros que valorizam a
                  educação e o empreendedorismo digital.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-400 lg:max-w-none">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-white">
                        <feature.icon
                          aria-hidden="true"
                          className="absolute top-1 left-1 size-5 text-blue-400"
                        />
                        {feature.name}
                      </dt>{" "}
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <img
              alt="Imagem ilustrativa da Lukanu"
              src={dash2.src}
              width={2432}
              height={1442}
              className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-white/10 sm:w-228 md:-ml-4 lg:-ml-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
