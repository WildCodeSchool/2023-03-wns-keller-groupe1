export interface ICarbonData {
    id:string;
    title: string;
    consumption: number;
    price: number;
    createdAt: Date;
    categoryString: string;
    category: {
      title: string
    }
  }
  
  export interface ICarbonDataArray {
    data: ICarbonData[];
  }
  