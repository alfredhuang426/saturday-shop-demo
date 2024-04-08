import { Coupon } from "./coupon.type";
import { Product } from "./products.type";

export type Cart = {
  carts: CartItem[];
  total: number;
  final_total: number;
};

export type CartItem = {
  coupon?: Coupon;
  final_total: number;
  id: string;
  product: Product;
  product_id: string;
  qty: number;
  total: number;
};
