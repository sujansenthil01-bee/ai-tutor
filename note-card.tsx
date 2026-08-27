"use client";

import { motion } from "framer-motion";
import { Edit3, Archive, Clock, Tag } from "lucide-react";
import { Note } from "./note-modal";
import { cn } from "@/lib/utils";

interface NoteCardProps {
  note: Note;
  index: number;
  onEdit: (note: Note) => void;
  onArchive: (id: string) => void;
}

const categoryColors: Record<string, string> = {
  Work: "from-blue-500/20 to-cyan-500/20 text-blue-300",
  Personal: "from-emerald-500/20 to-teal-500/20 text-emerald-300",
  Ideas: "from-amber-500/20 to-orange-500/20 text-amber-300",
  Learning: "from-violet-500/20 to-purple-500/20 text-violet-300",
  Projects: "from-rose-500/20 to-pink-500/20 text-rose-300",
};

export function NoteCard({ note, index, onEdit, onArchive }: NoteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, rotateX: -30, translateZ: -100 }}
      animate={{ opacity: 1, rotateX: 0, translateZ: 0 }}
      transition={{ delay: index * 0.08, type: "spring", bounce: 0.3, duration: 0.7 }}
      className="card-3d group"
    >
      <div className="card-3d-inner glass rounded-xl p-5 relative overflow-hidden">
        <div
          className={cn(
            "absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
            categoryColors[note.category]?.split(" ")[0].replace("/20", "") || "from-violet-500 to-fuchsia-500"
          )}
        />

        <div className="mb-3 flex items-start justify-between">
          <div>
            <span
              className={cn(
                "inline-block rounded-full bg-gradient-to-r px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                categoryColors[note.category] || "from-violet-500/20 to-fuchsia-500/20 text-violet-300"
              )}
            >
              {note.category}
            </span>
            <h3 className="mt-2 text-lg font-semibold leading-tight group-hover:text-violet-300 transition-colors">
              {note.title}
            </h3>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(note)}
              className="rounded-lg p-1.5 hover:bg-white/10 transition-colors"
            >
              <Edit3 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onArchive(note.id)}
              className="rounded-lg p-1.5 hover:bg-white/10 transition-colors"
            >
              <Archive className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
          {note.content}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] text-muted-foreground"
              >
                <Tag className="h-2.5 w-2.5" />
                {tag}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Clock className="h-2.5 w-2.5" />
            {note.createdAt.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
