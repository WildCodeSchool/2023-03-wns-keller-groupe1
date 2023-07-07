export interface ICarbonData {
    title: string;
    consumption: number;
    price: number;
    createdAt: Date;
  }
  
  export interface ICarbonDataArray {
    data: ICarbonData[];
  }
  