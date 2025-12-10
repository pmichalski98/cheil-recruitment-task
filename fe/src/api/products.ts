import { useQuery } from '@tanstack/react-query';
import { IProduct, Capacity, EnergyClass, Feature } from '../interfaces/product';
import { API_URL } from './config';

interface UseProductsParams {
  query?: string;
  capacity?: Capacity | '';
  energyClass?: EnergyClass | '';
  feature?: Feature | '';
  sort?: 'price' | 'capacity' | '';
}

const fetchProducts = async (params: UseProductsParams): Promise<IProduct[]> => {
  const searchParams = new URLSearchParams();

  if (params.query) searchParams.append('query', params.query);
  if (params.capacity) searchParams.append('capacity', String(params.capacity));
  if (params.energyClass) searchParams.append('energyClass', params.energyClass);
  if (params.feature) searchParams.append('feature', params.feature);
  if (params.sort) searchParams.append('sort', params.sort);

  const response = await fetch(`${API_URL}/products?${searchParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const useProducts = (params: UseProductsParams = {}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
    retry: false,
  });
};
