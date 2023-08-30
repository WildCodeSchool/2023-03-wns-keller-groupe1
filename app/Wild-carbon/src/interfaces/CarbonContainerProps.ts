export interface CarbonContainerProps {
  title: string;
  modifiedAt: Date;
  id: number;
  consumption: number;
  refreshData: () => void;
  setExpenseName: (name: string) => void;
  setShowDashboardForm: (showDashboardForm: boolean) => void;
  setCategory: (category: string) => void;
  setCarbonWeight: (carbonWeight: number) => void;
  setIsUpdating: (isUpdating: boolean) => void;
  setUpdatingExpenseId: (updatingExpenseId: number) => void;
  categoryString: string;
}
