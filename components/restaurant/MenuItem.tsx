"use client";

import Image from "next/image";
import type { MenuItem } from "./menuData";

type MenuItemProps = {
  item: MenuItem;
  onClick?: () => void;
};

// Compact horizontal food row: image on the right, name prominent,
// short description in muted gray, and price in the accent color.
export default function MenuItem({ item, onClick }: MenuItemProps) {
  return (
    <li
      onClick={onClick}
      className="flex items-start gap-3 px-4 py-3 cursor-pointer"
    >
      <div className="min-w-[80px]">
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
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold leading-tight">{item.name}</h3>
        <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
          {item.description}
        </p>
        <div className="mt-1 text-sm font-bold text-primary">{item.price}</div>
      </div>
    </li>
  );
}