"use client";

import { motion } from "framer-motion";
import { Check, Trash2, Flag } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: Date;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityConfig = {
  low: { color: "text-emerald-400 bg-emerald-500/10", label: "Low" },
  medium: { color: "text-amber-400 bg-amber-500/10", label: "Medium" },
  high: { color: "text-rose-400 bg-rose-500/10", label: "High" },
};

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const config = priorityConfig[todo.priority];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
      className={cn(
        "group flex items-center gap-3 rounded-xl border p-4 transition-all hover:border-white/20",
        todo.completed
          ? "border-white/5 bg-white/[0.02] opacity-60"
          : "glass border-white/10"
      )}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all",
          todo.completed
            ? "border-emerald-500 bg-emerald-500 text-white"
            : "border-white/20 hover:border-violet-400"
        )}
      >
        {todo.completed && <Check className="h-3 w-3" />}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-sm font-medium transition-all",
            todo.completed && "line-through text-muted-foreground"
          )}
        >
          {todo.text}
        </p>
      </div>

      <span
        className={cn(
          "flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium shrink-0",
          config.color
        )}
      >
        <Flag className="h-2.5 w-2.5" />
        {config.label}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="rounded-lg p-1.5 text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-rose-500/10 hover:text-rose-400 transition-all"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
}
