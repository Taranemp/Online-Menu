import { notFound } from "next/navigation";
import { DEFAULT_CATEGORIES } from "@/components/restaurant/categories";
import CategoryDetail from "@/components/restaurant/CategoryDetail";
import { getMenuItemsForCategory } from "@/components/restaurant/menuData";

export function generateStaticParams() {
  return DEFAULT_CATEGORIES.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = DEFAULT_CATEGORIES.find((item) => item.slug === slug);
  if (!category) notFound();

  const items = getMenuItemsForCategory(slug);
  return <CategoryDetail slug={slug} items={items} />;
}