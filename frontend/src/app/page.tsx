"use client";

import { useRef, useState } from "react";
import NDAForm from "@/components/NDAForm";
import NDAPreview from "@/components/NDAPreview";
import DownloadButton from "@/components/DownloadButton";
import { NDAFormData, defaultFormData } from "@/lib/types";

export default function Home() {
  const [formData, setFormData] = useState<NDAFormData>(defaultFormData);
  const previewRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Prelegal</h1>
            <p className="text-sm text-gray-500">Mutual NDA Creator</p>
          </div>
          <DownloadButton previewRef={previewRef} />
        </div>
      </header>

      <main className="flex flex-1">
        <aside className="w-[420px] shrink-0 overflow-y-auto border-r border-gray-200 bg-gray-50 p-6">
          <NDAForm formData={formData} onChange={setFormData} />
        </aside>

        <section className="flex-1 overflow-y-auto bg-gray-100 p-8">
          <div className="rounded-lg shadow-lg">
            <NDAPreview formData={formData} previewRef={previewRef} />
          </div>
        </section>
      </main>
    </div>
  );
}
