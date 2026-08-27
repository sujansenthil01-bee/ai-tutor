"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "./ui/input";
import { Select } from "./ui/select";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
}

const categories = ["All", "Work", "Personal", "Ideas", "Learning", "Projects"];

export function SearchBar({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search notes by title, content, or tags..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 glass border-white/10"
        />
      </div>
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
        <Select
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-40 glass border-white/10"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat.toLowerCase()}>
              {cat}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}
