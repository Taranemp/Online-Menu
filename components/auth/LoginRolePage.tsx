"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RoleSelector from "./RoleSelector";
import CustomerLogin from "./CustomerLogin";
import AdminLoginForm from "./AdminLoginForm";

type Role = "select" | "customer" | "admin";

export default function LoginRolePage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("select");

  const goHome = () => {
    router.push("/");
  };

  const goAdmin = () => {
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative z-0">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-lg p-6 sm:p-8 relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">ورود به سیستم</h1>
          <p className="text-sm text-slate-500">نقش خود را انتخاب کنید</p>
        </div>

        {role === "select" && (
          <RoleSelector
            onCustomer={() => setRole("customer")}
            onAdmin={() => setRole("admin")}
            onGoHome={goHome}
          />
        )}

        {role === "customer" && (
          <CustomerLogin onLogin={goHome} onBack={() => setRole("select")} />
        )}

        {role === "admin" && (
          <AdminLoginForm onLogin={goAdmin} onBack={() => setRole("select")} />
        )}
      </div>
    </div>
  );
}
