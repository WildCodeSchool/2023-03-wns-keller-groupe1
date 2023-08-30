export interface DashboardFormProps {
  setShowDashboardForm: React.Dispatch<React.SetStateAction<boolean>>;
  showDashboardForm: boolean;
  setExpenseName: React.Dispatch<React.SetStateAction<string>>;
  ExpenseName: string | null;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  Category: string | null;
  setCarbonWeight: React.Dispatch<React.SetStateAction<number>>;
  CarbonWeight: number | null;
  createOrUpdateExpense: () => void;
  resetState: () => void;
}
