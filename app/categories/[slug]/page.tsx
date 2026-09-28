import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CATEGORY_LABELS } from "@/components/restaurant/categories";
import { MOCK_MENU_ITEMS } from "@/components/restaurant/menuData";
import MenuSection from "@/components/restaurant/MenuSection";
import BottomNav from "@/components/restaurant/BottomNav";

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const label = CATEGORY_LABELS[slug] ?? slug;
  const items = MOCK_MENU_ITEMS.filter((m) => m.categorySlug === slug);

  return (
    <main className="mx-auto flex w-full max-w-md flex-col bg-background min-h-screen sm:max-w-lg">
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-1 py-1 -ml-1"
          aria-label="Back to menu"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          Back
        </Link>
        <h1 className="text-sm font-semibold flex-1 text-center pr-8">{label}</h1>
      </div>

      <div className="pb-24">
        <MenuSection title={label} items={items} />
      </div>

      <BottomNav active="/categories" />
    </main>
  );
}