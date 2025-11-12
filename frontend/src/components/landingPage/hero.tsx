"use client";
import dash from "@/assets/dash1.jpg";
import nubla from "@/constants/nubla";
import Image from "next/image";
import { useRouter } from "next/navigation";
import BlurText from "../animated/BlurText";
import ShinyText from "../animated/Shine";
export default function Hero() {
  const router = useRouter();
  return (
    <div
      className="text-white min-h-screen overflow-x-hidden pb-8"
      data-aos="fade-up"
    >
      <div className="relative isolate px-6 pt-1 lg:px-8 ">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          data-aos="fade-right"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[rgb(39,90,211)] to-[#3787e8] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>

        <div className="flex mt-30 lg:mt-48 flex-col  gap-4">
          <div className="flex justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-white ring-1 ring-white/10 hover:ring-white/20 flex gap-1 items-center bg-blue-400/10 animate-bounce">
              Ganhe dinheiro com{" "}
              <p className="font-semibold text-blue-600"> afiliações</p>
            </div>
          </div>
          <div className="flex text-center justify-center items-center place-self-center lg:w-[70%] flex-col">
            <div className="flex justify-center items-center flex-wrap text-center">
              <BlurText
                text="Compre, venda e indique eBooks e livros com facilidade na"
                delay={150}
                animateBy="words"
                direction="top"
                className=" md:text-7xl text-center font-semibold text-white text-3xl "
              />

              <span className=" md:text-7xl  text-center font-semibold text-3xl  text-blue-600">
                Lukanu
              </span>
            </div>

            <ShinyText
              className="my-5 text-sm font-medium text-pretty text-gray-500 sm:text-lg"
              text=" Conectamos pessoas indo para o mesmo lugar para dividir o táxi com
              segurança"
            />
            <div className="flex gap-4 my-6 justify-center w-full md:flex-row flex-col">
              <a
                data-aos-delay="0"
                data-aos="fade-up"
                href="/enter"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 md:w-[180px] w-full"
             
              >
                Começar agora
              </a>
              <a
                href="#about"
                className="rounded-md border border-white/10 0 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs  md:w-[180px] w-full"
                data-aos-delay="300"
                data-aos="fade-up"
              >
                Saber mais
              </a>
            </div>
          </div>
        </div>
        <div
          data-aos="zoom-in"
          data-aos-duration="2000"
          data-aos-easing="linear"
          data-aos-offset="300"
          className="lg:w-[90%] mt-5 rounded-md place-self-center shadow-[0_0_20px_4px_#275ad3] relative "
        >
          <div className="absolute  inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
          <Image className="h-full w-full rounded-md" src={dash} alt="dah" />
        </div>
      </div>
    </div>
  );
}
