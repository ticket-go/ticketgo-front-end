export interface Change {
  field: string;
  old_value: string;
  new_value: string;
}

export interface History {
  history_id: number;
  history_date: string;
  history_change_reason: null;
  changes: Change[] | string;
}
