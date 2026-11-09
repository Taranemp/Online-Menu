"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Tag, User } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

type BottomNavProps = {
  active?: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "منو", href: "#menu", icon: LayoutDashboard },
  { label: "تخفیف‌ها", href: "/discounts", icon: Tag },
  { label: "حساب", href: "/login", icon: User },
];

export default function BottomNav({ active }: BottomNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  const currentPath = pathname || "/";

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentPath === "/") {
      if (typeof document !== "undefined") {
        document.getElementById("menu")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
    router.push("/#menu");
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-black text-white"
      aria-label="ناوبری موبایل"
    >
      <ul className="flex h-[4.5rem] items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const isMenu = item.href === "#menu";
          const isActive = isMenu
            ? currentPath === "/" && (active === "/" || active === "#menu" || !active)
            : currentPath === item.href || active === item.href;

          if (isMenu) {
            return (
              <li key={item.href} className="flex min-w-0 flex-1 justify-center">
                <button
                  type="button"
                  onClick={handleMenuClick}
                  className={cn(
                    "flex w-full flex-col items-center justify-center gap-0.5 px-2 py-2 text-xs transition-colors",
                    isActive ? "font-semibold text-yellow-400" : "text-slate-400 hover:text-white"
                  )}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                >
                  <item.icon className={cn("size-5", isActive ? "text-yellow-400" : "text-slate-400")} aria-hidden="true" />
                  <span className="truncate">{item.label}</span>
                </button>
              </li>
            );
          }

          return (
            <li key={item.href} className="flex min-w-0 flex-1 justify-center">
              <Link
                href={item.href}
                className={cn(
                  "flex w-full flex-col items-center justify-center gap-0.5 px-2 py-2 text-xs transition-colors",
                  isActive ? "font-semibold text-yellow-400" : "text-slate-400 hover:text-white"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <item.icon className={cn("size-5", isActive ? "text-yellow-400" : "text-slate-400")} aria-hidden="true" />
                <span className="truncate">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
