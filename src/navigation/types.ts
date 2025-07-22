import { Product } from "@data/products";
import { Order } from "@data/orders";

// src/navigation/types.ts
export type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  EditProfile: undefined;
  ProductDetail: { productId: string };
  ProductListByCategory: { category: string };
  Search: undefined;
  Favorite: undefined;
  Category: undefined;
  Login: undefined;
  Cart: undefined;
  Payment: { orderedProducts: Product[] }; // nếu Payment vẫn cần nhận orderedProducts
  MockPayment: { linkedMethod?: string; orderedProducts?: Product[] } | undefined;
  LinkAccount: { methodId: string; methodName: string };
  Receipt: { methodId: string; methodName: string; amount: number };

  OrderPending: { methodId: string; methodName: string };
  OrderList: undefined; 
  OrderDetail: { order: Order };
};
