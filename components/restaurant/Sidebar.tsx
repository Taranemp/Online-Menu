"use client";

import { useState } from "react";
import { User, Grid, Phone, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={`hidden md:flex fixed top-0 bottom-0 left-0 z-50 flex-col justify-between bg-[#1f1f1f] text-white py-6 shadow-2xl transition-all duration-300 ease-in-out ${
        isExpanded ? "w-72" : "w-24"
      }`}
    >
      {/* دکمه‌ی تگل در وسط ارتفاع سایدبار */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-4 top-1/2 -translate-y-1/2 size-8 rounded-full bg-white text-slate-800 shadow-md flex items-center justify-center hover:bg-slate-100 transition border border-slate-200 z-50"
        aria-label="Toggle Sidebar"
      >
        {isExpanded ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
      </button>

      {/* بخش بالای سایدبار (لوگو) */}
      <div className="flex flex-col items-center px-4 shrink-0">
        <Link 
          href="/" 
          className={`flex items-center justify-center rounded-2xl bg-[#0b3b2c] border border-emerald-500/30 hover:bg-[#0f4c3a] transition shadow-inner ${
            isExpanded ? "w-full p-4 flex-col text-center" : "size-16"
          }`}
        >
          {isExpanded ? (
            <>
              <div className="size-20 rounded-xl bg-[#082a20] border border-emerald-500/30 shadow-md flex items-center justify-center text-emerald-400 font-bold mb-2">
                <span className="text-xs">کارولانز</span>
              </div>
              <span className="font-extrabold text-sm tracking-wide text-white">
                کارولانز
              </span>
            </>
          ) : (
            <span className="font-extrabold text-xl text-emerald-400">ک</span>
          )}
        </Link>
      </div>

      <div className="w-10 h-[1px] bg-white/10 mx-auto my-2 shrink-0"></div>

      {/* لینک‌ها و آیکون‌ها */}
      <div className="flex flex-col items-center gap-3 w-full px-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
        {/* ورود / ثبت نام */}
        <Link 
          href="/account/login" 
          className="relative flex items-center gap-3 group w-full p-2 rounded-2xl hover:bg-white/5 transition"
        >
          <div className="size-14 rounded-2xl bg-white text-slate-900 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
            <User className="size-6 text-slate-800" />
          </div>
          {isExpanded && (
            <span className="text-xs font-medium text-slate-200 truncate">ثبت‌نام / ورود</span>
          )}
          {!isExpanded && (
            <div className="absolute left-full ml-4 px-3.5 py-2 bg-[#2b2b2b] text-white text-xs font-medium rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap z-50 border border-neutral-700">
              ثبت‌نام / ورود
            </div>
          )}
        </Link>

        {/* منو محصولات */}
        <Link 
          href="/" 
          className="relative flex items-center gap-3 group w-full p-2 rounded-2xl hover:bg-white/5 transition"
        >
          <div className="size-14 rounded-2xl bg-amber-400 text-slate-900 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
            <Grid className="size-6 text-slate-900" />
          </div>
          {isExpanded && (
            <span className="text-xs font-medium text-slate-200 truncate">مشاهده منو</span>
          )}
          {!isExpanded && (
            <div className="absolute left-full ml-4 px-3.5 py-2 bg-[#2b2b2b] text-white text-xs font-medium rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap z-50 border border-neutral-700">
              مشاهده منو
            </div>
          )}
        </Link>

        {/* تماس با ما */}
        <a 
          href="tel:0130000000" 
          className="relative flex items-center gap-3 group w-full p-2 rounded-2xl hover:bg-white/5 transition"
        >
          <div className="size-14 rounded-2xl bg-white text-slate-900 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
            <Phone className="size-6 text-slate-800" />
          </div>
          {isExpanded && (
            <span className="text-xs font-medium text-slate-200 truncate">تماس با ما</span>
          )}
          {!isExpanded && (
            <div className="absolute left-full ml-4 px-3.5 py-2 bg-[#2b2b2b] text-white text-xs font-medium rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap z-50 border border-neutral-700">
              تماس با ما
            </div>
          )}
        </a>

      </div>

      <div className="w-10 h-[1px] bg-white/10 mx-auto my-2 shrink-0"></div>

      {/* بخش پایین (حساب کاربری / خروج) */}
      <div className="px-4 shrink-0">
        <button 
          className="relative flex items-center gap-3 group w-full p-2 rounded-2xl hover:bg-red-500/10 transition"
        >
          <div className="size-14 rounded-2xl bg-white text-slate-900 shadow-md flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition shrink-0">
            <LogOut className="size-6" />
          </div>
          {isExpanded && (
            <span className="text-xs font-medium text-slate-400 group-hover:text-red-400 truncate">حساب کاربری</span>
          )}
          {!isExpanded && (
            <div className="absolute left-full ml-4 px-3.5 py-2 bg-[#2b2b2b] text-white text-xs font-medium rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap z-50 border border-neutral-700">
              حساب کاربری
            </div>
          )}
        </button>
      </div>

    </aside>
  );
}