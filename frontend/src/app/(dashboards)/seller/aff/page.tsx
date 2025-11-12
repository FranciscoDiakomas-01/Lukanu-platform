"use client";

import EbookAffiliateCard from "@/components/Afiliation";
import DashordHeader from "@/components/DashordHeader";
import EBookClientService from "@/service/Ebook";
import { Afiliation } from "@/types/Afiliation";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function AfiliationsPage() {
  const [aff, setAff] = useState<Afiliation[]>();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("acess");

    async function get() {
      const data = await new EBookClientService(
        token as string
      ).getMyAfiliations();
      setAff(data);
      setLoad(false);
    }
    get();
  });
  return (
    <section className="w-full pb-20  flex-col min-h-screen flex gap-4">
      <DashordHeader whoIs="seller" showInput={false} />

      {load ? (
        <div className="flex justify-center items-center h-[60dvh]">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <article>
          {Array.isArray(aff) && aff.length > 0 ? (
            <span className="grid lg:grid-cols-3 gap-4">
              {aff.map((item, idx) => (
                <EbookAffiliateCard data={item} key={idx} />
              ))}
            </span>
          ) : (
            <div></div>
          )}
        </article>
      )}
    </section>
  );
}
