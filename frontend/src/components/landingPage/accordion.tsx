"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: "01",
    question: "O que é a Lukanu?",
    answer:
      "A Lukanu é uma plataforma onde você pode comprar e vender eBooks e livros físicos. Autores podem publicar suas obras e qualquer pessoa pode se tornar um afiliado para promover livros e ganhar comissões.",
  },
  {
    id: "02",
    question: "Como ganho dinheiro como afiliado?",
    answer:
      "Você se cadastra como afiliado, escolhe os livros disponíveis e compartilha seu link exclusivo. A cada venda realizada através do seu link, você recebe uma comissão automática.",
  },
  {
    id: "03",
    question: "Posso publicar meus próprios livros?",
    answer:
      "Sim! Você pode publicar eBooks e livros físicos na Lukanu com total controle sobre preços, descrições e comissões para afiliados. É uma ótima forma de alcançar leitores e gerar renda.",
  },
  {
    id: "04",
    question: "Quais são os métodos de pagamento?",
    answer:
      "Aceitamos diversos métodos como cartão, transferência e carteiras digitais locais. Os afiliados e autores recebem os lucros diretamente nas suas contas bancárias ou carteiras registradas.",
  },
  {
    id: "05",
    question: "A Lukanu é gratuita?",
    answer:
      "Sim, o cadastro na plataforma é totalmente gratuito. Apenas taxas administrativas são aplicadas sobre vendas realizadas, para manter o funcionamento do marketplace.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number | null) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">
        Perguntas Frequentes
      </h2>
      <p className="text-center mb-6 text-white">
        Ainda tem dúvidas? Fale conosco pelo e-mail{" "}
        <span className="text-blue-500">suporte@lukanu.com</span> ou visite a
        nossa central de ajuda.
      </p>
      <div className="space-y-4">
        {faqs.map((item, index) => (
          <div
            key={item.id}
            className="border border-gray-300 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center p-4 bg-gray-900/10 hover:bg-gray-50 transition"
            >
              <span className="font-medium text-left text-blue-500">
                {item.id} — {item.question}
              </span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="text-blue-500" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pb-4 text-white whitespace-pre-line"
                >
                  {item.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
