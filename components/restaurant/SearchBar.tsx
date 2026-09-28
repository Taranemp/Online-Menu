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
        className="absolute top-1/2 -translate-y-1/2 right-3 size-4 text-gray-400"
        aria-hidden="true"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full bg-[#1f2937] py-2 pr-9 pl-3 text-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}