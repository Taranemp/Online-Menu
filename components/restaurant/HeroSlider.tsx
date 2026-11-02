"use client";

import React, { useState, useEffect } from "react";

const bannerItems = [
  {
    id: 1,
    title: "ترکیش بودو",
    description: "نان داغ سنتی، دیپ پنیر، سیب‌زمینی، خیارشور و...",
    price: "۹۱۰,۰۰۰ تومان",
  },
  {
    id: 2,
    title: "املت ترکی کینوا",
    description: "املت کینوا، بیکن بوقلمون، دلمه رنگی، قارچ، پنیر پیتزا",
    price: "۲۹۹,۰۰۰ تومان",
  },
  {
    id: 3,
    title: "بشقاب رژیمی",
    description: "فیله مرغ گریل، کلم بروکلی، کدو خیاری، پورسیب‌زمینی، هویج",
    price: "۹۱۰,۰۰۰ تومان",
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full py-2 px-3 sm:py-4 sm:px-2 hidden md:block">
      <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-sm border border-slate-100 p-4 sm:p-6">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(${currentIndex * 100}%)` }}
        >
          {bannerItems.map((item) => (
            <div 
              key={item.id} 
              className="w-full shrink-0 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 px-2 sm:px-4"
            >
              <div className="flex flex-col items-start text-right max-w-lg space-y-2 sm:space-y-3">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
                <div className="text-base sm:text-lg font-bold text-amber-500 mt-1 sm:mt-2">
                  {item.price}
                </div>
              </div>

              <div className="relative size-32 sm:size-48 md:size-60 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 rounded-full bg-slate-100/80 scale-125"></div>
                <div className="absolute inset-0 rounded-full bg-slate-200/50 scale-100"></div>
                
                <div className="relative z-10 size-28 sm:size-40 md:size-48 rounded-full overflow-hidden shadow-lg border-4 border-white bg-white flex items-center justify-center text-xs text-slate-400">
                  <span>عکس غذا</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 mt-4 sm:mt-6">
          {bannerItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index ? "w-8 bg-amber-500" : "w-2 bg-slate-200"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}