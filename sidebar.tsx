"use client";

import { motion } from "framer-motion";
import { LayoutGrid, CheckSquare, Timer, Archive, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "notes" | "todos" | "focus" | "archive";

interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "notes", label: "Notes", icon: LayoutGrid },
  { id: "todos", label: "Tasks", icon: CheckSquare },
  { id: "focus", label: "Focus", icon: Timer },
  { id: "archive", label: "Archive", icon: Archive },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gradient">MindSpace</h1>
          <p className="text-xs text-muted-foreground">Your second brain</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              whileHover={{ scale: 1.02, rotateY: 3 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors card-3d",
                isActive
                  ? "text-white"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-white/10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className="relative z-10 h-4 w-4" />
              <span className="relative z-10">{tab.label}</span>
            </motion.button>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="glass rounded-lg p-3">
          <p className="text-xs text-muted-foreground">Focus streak</p>
          <p className="text-lg font-bold text-gradient">12 days</p>
        </div>
      </div>
    </aside>
  );
}
