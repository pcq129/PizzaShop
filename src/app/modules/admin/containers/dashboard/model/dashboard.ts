export interface IDashboardData {
  revenue: any;
  customer_growth: any;
  total_sales: number;
  order_count: number;
  averate_order: number;
  waitinglist_count: number;
  average_waiting_minutes: number;
  new_customer_count: number;
  top_selling: [
    {name: string, sell_count: number}
  ];
  least_selling: [
    {name: string, sell_count: number}
  ];
}

export interface IGraph {
  labels: string[];
  datasets: IDataset[];
}

export interface IDataset {
  label: string;
  data: number[];
  backgroundColor: string;
  tension: number;
}
