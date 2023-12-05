import { Product } from '@/type/product';

export const GET_PRODUCTS = 'GET_PRODUCTS';

export const getProducts = (products: Product[]) => ({
  type: GET_PRODUCTS,
  payload: {
    products,
  },
});

export interface GetProducts {
  type: typeof GET_PRODUCTS;
  payload: {
    products: Product[];
  };
}
