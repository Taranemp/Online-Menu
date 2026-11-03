"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";

type TabType = "login" | "register";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<TabType>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    fullName: "",
    identifier: "",
    password: "",
  });

  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});
  const [registerErrors, setRegisterErrors] = useState<Record<string, string>>({});

  const validateLogin = () => {
    const errors: Record<string, string> = {};
    if (!loginData.identifier.trim()) {
      errors.identifier = "شماره تلفن یا ایمیل الزامی است";
    }
    if (!loginData.password) {
      errors.password = "رمز عبور الزامی است";
    } else if (loginData.password.length < 6) {
      errors.password = "رمز عبور باید حداقل ۶ کاراکتر باشد";
    }
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateRegister = () => {
    const errors: Record<string, string> = {};
    if (!registerData.fullName.trim()) {
      errors.fullName = "نام و نام خانوادگی الزامی است";
    }
    if (!registerData.identifier.trim()) {
      errors.identifier = "شماره تلفن یا ایمیل الزامی است";
    }
    if (!registerData.password) {
      errors.password = "رمز عبور الزامی است";
    } else if (registerData.password.length < 6) {
      errors.password = "رمز عبور باید حداقل ۶ کاراکتر باشد";
    }
    setRegisterErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRegister()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          
          <p className="text-slate-500">به حساب کاربری خود وارد شوید</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-lg shadow-slate-200/40 overflow-hidden">
          <div className="flex border-b border-slate-200">
            <button
              type="button"
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-4 text-sm font-medium transition-all duration-300 relative ${
                activeTab === "login"
                  ? "text-slate-900"
                  : "text-slate-500 hover:text-slate-700"
              }`}
              aria-pressed={activeTab === "login"}
            >
              ورود
              {activeTab === "login" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-4 text-sm font-medium transition-all duration-300 relative ${
                activeTab === "register"
                  ? "text-slate-900"
                  : "text-slate-500 hover:text-slate-700"
              }`}
              aria-pressed={activeTab === "register"}
            >
              ثبت‌نام
              {activeTab === "register" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900" />
              )}
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === "login" && (
              <form onSubmit={handleLoginSubmit} className="space-y-5" noValidate>
                <div className="space-y-2">
                  <label
                    htmlFor="login-identifier"
                    className="block text-sm font-medium text-slate-800"
                  >
                    شماره تلفن یا ایمیل
                  </label>
                  <div className="relative group">
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors duration-300">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      id="login-identifier"
                      type="text"
                      value={loginData.identifier}
                      onChange={(e) =>
                        setLoginData({ ...loginData, identifier: e.target.value })
                      }
                      className="w-full pr-10 pl-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400 transition-all duration-300 text-right"
                      dir="rtl"
                      aria-invalid={!!loginErrors.identifier}
                      aria-describedby={
                        loginErrors.identifier ? "login-identifier-error" : undefined
                      }
                    />
                  </div>
                  {loginErrors.identifier && (
                    <p
                      id="login-identifier-error"
                      className="text-xs text-red-400"
                      role="alert"
                    >
                      {loginErrors.identifier}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="login-password"
                    className="block text-sm font-medium text-slate-800"
                  >
                    رمز عبور
                  </label>
                  <div className="relative group">
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors duration-300">
                      <Lock className="w-5 h-5" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-300"
                      aria-label={showPassword ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      className="w-full pr-10 pl-10 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400 transition-all duration-300 text-right"
                      placeholder="رمز عبور خود را وارد کنید"
                      dir="rtl"
                      aria-invalid={!!loginErrors.password}
                      aria-describedby={
                        loginErrors.password ? "login-password-error" : undefined
                      }
                    />
                  </div>
                  {loginErrors.password && (
                    <p
                      id="login-password-error"
                      className="text-xs text-red-400"
                      role="alert"
                    >
                      {loginErrors.password}
                    </p>
                  )}
                </div>

                <div className="text-left">
                  <button
                    type="button"
                    className="text-sm text-slate-700 hover:text-slate-900 transition-colors duration-300"
                  >
                    رمز عبور را فراموش کرده‌اید؟
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-slate-900 text-white font-medium rounded-lg shadow-md shadow-slate-900/10 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {loading ? "در حال ورود..." : "ورود"}
                </button>
              </form>
            )}

            {activeTab === "register" && (
              <form
                onSubmit={handleRegisterSubmit}
                className="space-y-5"
                noValidate
              >
                <div className="space-y-2">
                  <label
                    htmlFor="register-fullname"
                    className="block text-sm font-medium text-slate-800"
                  >
                    نام و نام خانوادگی
                  </label>
                  <div className="relative group">
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors duration-300">
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      id="register-fullname"
                      type="text"
                      value={registerData.fullName}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, fullName: e.target.value })
                      }
                      className="w-full pr-10 pl-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400 transition-all duration-300 text-right"
                      placeholder="نام کامل خود را وارد کنید"
                      dir="rtl"
                      aria-invalid={!!registerErrors.fullName}
                      aria-describedby={
                        registerErrors.fullName
                          ? "register-fullname-error"
                          : undefined
                      }
                    />
                  </div>
                  {registerErrors.fullName && (
                    <p
                      id="register-fullname-error"
                      className="text-xs text-red-400"
                      role="alert"
                    >
                      {registerErrors.fullName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="register-identifier"
                    className="block text-sm font-medium text-slate-800"
                  >
                    شماره تلفن یا ایمیل
                  </label>
                  <div className="relative group">
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors duration-300">
                      <Phone className="w-5 h-5" />
                    </div>
                    <input
                      id="register-identifier"
                      type="text"
                      value={registerData.identifier}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          identifier: e.target.value,
                        })
                      }
                      className="w-full pr-10 pl-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400 transition-all duration-300 text-right"
                      dir="rtl"
                      aria-invalid={!!registerErrors.identifier}
                      aria-describedby={
                        registerErrors.identifier
                          ? "register-identifier-error"
                          : undefined
                      }
                    />
                  </div>
                  {registerErrors.identifier && (
                    <p
                      id="register-identifier-error"
                      className="text-xs text-red-400"
                      role="alert"
                    >
                      {registerErrors.identifier}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="register-password"
                    className="block text-sm font-medium text-slate-800"
                  >
                    رمز عبور
                  </label>
                  <div className="relative group">
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors duration-300">
                      <Lock className="w-5 h-5" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-300"
                      aria-label={showPassword ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                    <input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        })
                      }
                      className="w-full pr-10 pl-10 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400 transition-all duration-300 text-right"
                      placeholder="حداقل ۶ کاراکتر"
                      dir="rtl"
                      aria-invalid={!!registerErrors.password}
                      aria-describedby={
                        registerErrors.password
                          ? "register-password-error"
                          : undefined
                      }
                    />
                  </div>
                  {registerErrors.password && (
                    <p
                      id="register-password-error"
                      className="text-xs text-red-400"
                      role="alert"
                    >
                      {registerErrors.password}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-slate-900 text-white font-medium rounded-lg shadow-md shadow-slate-900/10 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
                </button>
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-slate-500 text-sm mt-6">
          با ورود یا ثبت‌نام، شما با شرایط و قوانین موافقت می‌کنید
        </p>
      </div>
    </div>
  );
}
