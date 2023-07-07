export interface ICarbonData {
    id:string;
    title: string;
    consumption: number;
    price: number;
    createdAt: Date;
  }
  
  export interface ICarbonDataArray {
    data: ICarbonData[];
  }
  