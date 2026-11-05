"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff } from "lucide-react";

const ADMIN_PASSWORD = "admin123"; // Replace with real auth in production

export default function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("admin_auth", "1");
      onSuccess();
    } else {
      setError("رمز عبور اشتباه است");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-slate-900 text-white">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">ورود به پنل ادمین</h1>
            <p className="text-sm text-slate-500">برای مدیریت منو وارد شوید</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium text-slate-800 mb-1">
              رمز عبور
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-3 pl-10 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label={show ? "پنهان کردن رمز" : "نمایش رمز"}
              >
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition"
          >
            ورود
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="w-full py-2.5 text-slate-600 hover:text-slate-900 text-sm transition"
          >
            بازگشت به سایت
          </button>
        </form>
      </div>
    </div>
  );
}
