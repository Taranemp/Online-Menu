"use client";

import { User, Shield, ArrowRight } from "lucide-react";

type Props = {
  onCustomer: () => void;
  onAdmin: () => void;
  onGoHome: () => void;
};

export default function RoleSelector({ onCustomer, onAdmin, onGoHome }: Props) {
  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={onCustomer}
        className="w-full flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-slate-300 active:bg-slate-100 transition text-right cursor-pointer touch-manipulation select-none"
      >
        <span className="p-3 rounded-xl bg-slate-900 text-white shrink-0 inline-flex pointer-events-none">
          <User className="w-5 h-5" />
        </span>
        <span className="flex-1 block pointer-events-none">
          <span className="font-semibold text-slate-900 block">مشتری / مهمان</span>
          <span className="text-xs text-slate-500 block">مشاهده منو بدون نیاز به رمز عبور</span>
        </span>
        <ArrowRight className="w-4 h-4 text-slate-400 rotate-180 shrink-0 pointer-events-none" />
      </button>

      <button
        type="button"
        onClick={onAdmin}
        className="w-full flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-slate-300 active:bg-slate-100 transition text-right cursor-pointer touch-manipulation select-none"
      >
        <span className="p-3 rounded-xl bg-slate-700 text-white shrink-0 inline-flex pointer-events-none">
          <Shield className="w-5 h-5" />
        </span>
        <span className="flex-1 block pointer-events-none">
          <span className="font-semibold text-slate-900 block">مدیر سیستم</span>
          <span className="text-xs text-slate-500 block">ورود به پنل مدیریت منو</span>
        </span>
        <ArrowRight className="w-4 h-4 text-slate-400 rotate-180 shrink-0 pointer-events-none" />
      </button>

      <button
        type="button"
        onClick={onGoHome}
        className="block w-full py-2.5 text-center text-slate-600 hover:text-slate-900 active:text-slate-900 text-sm transition mt-2 cursor-pointer touch-manipulation"
      >
        بازگشت به منو
      </button>
    </div>
  );
}
