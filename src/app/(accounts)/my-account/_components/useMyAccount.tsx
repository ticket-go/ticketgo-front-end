"use client";

import { useEffect, useState } from "react";
import { fetchPaymentsUser } from "@/actions/fetch-payments-user";
import { Payment } from "@/types/payment";
import { useAuth } from "@/hooks/useAuth";

export function useMyAccount() {
  const { user } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loadingPayments, setLoadingPayments] = useState(true);

  const userId = user?.user_id;

  useEffect(() => {
    if (!userId) {
      return;
    }
    const fetchPayments = async () => await fetchPaymentsUser(userId);
    fetchPayments().then((data) => {
      setPayments(data);
      setLoadingPayments(false);
    });
  }, [userId]);

  return {
    payments,
    loadingPayments,
  };
}
