import { Product } from './product';

export interface Order {
  id?: string;
  userId?: number;
  status: string;
  orderType: string;
  discount: number;
  fees: number;
  total: number;
  items: OrderItem[];
  paymentType: string;
}

export interface OrderItem extends Product {
  quantity: number;
}
