"use client";

import { useState } from "react";
import Image from "next/image";
import { FileText } from "lucide-react";
import type { MenuItem } from "./menuData";

type MenuItemCardProps = {
  item: MenuItem;
};

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-neutral-900/80 shadow-lg">
      <div className="px-5 pt-5 text-right">
        <h3 className="text-2xl font-bold leading-tight text-white">{item.name}</h3>
        <p className="mt-2 text-sm leading-7 text-white/55">{item.description}</p>
      </div>

      <div className="px-4 pb-4 pt-4">
        <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[1.25rem] bg-neutral-800">
          {!imageFailed && item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-neutral-800 text-sm text-white/40">
              تصویر در دسترس نیست
            </div>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />

          <span className="absolute bottom-3 right-3 rounded-full bg-black/35 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
            {item.name}
          </span>

          <button
            type="button"
            aria-label={`جزئیات ${item.name}`}
            className="absolute bottom-3 left-3 flex size-10 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-md transition-colors hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <FileText className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}