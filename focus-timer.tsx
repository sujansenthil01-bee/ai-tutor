"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Coffee, Brain, TreePine } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type TimerMode = "pomodoro" | "short" | "long";

const modes: { id: TimerMode; label: string; minutes: number; icon: React.ElementType }[] = [
  { id: "pomodoro", label: "Pomodoro", minutes: 25, icon: Brain },
  { id: "short", label: "Short Break", minutes: 5, icon: Coffee },
  { id: "long", label: "Long Break", minutes: 15, icon: TreePine },
];

export function FocusTimer() {
  const [mode, setMode] = useState<TimerMode>("pomodoro");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentMode = modes.find((m) => m.id === mode)!;
  const totalTime = currentMode.minutes * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  useEffect(() => {
    setTimeLeft(currentMode.minutes * 60);
    setIsRunning(false);
  }, [mode]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (mode === "pomodoro") {
        setCompletedSessions((prev) => prev + 1);
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft, mode]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 flex gap-2">
        {modes.map((m) => {
          const Icon = m.icon;
          return (
            <Button
              key={m.id}
              variant={mode === m.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setMode(m.id)}
              className={cn(
                "gap-2",
                mode === m.id && "glow"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {m.label}
            </Button>
          );
        })}
      </div>

      <div className="relative mb-8">
        <svg width="280" height="280" className="-rotate-90">
          <circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            stroke="hsl(240 4% 16%)"
            strokeWidth="8"
          />
          <motion.circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            key={timeLeft}
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl font-bold tabular-nums text-gradient"
          >
            {formatTime(timeLeft)}
          </motion.div>
          <p className="mt-1 text-sm text-muted-foreground">
            {isRunning ? "Focusing..." : "Ready to focus"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setTimeLeft(currentMode.minutes * 60);
            setIsRunning(false);
          }}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        <Button
          size="lg"
          onClick={() => setIsRunning(!isRunning)}
          className={cn("w-32 gap-2 glow", isRunning && "bg-amber-500 hover:bg-amber-600")}
        >
          {isRunning ? (
            <>
              <Pause className="h-4 w-4" /> Pause
            </>
          ) : (
            <>
              <Play className="h-4 w-4" /> Start
            </>
          )}
        </Button>
      </div>

      <div className="mt-8 flex items-center gap-1.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-2 w-2 rounded-full transition-colors",
              i < (completedSessions % 4)
                ? "bg-gradient-to-r from-violet-400 to-fuchsia-400"
                : "bg-white/10"
            )}
          />
        ))}
        <span className="ml-2 text-xs text-muted-foreground">
          {completedSessions} sessions completed
        </span>
      </div>
    </div>
  );
}
