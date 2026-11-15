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
      className="fixed bottom-0 left-0 right-0 w-full z-50 border-t border-neutral-200 dark:border-white/10 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-lg text-neutral-900 dark:text-white pb-[env(safe-area-inset-bottom)] lg:bg-neutral-950/80 lg:text-white lg:border-white/10"
      aria-label="ناوبری موبایل"
    >
      <ul className="flex h-[4.5rem] items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const isMenu = item.href === "#menu";
          const isActive = isMenu
            ? currentPath === "/" && (active === "/" || active === "#menu" || !active)
            : currentPath === item.href || active === item.href;

          return (
            <li key={item.href} className="flex min-w-0 flex-1 justify-center">
              {isMenu ? (
                <button
                  type="button"
                  onClick={handleMenuClick}
                  className={cn(
                    "relative flex w-full flex-col items-center justify-center gap-0.5 px-2 py-2 text-xs transition-colors min-h-[44px]",
                    isActive ? "font-semibold text-amber-600 dark:text-amber-400" : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white lg:text-neutral-400 lg:hover:text-white"
                  )}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-1 w-6 rounded-full bg-amber-400" aria-hidden="true" />
                  )}
                  <item.icon className={cn("size-5", isActive ? "text-amber-600 dark:text-amber-400" : "text-neutral-500 dark:text-neutral-400 lg:text-neutral-400")} aria-hidden="true" />
                  <span className="truncate">{item.label}</span>
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "relative flex w-full flex-col items-center justify-center gap-0.5 px-2 py-2 text-xs transition-colors min-h-[44px]",
                    isActive ? "font-semibold text-amber-600 dark:text-amber-400" : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white lg:text-neutral-400 lg:hover:text-white"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-1 w-6 rounded-full bg-amber-400" aria-hidden="true" />
                  )}
                  <item.icon className={cn("size-5", isActive ? "text-amber-600 dark:text-amber-400" : "text-neutral-500 dark:text-neutral-400 lg:text-neutral-400")} aria-hidden="true" />
                  <span className="truncate">{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}