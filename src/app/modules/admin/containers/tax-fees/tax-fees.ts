export interface TaxFees {
  id: number;
  name: string,
  default: boolean,
  enabled: boolean,
  amount: number,
  type: Type
}


declare enum Type {
  "Percentage",
  "Flat Amount",
}
