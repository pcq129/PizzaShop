export interface IOrder {
  id?: number;
  customer_id?: number;
  order_status?: EOrderStatus;
  payment_mode?: EPaymentMode;
  payment_status?: EPaymentStatus;
  bill_amount?: number;
  rating?: string;
  comment?: string;
  order_data?: any;
  created_at?: Date;
  deleted_at?: Date | null;
  updated_at?: Date;
}

export enum EOrderStatus {
  Completed,
  Running,
}

export enum EPaymentMode {
  Online,
  Cash,
}

export enum EPaymentStatus {
  Completed,
  Pending,
}

export interface IOngoingOrder extends IOrder {
  table_ids?: number[] | [];
  order_id?: number;
}

export interface IFeedback {
  rating: string;
  comment: string;
}
