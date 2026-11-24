"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Phone, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getTodayKey, MINI_SITE_DATA, type MiniSiteData } from "./miniSiteData";

type MiniSiteModalProps = {
  open: boolean;
  onClose: () => void;
  data?: MiniSiteData;
};

function HoursStatus({ data }: { data: MiniSiteData }) {
  const todayKey = getTodayKey();
  const [selectedDay, setSelectedDay] = useState(todayKey);
  const selected = data.hoursByDay.find((day) => day.key === selectedDay) ?? data.hoursByDay[0];

  return (
    <section className="space-y-4">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
        <span
          className={cn(
            "size-2.5 rounded-full",
            data.isOpen ? "bg-emerald-400 shadow-[0_0_0_4px_rgba(74,222,128,0.15)]" : "bg-red-400 shadow-[0_0_0_4px_rgba(248,113,113,0.15)]"
          )}
          aria-hidden="true"
        />
        <span className="font-semibold text-white">{data.isOpen ? "باز است" : "بسته است"}</span>
        <span className="text-white/60">{data.statusDescription}</span>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <p className="text-sm text-white/50">ساعات کاری</p>
        <div className="mt-2 flex items-center gap-2">
          <h3 className="text-2xl font-bold text-white">{selected.label}</h3>
          {selected.key === todayKey && (
            <span className="rounded-full bg-amber-400/15 px-2.5 py-1 text-xs font-medium text-amber-300">
              امروز
            </span>
          )}
        </div>
        <p className="mt-3 text-lg font-semibold text-white/90">{selected.hours}</p>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {data.hoursByDay.map((day) => {
            const active = day.key === selectedDay;
            const isToday = day.key === todayKey;
            return (
              <button
                key={day.key}
                type="button"
                onClick={() => setSelectedDay(day.key)}
                className={cn(
                  "flex min-w-11 flex-col items-center justify-center gap-1 rounded-2xl border px-3 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
                  active
                    ? "border-amber-400/40 bg-amber-400 text-neutral-950"
                    : "border-white/10 bg-black/20 text-white/70 hover:bg-white/10 hover:text-white"
                )}
                aria-pressed={active}
                aria-label={day.label}
              >
                <span className="text-sm font-semibold">{day.shortLabel}</span>
                {isToday && (
                  <span className={cn("text-[10px]", active ? "text-neutral-800" : "text-amber-300")}>
                    امروز
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AmenitiesList({ data }: { data: MiniSiteData }) {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-bold text-white">امکانات</h3>
      <div className="space-y-5">
        {data.amenities.map((group) => (
          <div key={group.title} className="space-y-3">
            <p className="text-sm font-medium text-white/55">{group.title}</p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/85"
                >
                  <span className="text-base leading-none" aria-hidden="true">{item.icon}</span>
                  <span>{item.label}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PhotoGallery({ data }: { data: MiniSiteData }) {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-bold text-white">گالری تصاویر</h3>
      <div className="-mx-5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6">
        <div className="flex gap-3">
          {data.gallery.map((photo) => (
            <div
              key={photo.src}
              className="relative h-44 w-[78%] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-neutral-800 sm:h-52 sm:w-[60%]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 78vw, 420px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationCard({ data }: { data: MiniSiteData }) {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-bold text-white">موقعیت مکانی</h3>
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <a
          href={data.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block h-52 w-full overflow-hidden bg-neutral-800"
          aria-label="باز کردن نقشه"
        >
          <Image
            src={data.mapImage}
            alt="نقشه موقعیت رستوران"
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
            <div className="flex size-11 items-center justify-center rounded-full bg-amber-400 text-neutral-950 shadow-lg">
              <MapPin className="size-5" aria-hidden="true" />
            </div>
          </div>
        </a>

        <div className="space-y-4 p-5">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 size-5 shrink-0 text-amber-300" aria-hidden="true" />
            <p className="text-sm leading-7 text-white/80">{data.address}</p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <a
              href={`tel:${data.phone}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-md"
            >
              <Phone className="size-4" aria-hidden="true" />
              <span dir="ltr">{data.phoneDisplay}</span>
            </a>

            <a
              href={data.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="تلگرام"
              className="flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-sky-500/20 hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <Send className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MiniSiteModal({ open, onClose, data = MINI_SITE_DATA }: MiniSiteModalProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[70] transition-opacity duration-300",
        open ? "opacity-100" : "pointer-events-none opacity-0"
      )}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="minisite-title"
        inert={!open}
        className={cn(
          "absolute inset-x-0 bottom-0 top-[4svh] mx-auto flex w-full max-w-2xl flex-col overflow-hidden rounded-t-[2rem] border border-white/10 bg-neutral-950 text-white shadow-2xl transition-transform duration-300 sm:top-[6svh]",
          open ? "translate-y-0" : "translate-y-8"
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <p className="text-xs text-white/45">اطلاعات رستوران</p>
            <h2 id="minisite-title" className="text-lg font-bold text-white">مینی‌وبسایت</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن"
            className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6">
          <div className="space-y-8">
            <HoursStatus data={data} />
            <AmenitiesList data={data} />
            <PhotoGallery data={data} />
            <LocationCard data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
