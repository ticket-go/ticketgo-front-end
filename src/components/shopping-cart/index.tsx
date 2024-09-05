"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Typography } from "../typography";

export function ShoppingCartComponent() {
  const [isVisible, setIsVisible] = useState(false);
  const { tickets } = useCart();

  useEffect(() => {
    if (tickets.length > 0) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [tickets]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 mx-auto w-full max-w-md rounded-lg bg-primary p-4 text-primary-foreground shadow-lg"
        >
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-primary-foreground p-2">
              <ShoppingCart className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <Typography
                variant={"h5"}
                fontWeight={"semibold"}
                className="text-background"
              >
                Itens no carrinho:
              </Typography>
              <ul className="text-sm opacity-90">
                {tickets.map((ticket) => (
                  <li
                    key={ticket.uuid}
                    className="flex flex-col text-background font-medium gap-2"
                  >
                    {ticket.event} - {ticket.half_ticket ? "Meia" : "Inteira"}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
