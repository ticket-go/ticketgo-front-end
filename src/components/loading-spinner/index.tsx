"use client";

import { useState, useEffect } from "react";

interface LoadingSpinnerProps {
  isLoading: boolean;
  delay?: number; 
}

export function LoadingSpinner({ isLoading, delay = 300 }: LoadingSpinnerProps) { 
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setShow(true), delay); 
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isLoading, delay]); 

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
      <div className="relative h-20 w-20">
        <div className="absolute inset-0 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    </div>
  );
}
