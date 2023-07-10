import { ICarbonDataArray } from "./CarbonData";

export interface ChartProps {
    data: ICarbonDataArray;
    selectedMonth: string ;
    selectedYear: string ;
    OptionMonthSelected: boolean;
  }
  