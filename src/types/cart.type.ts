import { Coupon } from "./coupon.type";
import { Product } from "./products.type";

export type Cart = {
  carts: {
    coupon?: Coupon;
    final_total: number;
    id: string;
    product: Product;
    product_id: string;
    qty: number;
    total: number;
  }[];
  total: number;
  final_total: number;
};
