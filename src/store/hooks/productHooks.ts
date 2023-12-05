import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  requestDeleteProduct,
  requestGetProducts,
  requestPostProduct,
  requestPutProduct,
} from '@/service/product';
import { Product } from '@/type/product';
import * as productActions from '../product/productAction';
import { RootState } from '..';

const useProductState = () =>
  useSelector((rootState: RootState) => rootState.productState);

export const useProducts = () => useProductState().products;

export const useGetProducts = () => {
  const dispatch = useDispatch();

  return useCallback(async () => {
    const products = await requestGetProducts();
    dispatch(productActions.getProducts(products));
  }, [dispatch]);
};

export const usePostProduct = () =>
  useCallback(async (product: Product) => requestPostProduct(product), []);

export const usePutProduct = () =>
  useCallback(async (product: Product) => requestPutProduct(product), []);

export const useRemoveProduct = () =>
  useCallback(async (id: string) => requestDeleteProduct(id), []);
