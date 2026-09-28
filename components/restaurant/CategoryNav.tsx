import Link from "next/link";
import { DEFAULT_CATEGORIES, type Category } from "@/components/restaurant/categories";
import { cn } from "@/lib/utils";

type CategoryNavProps = {
  activeSlug?: string;
  categories?: Category[];
};

// Category navigation — links always point to `/categories/[slug]`.
export default function CategoryNav({
  activeSlug,
  categories = DEFAULT_CATEGORIES,
}: CategoryNavProps) {
  return (
    <nav
      className="w-full overflow-x-auto"
      aria-label="منو دسته‌بندی‌ها"
    >
      <ul
        className="flex items-center gap-1.5 px-3 py-3"
        role="tablist"
      >
        {categories.map((cat) => {
          const isActive = activeSlug === cat.slug;
          return (
            <li key={cat.slug}>
              <Link
                href={`/categories/${cat.slug}`}
                className={cn(
                  "flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow"
                    : "bg-muted/40 text-foreground hover:bg-muted"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <span
                  className={cn(
                    "flex size-6 items-center justify-center rounded-full",
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-primary/10 text-primary"
                  )}
                  aria-hidden="true"
                >
                  <cat.icon className="size-3.5" />
                </span>
                {cat.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}