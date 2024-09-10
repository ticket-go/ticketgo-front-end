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
      className="fixed top-0 left-0 w-full flex items-center justify-center"
      style={{ zIndex: 9999 }}
    >
      <div className="bg-white p-6 mt-4 rounded-md shadow-lg text-center border border-green-500">
        <p className="text-green-600 text-xl font-bold">{successMessage}</p>
      </div>
    </div>
  );
}
