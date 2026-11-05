"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, User, Shield, ArrowRight } from "lucide-react";
import { ADMIN_PASSWORD, setAdminAuthed, setCustomerRole } from "@/lib/auth";

type Role = "select" | "customer" | "admin";

export default function LoginRolePage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("select");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleCustomer = () => {
    setCustomerRole();
    router.push("/");
  };

  const handleAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAdminAuthed();
      router.push("/admin");
    } else {
      setError("رمز عبور اشتباه است");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-lg p-6 sm:p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">ورود به سیستم</h1>
          <p className="text-sm text-slate-500">نقش خود را انتخاب کنید</p>
        </div>

        {role === "select" && (
          <div className="space-y-3">
            <button
              onClick={() => setRole("customer")}
              className="w-full flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition text-right"
            >
              <div className="p-3 rounded-xl bg-slate-900 text-white shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900">مشتری / مهمان</p>
                <p className="text-xs text-slate-500">مشاهده منو بدون نیاز به رمز عبور</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 rotate-180" />
            </button>

            <button
              onClick={() => setRole("admin")}
              className="w-full flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition text-right"
            >
              <div className="p-3 rounded-xl bg-slate-700 text-white shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900">مدیر سیستم</p>
                <p className="text-xs text-slate-500">ورود به پنل مدیریت منو</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 rotate-180" />
            </button>

            <button
              type="button"
              onClick={() => router.push("/")}
              className="w-full py-2.5 text-slate-600 hover:text-slate-900 text-sm transition mt-2"
            >
              بازگشت به منو
            </button>
          </div>
        )}

        {role === "customer" && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <User className="w-8 h-8 text-slate-700 mx-auto mb-2" />
              <p className="text-sm text-slate-700">به عنوان مشتری وارد می‌شوید و به منو هدایت می‌شوید.</p>
            </div>
            <button
              onClick={handleCustomer}
              className="w-full py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition"
            >
              ورود به منو
            </button>
            <button
              onClick={() => setRole("select")}
              className="w-full py-2 text-slate-600 hover:text-slate-900 text-sm"
            >
              بازگشت
            </button>
          </div>
        )}

        {role === "admin" && (
          <form onSubmit={handleAdmin} className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="p-2 rounded-lg bg-slate-900 text-white">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">ورود مدیر</p>
                <p className="text-xs text-slate-500">رمز عبور را وارد کنید</p>
              </div>
            </div>
            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-slate-800 mb-1">
                رمز عبور
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  className="w-full pr-3 pl-10 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400"
                  autoFocus
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
              className="w-full py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition"
            >
              ورود به پنل ادمین
            </button>
            <button
              type="button"
              onClick={() => setRole("select")}
              className="w-full py-2 text-slate-600 hover:text-slate-900 text-sm"
            >
              بازگشت
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
