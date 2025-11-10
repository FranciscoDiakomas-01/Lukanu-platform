import { AnimatedTestimonials } from "@/components/Testmonial";

export default function EbookTestMonial() {
  const testimonials = [
    {
      quote:
        "A atenção aos detalhes e os recursos inovadores transformaram completamente a forma como encontramos e lemos ebooks. É exatamente o que eu procurava.",
      name: "Sarah Chen",
      designation: "Leitora ávida e revisora literária",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "A plataforma foi fácil de usar desde o início e superou minhas expectativas. A variedade de ebooks e a navegação simples fazem toda a diferença.",
      name: "Michael Rodriguez",
      designation: "Desenvolvedor e entusiasta de leitura digital",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Essa solução melhorou muito minha experiência de leitura. A interface intuitiva torna a descoberta de novos títulos muito mais prazerosa.",
      name: "Emily Watson",
      designation: "Diretora de operações e amante de ebooks",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return <AnimatedTestimonials testimonials={testimonials}/>;
}
