"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Change, History } from "@/types/history";

interface HistoryTableProps {
  historyData: History[];
}

export function HistoryTable({ historyData }: HistoryTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const ChangeRow: React.FC<{ change: Change }> = ({ change }) => (
    <TableRow>
      <TableCell>{change.field || "N/A"}</TableCell>
      <TableCell>{change.old_value?.toString() || "N/A"}</TableCell>
      <TableCell>{change.new_value?.toString() || "N/A"}</TableCell>
    </TableRow>
  );

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
            <TableCell>{formatDate(entry.history_date)}</TableCell>
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
