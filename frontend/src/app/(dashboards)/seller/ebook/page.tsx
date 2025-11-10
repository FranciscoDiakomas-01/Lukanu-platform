"use client";

import DashordHeader from "@/components/DashordHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateEbookForm from "./ebook";
import ShinyText from "@/components/animated/ShineText/indext";
import CreateBook from "./impress";
export default function createEbook() {
  return (
    <main className="w-full pb-20   flex-col min-h-screen flex gap-4">
      <DashordHeader 
        whoIs="seller" showInput={false} />

      <Tabs
        defaultValue="ebook"
        className="w-full px-4 justify-center items-center flex flex-col"
      >
        <TabsList className="lg:w-[50%] w-full">
          <TabsTrigger value="ebook">Ebook</TabsTrigger>
          <TabsTrigger value="impress">Livro Impressos</TabsTrigger>
        </TabsList>
        <TabsContent value="ebook" className="lg:w-[50%] mt-5 w-full">
          <div className="flex justify-center items-center w-full">
            <ShinyText
              text="Cadastro de livro digital"
              className="text-center lg:text-3xl text-2xl mb-4"
            />
          </div>
          <CreateEbookForm />
        </TabsContent>

        <TabsContent value="impress" className="lg:w-[50%] mt-5 w-full">
          <div className="flex justify-center items-center w-full">
            <ShinyText
              text="Cadastro de livro físico"
              className="text-center lg:text-3xl text-2xl mb-4"
            />
          </div>
          <CreateBook />
        </TabsContent>
      </Tabs>
    </main>
  );
}
