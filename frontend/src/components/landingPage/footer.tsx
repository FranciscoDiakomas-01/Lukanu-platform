import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 text-white py-3 mt-14">
      <div className="container mx-auto md:px-12 px-6 place-self-center pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-semibold mb-4">Navegação</h4>
            <ul>
              <li className="mb-2">
                <a
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Início
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#catalogo"
                  className="hover:text-white transition-colors duration-200"
                >
                  Catálogo
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#publique"
                  className="hover:text-white transition-colors duration-200"
                >
                  Publique seu livro
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#contato"
                  className="hover:text-white transition-colors duration-200"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>
   <div>
            <h4 className="text-white font-semibold mb-4">Categorias</h4>
            <ul>
              <li className="mb-2">
                <p
                  className="hover:text-white transition-colors duration-200"
                >
                  Ebooks
                </p>
              </li>
              <li className="mb-2">
                <p
                  className="hover:text-white transition-colors duration-200"
                >
                  Livros impressos
                </p>
              </li>
              <li className="mb-2">
                <p
                  className="hover:text-white transition-colors duration-200"
                >
                  Cursos
                </p>
              </li>
              <li className="mb-2">
                <p
                  className="hover:text-white transition-colors duration-200"
                >
                  Apostilas
                </p>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Suporte Oficial</h4>
            <ul>
              <li className="mb-2">
                <a
                  href="mailto:suporte@lukanu.com"
                  className="hover:text-white transition-colors duration-200"
                >
                  suporte@lukanu.com
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="tel:+244922718735"
                  className="hover:text-white transition-colors duration-200"
                >
                  +244 922 718 735
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Institucional</h4>
            <ul>
              <li className="mb-2">
                <a
                  href="#sobre"
                  className="hover:text-white transition-colors duration-200"
                >
                  Quem somos
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#missao"
                  className="hover:text-white transition-colors duration-200"
                >
                  Missão e Visão
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/termos"
                  className="hover:text-white transition-colors duration-200"
                >
                  Termos de uso
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/privacidade"
                  className="hover:text-white transition-colors duration-200"
                >
                  Política de privacidade
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Lukanu, todos os direitos
            reservados.
          </p>
          <div className="flex space-x-3 lg:w-[320px]">
            <a
              href="https://www.facebook.com/lukanu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-blue-500 transition-colors duration-200"
            >
              <Facebook size={22} />
            </a>
            <a
              href="https://www.instagram.com/lukanu.ao"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors duration-200"
            >
              <Instagram size={22} />
            </a>
            <a
              href="https://wa.me/244922718735?text=Ol%C3%A1%2C%20tenho%20interesse%20na%20Lukanu%20eBooks.%20Pode%20me%20ajudar%3F"
              aria-label="WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors duration-200"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
