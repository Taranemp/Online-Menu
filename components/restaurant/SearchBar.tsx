"use client";

import { Search } from "lucide-react";

export default function SearchBar({
  placeholder = "جستجو در منو...",
  value,
  onChange,
}: {
  placeholder?: string;
  value?: string;
  onChange?: (val: string) => void;
}) {
  return (
    <div className="relative w-full">
      <Search
        className="absolute top-1/2 -translate-y-1/2 right-3 size-4 text-neutral-400 dark:text-neutral-500 lg:text-gray-400"
        aria-hidden="true"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-white/10 py-2 pr-9 pl-3 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-600 lg:bg-[#1f2937] lg:text-gray-100 lg:placeholder:text-gray-400 lg:border-0 lg:focus:ring-primary"
      />
    </div>
  );
}