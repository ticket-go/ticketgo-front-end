"use client";

import { useState } from "react";

export function useUserInfoForm() {
  const [isUserForm, setISUserForm] = useState<boolean>(false);

  const handleUserForm = () => {
    console.log("handleUserForm");
    setISUserForm(true);
  };

  return { isUserForm, handleUserForm };
}
