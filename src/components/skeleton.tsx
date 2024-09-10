import { cn } from "@/lib/utils";
import React from "react";

type SkeletonProps = {
  className?: string;
};

export default function skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse h-4 w-[550px] rounded-md bg-white/5",
        className
      )}
    />
  );
}
