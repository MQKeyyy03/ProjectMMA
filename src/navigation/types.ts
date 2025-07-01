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
};
