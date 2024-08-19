"use client";

import { ChangePasswordForm } from "../_components/change-password-form";

export default function ChangePassword({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <main className="relative flex flex-col justify-center items-center w-full h-screen bg-background">
      <ChangePasswordForm userId={id} />
    </main>
  );
}
