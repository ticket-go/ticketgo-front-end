"use client";

import { fetchAuditHistory } from "@/actions/fetch-audit-history";
import { Typography } from "@/components/typography";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";
import { Change, History } from "@/types/history";
import { useEffect, useState } from "react";

export function HistoryTable() {
  const { user } = useAuth();

  const [historyData, setHistoryData] = useState<History[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isUserPrivileged = user?.privileged;

  useEffect(() => {
    if (!isUserPrivileged) {
      return;
    }

    if (isUserPrivileged) {
      const fetchData = async () => await fetchAuditHistory();
      fetchData().then((data) => {
        setHistoryData(data);
        setIsLoading(false);
      });
    }
  }, [isUserPrivileged]);

  if (isLoading) {
    return <Typography>Carregando...</Typography>;
  }

  return (
    <Table className="bg-background">
      <TableCaption>Auditoria de usuários</TableCaption>
      <TableHeader className="bg-black">
        <TableRow>
          <TableHead className="text-white font-semibold text-[20px]">
            ID
          </TableHead>
          <TableHead className="text-white font-semibold text-[20px]">
            Data
          </TableHead>
          <TableHead className="text-white font-semibold text-[20px]">
            Alterações
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {historyData.map((entry) => (
          <TableRow key={entry.history_id}>
            <TableCell>{entry.history_id}</TableCell>
            <TableCell>{entry.history_date}</TableCell>
            <TableCell>
              {typeof entry.changes === "string" ? (
                entry.changes
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campo</TableHead>
                      <TableHead>Valor Antigo</TableHead>
                      <TableHead>Novo Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {entry.changes.map((change, index) => (
                      <ChangeRow key={index} change={change} />
                    ))}
                  </TableBody>
                </Table>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const ChangeRow: React.FC<{ change: Change }> = ({ change }) => (
  <TableRow>
    <TableCell>{change.field || "N/A"}</TableCell>
    <TableCell>{change.old_value?.toString() || "N/A"}</TableCell>
    <TableCell>{change.new_value?.toString() || "N/A"}</TableCell>
  </TableRow>
);
