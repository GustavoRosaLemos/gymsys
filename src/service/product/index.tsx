import { Product } from '@/type/product';
import { requestService } from '@/utils/requestService';

export const requestGetProduct = async (id: string) =>
  requestService(`http://localhost:4000/products/${id}`, {}, {});

export const requestGetProducts = async () =>
  requestService('http://localhost:4000/products', {}, {});

export const requestPostProduct = async (product: Product) =>
  requestService('http://localhost:4000/products', product, {}, false, 'POST');

export const requestDeleteProduct = async (id: string) =>
  requestService(
    `http://localhost:4000/products/${id}`,
    {},
    {},
    false,
    'DELETE'
  );

export const requestPutProduct = async (product: Product) =>
  requestService(
    `http://localhost:4000/products/${product.id}`,
    product,
    {},
    false,
    'PUT'
  );
