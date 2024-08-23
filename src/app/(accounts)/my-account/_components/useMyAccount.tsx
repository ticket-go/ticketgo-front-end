"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchPurchases } from "@/actions/fetch-purchases";
import { Purchase } from "@/types/purchase";

export function useMyAccount() {
  const [purchases, setPurchases] = useState<Purchase[] | []>([]);
  const [loadingPurchases, setLoadingPurchases] = useState(true);
  const [accountData, setAccountData] = useState(null);

  const purchaseData = useMemo(() => purchases, [purchases]);
  const isLoadingPurchases = useMemo(
    () => loadingPurchases,
    [loadingPurchases]
  );

  return {
    purchases: purchaseData,
    loadingPurchases: isLoadingPurchases,
    accountData,
  };
}
