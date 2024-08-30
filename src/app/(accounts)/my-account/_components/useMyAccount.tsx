"use client";

import { Payment } from "@/types/payment";
import { useState, useEffect, useMemo } from "react";
import { fetchPaymentsUser } from "@/actions/fetch-payments";

export function useMyAccount() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loadingPayments, setLoadingPayments] = useState(true);
  const [accountData, setAccountData] = useState(null);

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const paymentsData = await fetchPaymentsUser();
        if (paymentsData) {
          setPayments(paymentsData);
        }
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      } finally {
        setLoadingPayments(false);
      }
    };
    loadPayments();
  }, []);

  const paymentsData = useMemo(() => payments, [payments]);
  const isLoadingPayments = useMemo(() => loadingPayments, [loadingPayments]);

  return {
    payments: paymentsData,
    loadingPayments: isLoadingPayments,
    accountData,
  };
}
