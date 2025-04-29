import { Product } from "./product";

export type TQueryParams = {
  limit?: number;
  skip?: number;
};

export type TProductResponse = {
  products: Product[];
  total: number;
};