"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { SearchBar } from "@/components/search-bar";
import { NoteCard } from "@/components/note-card";
import { NoteModal, Note } from "@/components/note-modal";
import { TodoItem, Todo } from "@/components/todo-item";
import { FocusTimer } from "@/components/focus-timer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

type Tab = "notes" | "todos" | "focus" | "archive";

const demoNotes: Note[] = [
  {
    id: "1",
    title: "Q4 Product Roadmap",
    content: "Finalize the feature set for Q4. Key priorities: real-time collaboration, mobile responsiveness, and the new analytics dashboard. Meet with design team on Thursday.",
    category: "Work",
    tags: ["planning", "quarterly"],
    createdAt: new Date("2026-08-20"),
    archived: false,
  },
  {
    id: "2",
    title: "Morning Routine Ideas",
    content: "Try the 5-5-5 method: 5 minutes meditation, 5 minutes journaling, 5 minutes stretching. No phone before 8 AM. Cold shower experiment week 2.",
    category: "Personal",
    tags: ["habits", "health"],
    createdAt: new Date("2026-08-22"),
    archived: false,
  },
  {
    id: "3",
    title: "AI Agent Architecture",
    content: "Exploring multi-agent systems with tool use. Key insight: agents need memory layers — episodic for recent context, semantic for long-term knowledge. Draft architecture diagram.",
    category: "Ideas",
    tags: ["ai", "architecture"],
    createdAt: new Date("2026-08-23"),
    archived: false,
  },
  {
    id: "4",
    title: "Rust Ownership Deep Dive",
    content: "Re-reading the ownership chapter. Key concepts: borrowing rules, lifetime elision, and the drop check. Practice with the linked list exercise from Rustonomicon.",
    category: "Learning",
    tags: ["rust", "systems"],
    createdAt: new Date("2026-08-24"),
    archived: false,
  },
  {
    id: "5",
    title: "MindSpace Dashboard v2",
    content: "Add 3D card animations with Framer Motion. Implement glassmorphism with backdrop-filter. Dark mode only for now. Consider adding a graph view for note connections.",
    category: "Projects",
    tags: ["mindspace", "ui"],
    createdAt: new Date("2026-08-25"),
    archived: false,
  },
  {
    id: "6",
    title: "Team Retrospective Notes",
    content: "What went well: deployment frequency increased 40%. What to improve: code review turnaround time. Action items: implement auto-assign reviewers, set 24h SLA.",
    category: "Work",
    tags: ["team", "process"],
    createdAt: new Date("2026-08-21"),
    archived: false,
  },
  {
    id: "7",
    title: "Photography Project: Neon Nights",
    content: "Plan night shoot in downtown. Locations: bridge underpass, rooftop bar district, old theater marquee. Gear: 35mm f/1.4, tripod, ND filter. Golden hour backup plan.",
    category: "Personal",
    tags: ["photography", "creative"],
    createdAt: new Date("2026-08-26"),
    archived: false,
  },
  {
    id: "8",
    title: "Distributed Systems Reading List",
    content: "1. Designing Data-Intensive Applications (Martin Kleppmann) — Ch 5-7. 2. Dynamo paper. 3. Raft consensus visualization. 4. CAP theorem revisited.",
    category: "Learning",
    tags: ["distributed", "reading"],
    createdAt: new Date("2026-08-26"),
    archived: false,
  },
];

