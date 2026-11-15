"use client";

import { useState } from "react";
import Image from "next/image";
import { UtensilsCrossed } from "lucide-react";
import type { MenuItem } from "./menuData";

type MenuItemProps = {
  item: MenuItem;
  onClick?: () => void;
};

// Mobile: card with dark bg, rounded corners, accent price.
// Desktop (lg+): original plain row — reset every mobile-only class.
export default function MenuItem({ item, onClick }: MenuItemProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showPlaceholder = imageFailed || !item.image;

  // Split "۱۱۰,۰۰۰ تومان" into number + unit for mobile typography
  const parts = item.price.split(" ");
  const priceNumber = parts.length > 1 ? parts.slice(0, -1).join(" ") : item.price;
  const priceUnit = parts.length > 1 ? parts[parts.length - 1] : "";

  return (
    <li
      onClick={onClick}
      className="flex items-center gap-3 p-3 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-white/10 cursor-pointer transition duration-100 active:scale-[0.98] lg:items-start lg:gap-3 lg:px-4 lg:py-3 lg:bg-transparent lg:rounded-none lg:border-0 lg:active:scale-100"
    >
      {/* Mobile image slot (card look) */}
      <div className="flex items-center justify-center w-20 h-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800 lg:hidden">
        {showPlaceholder ? (
          <UtensilsCrossed className="w-7 h-7 text-neutral-300 dark:text-neutral-600" aria-hidden="true" />
        ) : (
          <Image
            src={item.image ?? "/file.svg"}
            alt={item.name}
            width={80}
            height={80}
            className="w-full h-full object-cover"
            onError={() => setImageFailed(true)}
          />
        )}
      </div>

      {/* Desktop image slot (original behavior) */}
      <div className="hidden min-w-[80px] lg:block">
        <Image
          src={item.image ?? "/file.svg"}
          alt={item.name}
          width={80}
          height={80}
          className="rounded-md object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1 text-right">
        <h3 className="text-sm font-semibold leading-tight text-neutral-900 dark:text-white lg:font-bold">
          {item.name}
        </h3>
        <p className="mt-0.5 line-clamp-2 text-xs text-neutral-500 dark:text-neutral-400">
          {item.description}
        </p>
        <div className="mt-1 whitespace-nowrap">
          {/* Mobile price: larger number, smaller dimmer unit */}
          <span className="lg:hidden">
            <span className="text-base font-semibold text-amber-600 dark:text-amber-400">{priceNumber}</span>
            {priceUnit && (
              <span className="text-xs font-normal text-neutral-500 dark:text-neutral-500 ms-1">{priceUnit}</span>
            )}
          </span>
          {/* Desktop price */}
          <span className="hidden text-sm font-bold text-amber-600 dark:text-amber-400 lg:inline">{item.price}</span>
        </div>
      </div>
    </li>
  );
}