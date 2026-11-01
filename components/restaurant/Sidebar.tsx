"use client";

import { useState } from "react";
import { User, Grid, Phone, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      style={{ width: isExpanded ? "280px" : "96px" }}
      className="hidden md:flex fixed top-0 bottom-0 left-0 z-50 flex-col justify-between bg-[#1f1f1f] text-white py-6 shadow-2xl transition-all duration-300 ease-in-out"
    >
      {/* دکمه‌ی تگل در وسط ارتفاع سایدبار */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-slate-800 shadow-md flex items-center justify-center hover:bg-slate-100 transition border border-slate-200 z-50 cursor-pointer"
      >
        {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* بخش بالای سایدبار (لوگو) */}
      <div className="flex flex-col items-center px-4 shrink-0">
        <Link 
          href="/" 
          className={`flex items-center justify-center rounded-2xl bg-[#0b3b2c] border border-emerald-500/30 hover:bg-[#0f4c3a] transition shadow-inner ${
            isExpanded ? "w-full p-4 flex-col text-center" : "w-16 h-16"
          }`}
        >
          {isExpanded ? (
            <span className="font-extrabold text-sm tracking-wide text-white">
              کارولانز
            </span>
          ) : (
            <span className="font-extrabold text-xl text-emerald-400">ک</span>
          )}
        </Link>
      </div>

      <div className="w-10 h-[1px] bg-white/10 mx-auto my-2 shrink-0"></div>

      {/* لینک‌ها و آیکون‌ها */}
      <div className="flex flex-col items-center gap-3 w-full px-4 overflow-y-auto">
        
        {/* ورود / ثبت نام */}
        <Link 
          href="/account/login" 
          className="relative flex items-center gap-3 group w-full p-2 rounded-2xl hover:bg-white/5 transition"
        >
          <div className="w-14 h-14 rounded-2xl bg-white text-slate-900 shadow-md flex items-center justify-center shrink-0">
            <User size={24} className="text-slate-800" />
          </div>
          {isExpanded && (
            <span className="text-xs font-medium text-slate-200 truncate">ثبت‌نام / ورود</span>
          )}
        </Link>

        {/* منو محصولات */}
        <Link 
          href="/" 
          className="relative flex items-center gap-3 group w-full p-2 rounded-2xl hover:bg-white/5 transition"
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-900 shadow-md flex items-center justify-center shrink-0">
            <Grid size={24} className="text-slate-900" />
          </div>
          {isExpanded && (
            <span className="text-xs font-medium text-slate-200 truncate">مشاهده منو</span>
          )}
        </Link>

        {/* تماس با ما */}
        <a 
          href="tel:0130000000" 
          className="relative flex items-center gap-3 group w-full p-2 rounded-2xl hover:bg-white/5 transition"
        >
          <div className="w-14 h-14 rounded-2xl bg-white text-slate-900 shadow-md flex items-center justify-center shrink-0">
            <Phone size={24} className="text-slate-800" />
          </div>
          {isExpanded && (
            <span className="text-xs font-medium text-slate-200 truncate">تماس با ما</span>
          )}
        </a>

      </div>

      <div className="w-10 h-[1px] bg-white/10 mx-auto my-2 shrink-0"></div>

      {/* بخش پایین (حساب کاربری / خروج) */}
      <div className="px-4 shrink-0">
        <button 
          type="button"
          className="relative flex items-center gap-3 group w-full p-2 rounded-2xl hover:bg-red-500/10 transition cursor-pointer"
        >
          <div className="w-14 h-14 rounded-2xl bg-white text-slate-900 shadow-md flex items-center justify-center shrink-0">
            <LogOut size={24} />
          </div>
          {isExpanded && (
            <span className="text-xs font-medium text-slate-400 group-hover:text-red-400 truncate">حساب کاربری</span>
          )}
        </button>
      </div>

    </aside>
  );
}