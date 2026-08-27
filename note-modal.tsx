"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Tag } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select } from "./ui/select";

export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: Date;
  archived: boolean;
}

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: Omit<Note, "id" | "createdAt" | "archived">) => void;
  note?: Note | null;
}

const categories = ["Work", "Personal", "Ideas", "Learning", "Projects"];

export function NoteModal({ isOpen, onClose, onSave, note }: NoteModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Personal");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setCategory(note.category);
      setTags(note.tags);
    } else {
      setTitle("");
      setContent("");
      setCategory("Personal");
      setTags([]);
    }
    setTagInput("");
  }, [note, isOpen]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title, content, category, tags });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotateX: -10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.95, rotateX: -10 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
            style={{ perspective: 1200 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2"
          >
            <div className="glass-strong rounded-2xl p-6 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  {note ? "Edit Note" : "New Note"}
                </h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Title
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Note title..."
                    className="glass border-white/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Category
                  </label>
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="glass border-white/10"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Content
                  </label>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your thoughts..."
                    rows={5}
                    className="glass border-white/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Tags
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                        placeholder="Add tag and press Enter..."
                        className="pl-10 glass border-white/10"
                      />
                    </div>
                    <Button type="button" variant="outline" onClick={handleAddTag}>
                      Add
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          onClick={() => handleRemoveTag(tag)}
                          className="cursor-pointer rounded-full bg-violet-500/20 px-2.5 py-1 text-xs text-violet-300 hover:bg-violet-500/30 transition-colors"
                        >
                          {tag} ×
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="ghost" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" className="glow">
                    {note ? "Update" : "Create"} Note
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
