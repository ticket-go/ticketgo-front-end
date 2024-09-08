"use client";

import { useEffect, useState } from "react";

export function useHeader() {
  const [isScroll, setIsScroll] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { isScroll };
}
