export interface ICarbonData {
    id:string;
    title: string;
    consumption: number;
    createdAt: Date;
    modifiedAt: string;
    __typename: string;
    categoryString: string;
    category: {
      title: string
    }
  }
  
  export interface ICarbonDataArray {
    data: ICarbonData[];
  }
  
