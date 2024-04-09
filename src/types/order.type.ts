import { User } from "./User.type";
import { Product } from "./products.type";

export type Order = {
  success?: boolean;
  order?: {
    create_at: number;
    id: string;
    is_paid: boolean;
    message: string;
    products: {
      [key: string]: {
        final_total: number;
        id: string;
        product: Product;
        product_id: string;
        qty: number;
        total: number;
      };
    };
    total: number;
    user: User;
  };
};
