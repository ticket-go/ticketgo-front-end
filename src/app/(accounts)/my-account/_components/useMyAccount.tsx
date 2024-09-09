"use client";

import { useState, useEffect, useMemo } from "react";
import { fetchPaymentsUser } from "@/actions/fetch-payments";
import { Payment } from "@/types/payment";

export function useMyAccount(userId: string) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loadingPayments, setLoadingPayments] = useState(true);
  const [accountData, setAccountData] = useState(null);

  return {
    payments,
    loadingPayments,
    accountData,
  };
}
