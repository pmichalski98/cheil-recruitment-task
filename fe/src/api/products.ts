import { useQuery } from '@tanstack/react-query';
import { IProduct } from '../interfaces/product';
import { API_URL } from './config';

const fetchProducts = async (): Promise<IProduct[]> => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    retry: false,
  });
};
