"use client";

import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { useCreateEventForm } from "./useCreateEventForm";
import { useState, useEffect } from "react";

export function CreateEventFormActions() {
  const { isSubmitting, isLoading, handleCancel, success } = useCreateEventForm();
  const [showModal, setShowModal] = useState(false);

 
  useEffect(() => {
    if (success) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false); 
      }, 3000);
    }
  }, [success]);

  return (
    <>
      <div className="flex items-center w-full gap-6">
        <Button
          type="button"
          variant={"outline"}
          className="w-1/2 h-14 flex gap-4 border-purple bg-transparent text-purple hover:text-purple/80 hover:border-purple/90 hover:bg-transparent"
          onClick={() => handleCancel()}
        >
          <Typography variant="h5" fontWeight="semibold">
            Cancelar
          </Typography>
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="w-1/2 h-14 bg-purple hover:bg-purple/60"
        >
          <Typography variant="h5" fontWeight="semibold">
            {isSubmitting || isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
                  ></path>
                </svg>
                Criando...
              </>
            ) : (
              "Criar evento"
            )}
          </Typography>
        </Button>
      </div>

      {showModal && (
        <div className="fixed top-0 left-0 right-0 p-4 bg-green-500 text-white text-center">
          <Typography variant="h5" fontWeight="semibold">
            Evento criado com sucesso!
          </Typography>
        </div>
      )}
    </>
  );
}