const demoTodos: Todo[] = [
  { id: "1", text: "Review pull requests", completed: false, priority: "high", createdAt: new Date() },
  { id: "2", text: "Write weekly summary", completed: true, priority: "medium", createdAt: new Date() },
  { id: "3", text: "Grocery shopping", completed: false, priority: "low", createdAt: new Date() },
  { id: "4", text: "Fix navigation bug", completed: false, priority: "high", createdAt: new Date() },
  { id: "5", text: "Read 30 pages", completed: false, priority: "medium", createdAt: new Date() },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("notes");
  const [notes, setNotes] = useState<Note[]>(demoNotes);
  const [todos, setTodos] = useState<Todo[]>(demoTodos);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [todoFilter, setTodoFilter] = useState("all");
  const [newTodoText, setNewTodoText] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState<"low" | "medium" | "high">("medium");

  const filteredNotes = useMemo(() => {
    let result = notes.filter((n) => !n.archived);
    if (activeTab === "archive") result = notes.filter((n) => n.archived);

    if (categoryFilter !== "all") {
      result = result.filter((n) => n.category.toLowerCase() === categoryFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q) ||
          n.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [notes, searchQuery, categoryFilter, activeTab]);

  const filteredTodos = useMemo(() => {
    let result = [...todos];
    if (todoFilter === "active") result = result.filter((t) => !t.completed);
    if (todoFilter === "completed") result = result.filter((t) => t.completed);
    return result.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }, [todos, todoFilter]);

  const handleSaveNote = (noteData: Omit<Note, "id" | "createdAt" | "archived">) => {
    if (editingNote) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editingNote.id
            ? { ...n, ...noteData }
            : n
        )
      );
    } else {
      const newNote: Note = {
        ...noteData,
        id: Math.random().toString(36).slice(2),
        createdAt: new Date(),
        archived: false,
      };
      setNotes((prev) => [newNote, ...prev]);
    }
    setEditingNote(null);
  };

  const handleArchive = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, archived: !n.archived } : n))
    );
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;
    const todo: Todo = {
      id: Math.random().toString(36).slice(2),
      text: newTodoText,
      completed: false,
      priority: newTodoPriority,
      createdAt: new Date(),
    };
    setTodos((prev) => [todo, ...prev]);
    setNewTodoText("");
  };

  const handleToggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="ml-64 flex-1 p-8">
        <AnimatePresence mode="wait">
          {activeTab === "notes" && (
            <motion.div
              key="notes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Notes</h2>
                  <p className="text-sm text-muted-foreground">
                    {filteredNotes.length} note{filteredNotes.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <Button onClick={() => { setEditingNote(null); setIsModalOpen(true); }} className="gap-2 glow">
                  <Plus className="h-4 w-4" /> New Note
                </Button>
              </div>

              <div className="mb-6">
                <SearchBar
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  categoryFilter={categoryFilter}
                  onCategoryChange={setCategoryFilter}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredNotes.map((note, i) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    index={i}
                    onEdit={(n) => { setEditingNote(n); setIsModalOpen(true); }}
                    onArchive={handleArchive}
                  />
                ))}
              </div>

              {filteredNotes.length === 0 && (
                <div className="flex h-64 flex-col items-center justify-center text-muted-foreground">
                  <p>No notes found.</p>
                  <p className="text-sm">Try adjusting your search or filters.</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "todos" && (
            <motion.div
              key="todos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold">Tasks</h2>
                <p className="text-sm text-muted-foreground">
                  {todos.filter((t) => !t.completed).length} remaining
                </p>
              </div>

              <form onSubmit={handleAddTodo} className="mb-6 flex gap-2">
                <Input
                  value={newTodoText}
                  onChange={(e) => setNewTodoText(e.target.value)}
                  placeholder="Add a new task..."
                  className="glass border-white/10"
                />
                <Select
                  value={newTodoPriority}
                  onChange={(e) => setNewTodoPriority(e.target.value as "low" | "medium" | "high")}
                  className="w-32 glass border-white/10"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
                <Button type="submit" className="glow">Add</Button>
              </form>

              <div className="mb-4 flex gap-2">
                {(["all", "active", "completed"] as const).map((f) => (
                  <Button
                    key={f}
                    variant={todoFilter === f ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setTodoFilter(f)}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </Button>
                ))}
              </div>

              <div className="space-y-2">
                <AnimatePresence>
                  {filteredTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={handleToggleTodo}
                      onDelete={handleDeleteTodo}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {filteredTodos.length === 0 && (
                <div className="flex h-32 items-center justify-center text-muted-foreground">
                  <p>No tasks here.</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "focus" && (
            <motion.div
              key="focus"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center pt-8"
            >
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold">Focus Timer</h2>
                <p className="text-sm text-muted-foreground">Deep work sessions</p>
              </div>
              <div className="glass-strong rounded-3xl p-10 glow">
                <FocusTimer />
              </div>
            </motion.div>
          )}

          {activeTab === "archive" && (
            <motion.div
              key="archive"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold">Archive</h2>
                <p className="text-sm text-muted-foreground">
                  {notes.filter((n) => n.archived).length} archived notes
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {notes
                  .filter((n) => n.archived)
                  .map((note, i) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      index={i}
                      onEdit={(n) => { setEditingNote(n); setIsModalOpen(true); }}
                      onArchive={handleArchive}
                    />
                  ))}
              </div>

              {notes.filter((n) => n.archived).length === 0 && (
                <div className="flex h-64 flex-col items-center justify-center text-muted-foreground">
                  <p>Archive is empty.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingNote(null); }}
        onSave={handleSaveNote}
        note={editingNote}
      />
    </div>
  );
}
