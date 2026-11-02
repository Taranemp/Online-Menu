import Link from "next/link";
import { User, Percent, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const NAV_ITEMS: NavItem[] = [
  { label: "پروفایل", href: "#", icon: User },
  { label: "تخفیف‌ها", href: "#", icon: Percent },
  { label: "منو", href: "/", icon: LayoutDashboard },
];

type BottomNavProps = {
  active?: string;
};

export default function BottomNav({ active = "/" }: BottomNavProps) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 border-t border-slate-800 bg-black text-white z-50"
      aria-label="ناوبری"
    >
      <ul className="grid h-[4.5rem] grid-cols-3 items-center">
        {NAV_ITEMS.map((item, index) => {
          const isActive = active === item.href;
          return (
            <li key={`${item.href}-${index}`} className="flex justify-center">
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
            </li>
          );
        })}
      </ul>
    </nav>
  );
}