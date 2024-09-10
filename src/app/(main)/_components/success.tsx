"use client";

import { useEffect, useState } from "react";

export function SuccessNotification() {
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    
    const message = localStorage.getItem("successMessage");

    if (message) {
      
      setSuccessMessage(message);
      localStorage.removeItem("successMessage");
    }
  }, []); 

  useEffect(() => {
   
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(""); 
      }, 2000);

    
      return () => clearTimeout(timer);
    }
  }, [successMessage]); 

  if (!successMessage) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full flex items-center justify-center mt-4"
      style={{ zIndex: 9999 }}
    >
        <div className="bg-purple from-purple-600 via-pink-500 to-purple-600 text-white rounded-lg shadow-2xl flex items-center justify-center gap-4 pt-4 pb-4 pr-8 pl-8">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white bg-opacity-20">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                    />
                </svg>
            </div>

            <div className="flex-1">
                <p className="text-white font-semibold text-lg">
                    {successMessage}
                </p>
                <p className="text-white text-sm">
                    Ação realizada com sucesso!
                </p>
            </div>
        </div>
        </div>
  );
}
