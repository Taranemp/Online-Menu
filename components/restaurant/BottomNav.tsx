"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { User, Shield, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getUserRole } from "@/lib/auth";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

type BottomNavProps = {
  active?: string;
};

export default function BottomNav({ active = "/" }: BottomNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState<ReturnType<typeof getUserRole>>(null);

  useEffect(() => {
    setRole(getUserRole());
  }, []);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === "/") {
      if (typeof document !== "undefined") {
        const menuSection = document.getElementById("menu");
        if (menuSection) {
          menuSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    } else {
      router.push("/#menu");
    }
  };

  const navItems: NavItem[] = [
    { label: "حساب", href: "/login", icon: User },
    ...(role === "admin" ? [{ label: "پنل ادمین", href: "/admin", icon: Shield }] : []),
    { label: "منو", href: "#menu", icon: LayoutDashboard },
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 border-t border-slate-800 bg-black text-white z-50"
      aria-label="ناوبری"
    >
      <ul className={cn("grid h-[4.5rem] items-center", navItems.length === 4 ? "grid-cols-4" : "grid-cols-3")}>
        {navItems.map((item, index) => {
          const isMenu = item.href === "#menu";
          const isActive = !isMenu && active === item.href;

          return (
            <li key={`${item.href}-${index}`} className="flex justify-center">
              {isMenu ? (
                <button
                  onClick={handleMenuClick}
                  className={cn(
                    "flex flex-col items-center justify-center gap-0.5 px-1 text-xs transition-colors",
                    pathname === "/" ? "text-yellow-400 font-semibold" : "text-slate-400 hover:text-white"
                  )}
                  aria-label={item.label}
                >
                  <item.icon
                    className={cn("size-5", pathname === "/" ? "text-yellow-400" : "text-slate-400")}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center gap-0.5 px-1 text-xs transition-colors",
                    isActive ? "text-yellow-400 font-semibold" : "text-slate-400 hover:text-white"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <item.icon
                    className={cn("size-5", isActive ? "text-yellow-400" : "text-slate-400")}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
