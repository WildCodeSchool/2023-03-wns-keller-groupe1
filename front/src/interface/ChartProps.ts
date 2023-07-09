import { ICarbonDataArray } from "./CarbonData";

export interface ChartProps {
    data: ICarbonDataArray;
    selectedMonth: string ;
  }
  
  export interface ChartBarProps {
    data: ICarbonDataArray;
    selectedMonth: string ;

  }