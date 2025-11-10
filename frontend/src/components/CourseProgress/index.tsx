'use client'
import React from "react";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
  viewedLessons: number;
  totalLessons: number;
}

export const CourseProgress: React.FC<CourseProgressProps> = ({
  viewedLessons,
  totalLessons,
}) => {
  const progress =
    totalLessons > 0 ? Math.round((viewedLessons / totalLessons) * 100) : 0;

  const getColor = () => {
    if (progress < 35) return "bg-red-500";
    if (progress < 75) return "bg-amber-500";
    return "bg-green-500";
  };

  return (
    <div className="relative h-4 w-full rounded-full dark:bg-muted overflow-hidden bg-gray-200">
      <div
        className={cn("h-full transition-all duration-500", getColor())}
        style={{ width: `${progress}%` }}
      />
      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-medium dark:text-white text-black">
        {progress}%
      </span>
    </div>
  );
};
