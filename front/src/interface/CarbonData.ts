export interface ICarbonData {
  title: string;
  consumption: number;
  price: number;
  createdAt: Date;
  modifiedAt: string;
  __typename: string;
}

export interface ICarbonDataArray {
  data: ICarbonData[];
}
