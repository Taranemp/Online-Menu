import MenuItem from "./MenuItem";
import type { MenuItem as MenuItemType } from "./menuData";

type MenuSectionProps = {
  slug: string;
  title: string;
  items: MenuItemType[];
};

// Category title + list of compact food rows.
// Mobile: sticky right-aligned heading with accent bar + dark bg.
// Desktop (lg+): original centered heading + divide-y list.
export default function MenuSection({
  slug,
  title,
  items,
}: MenuSectionProps) {
  return (
    <section
      id={slug}
      className="scroll-mt-14 bg-neutral-50 dark:bg-neutral-950 lg:scroll-mt-4"
    >
      {/* Mobile heading — sticky, right-aligned, accent bar */}
      <h2 className="sticky top-14 z-20 flex items-center gap-2 bg-neutral-50/90 dark:bg-neutral-950/90 backdrop-blur-md px-4 py-3 text-right text-lg font-semibold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-white/5 lg:hidden">
        <span className="inline-block w-1 h-5 rounded-full bg-amber-400 shrink-0" aria-hidden="true" />
        {title}
      </h2>

      {/* Desktop heading — original centered */}
      <h2 className="hidden px-4 py-3 text-center text-lg font-bold lg:block">
        {title}
      </h2>

      {/* Mobile: card list with gap; Desktop: divide-y rows */}
      <ul className="flex flex-col gap-3 px-4 lg:block lg:divide-y lg:divide-border lg:px-0">
        {items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
}