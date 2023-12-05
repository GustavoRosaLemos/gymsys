'use client';

import {
  useGetProducts,
  useProducts,
  useRemoveProduct,
} from '@/store/hooks/productHooks';
import { useEffect, useState } from 'react';
import { ActionIcon, Group, LoadingOverlay } from '@mantine/core';
import { getPriceLabel } from '@/utils';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { Product } from '@/type/product';
import { IconAdjustments, IconTrash } from '@tabler/icons-react';
import Table from '../Table';
import ProductModal from '../ProductModal';

function ProductsTable() {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const getProducts = useGetProducts();
  const removeProduct = useRemoveProduct();
  const products = useProducts();

  useEffect(() => {
    setLoading(true);
    getProducts()
      .catch(() =>
        notifications.show({
          message: 'Falha ao buscar por produtos',
          color: 'red',
        })
      )
      .finally(() => setLoading(false));
  }, [getProducts]);

  const handleRemoveProduct = (id: string) => {
    setLoading(true);
    removeProduct(id)
      .then(() => {
        notifications.show({
          message: 'Produto excluido com sucesso!',
          color: 'green',
        });
        getProducts();
      })
      .catch(() =>
        notifications.show({
          message: 'Falha ao excluir produto.',
          color: 'red',
        })
      )
      .finally(() => setLoading(false));
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(undefined);
    setSelectedProduct(product);
    open();
  };

  return (
    <>
      <LoadingOverlay visible={loading} zIndex={1000} />
      {products && (
        <Table
          cols={['Nome', 'Descrição', 'preço', 'Ações']}
          rows={products.map((product) => [
            product.name,
            product.description,
            getPriceLabel(product.price),
            <Group>
              <ActionIcon
                color="red"
                variant="filled"
                aria-label="Settings"
                onClick={() => handleRemoveProduct(product.id ?? '')}
              >
                <IconTrash
                  style={{ width: '70%', height: '70%' }}
                  stroke={1.5}
                />
              </ActionIcon>
              <ActionIcon
                color="orange"
                variant="filled"
                aria-label="Settings"
                onClick={() => handleEditProduct(product)}
              >
                <IconAdjustments
                  style={{ width: '70%', height: '70%' }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Group>,
          ])}
        />
      )}
      <ProductModal opened={opened} close={close} product={selectedProduct} />
    </>
  );
}

export default ProductsTable;
