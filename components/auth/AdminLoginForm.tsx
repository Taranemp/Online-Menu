"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { ADMIN_PASSWORD, setAdminAuthed } from "@/lib/storage";

type Props = {
  onLogin: () => void;
  onBack: () => void;
};

export default function AdminLoginForm({ onLogin, onBack }: Props) {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      try {
        setAdminAuthed();
      } catch {
        // ignore storage errors
      }
      onLogin();
    } else {
      setError("رمز عبور اشتباه است");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-white/10 rounded-xl">
        <span className="p-2 rounded-lg bg-slate-900 dark:bg-neutral-700 text-white inline-flex">
          <Lock className="w-4 h-4" />
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">ورود مدیر</p>
          <p className="text-xs text-slate-500 dark:text-neutral-400">رمز عبور را وارد کنید</p>
        </div>
      </div>
      <div>
        <label htmlFor="admin-password" className="block text-sm font-medium text-slate-800 dark:text-neutral-200 mb-1">
          رمز عبور
        </label>
        <div className="relative">
          <input
            id="admin-password"
            name="password"
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className="w-full pr-3 pl-10 py-2.5 bg-white dark:bg-neutral-900 border border-slate-300 dark:border-white/10 rounded-lg text-slate-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-neutral-700 focus:border-slate-400 dark:focus:border-neutral-600"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 dark:text-neutral-500 hover:text-slate-600 dark:hover:text-neutral-300 active:text-slate-600 dark:active:text-neutral-300 cursor-pointer touch-manipulation"
            aria-label={show ? "پنهان کردن رمز" : "نمایش رمز"}
          >
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {error && <p className="text-xs text-red-500 dark:text-red-400 mt-1">{error}</p>}
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-slate-900 dark:bg-amber-400 text-white dark:text-neutral-950 rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-amber-300 active:bg-slate-800 dark:active:bg-amber-300 transition cursor-pointer touch-manipulation"
      >
        ورود به پنل ادمین
      </button>
      <button
        type="button"
        onClick={onBack}
        className="w-full py-2 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white active:text-slate-900 dark:active:text-white text-sm cursor-pointer touch-manipulation"
      >
        بازگشت
      </button>
    </form>
  );
}
