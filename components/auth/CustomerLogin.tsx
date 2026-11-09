"use client";

import { User } from "lucide-react";
import { setCustomerRole } from "@/lib/storage";

type Props = {
  onLogin: () => void;
  onBack: () => void;
};

export default function CustomerLogin({ onLogin, onBack }: Props) {
  const handleLogin = () => {
    try {
      setCustomerRole();
    } catch {
      // ignore storage errors
    }
    onLogin();
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
        <User className="w-8 h-8 text-slate-700 mx-auto mb-2" />
        <p className="text-sm text-slate-700">به عنوان مشتری وارد می‌شوید و به منو هدایت می‌شوید.</p>
      </div>
      <button
        type="button"
        onClick={handleLogin}
        className="w-full py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 active:bg-slate-800 transition cursor-pointer touch-manipulation"
      >
        ورود به منو
      </button>
      <button
        type="button"
        onClick={onBack}
        className="w-full py-2 text-slate-600 hover:text-slate-900 active:text-slate-900 text-sm cursor-pointer touch-manipulation"
      >
        بازگشت
      </button>
    </div>
  );
}
