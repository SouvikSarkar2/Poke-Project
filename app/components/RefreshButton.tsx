"use client";

import type React from "react";

interface RefreshButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function RefreshButton({
  children,
  className,
}: RefreshButtonProps) {
  return (
    <button onClick={() => window.location.reload()} className={className}>
      {children}
    </button>
  );
}
