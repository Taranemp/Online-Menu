"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { User, Percent, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const NAV_ITEMS: NavItem[] = [
  { label: "پروفایل", href: "#profile", icon: User },
  { label: "تخفیف‌ها", href: "#", icon: Percent },
  { label: "منو", href: "#menu", icon: LayoutDashboard },
];

type BottomNavProps = {
  active?: string;
};

export default function BottomNav({ active = "/" }: BottomNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const authToken = localStorage.getItem("authToken");
      setIsLoggedIn(!!authToken);
    }
  }, []);

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoggedIn) {
      router.push("/account/profile");
    } else {
      router.push("/account/login");
    }
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === "/") {
      const menuSection = document.getElementById("menu");
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      router.push("/#menu");
    }
  };

  return (
    <nav
      className="fixed inset-x-0 bottom-0 border-t border-slate-800 bg-black text-white z-50"
      aria-label="ناوبری"
    >
      <ul className="grid h-[4.5rem] grid-cols-3 items-center">
        {NAV_ITEMS.map((item, index) => {
          const isActive = active === item.href && item.href === "/";
          const isProfile = item.href === "#profile";
          const isMenu = item.href === "#menu";
          
          return (
            <li key={`${item.href}-${index}`} className="flex justify-center">
              {isProfile ? (
                <button
                  onClick={handleProfileClick}
                  className={cn(
                    "flex flex-col items-center justify-center gap-0.5 px-1 text-xs transition-colors",
                    "text-slate-400 hover:text-white"
                  )}
                  aria-label={item.label}
                >
                  <item.icon
                    className={cn("size-5 text-slate-400")}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </button>
              ) : isMenu ? (
                <button
                  onClick={handleMenuClick}
                  className={cn(
                    "flex flex-col items-center justify-center gap-0.5 px-1 text-xs transition-colors",
                    active === "/" && pathname === "/" && isActive
                      ? "text-yellow-400 font-semibold"
                      : "text-slate-400 hover:text-white"
                  )}
                  aria-label={item.label}
                >
                  <item.icon
                    className={cn(
                      "size-5",
                      active === "/" && pathname === "/" && isActive
                        ? "text-yellow-400"
                        : "text-slate-400"
                    )}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center gap-0.5 px-1 text-xs transition-colors",
                    isActive
                      ? "text-yellow-400 font-semibold"
                      : "text-slate-400 hover:text-white"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <item.icon
                    className={cn(
                      "size-5",
                      isActive ? "text-yellow-400" : "text-slate-400"
                    )}
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