import { IOrder } from "../../orders/Model/order";

export interface ICustomer{
  id: number,
  mobile: number,
  email: string,
  name: string,
  status: boolean,
  head_count: number,
  section_id: number,
  created_at : Date,
  deleted_at : Date|null,
  updated_at : Date
}


export interface ICustomerDialog extends ICustomer{
  orders: IOrder[],
}

export interface IFilter{
  search? : string|null,
  startDate? : Date|null,
  endDate? : Date|null,
  status? : string|null
}