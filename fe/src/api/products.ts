import { useInfiniteQuery } from '@tanstack/react-query';
import { IProduct, Capacity, EnergyClass, Feature } from '../interfaces/product';
import { API_URL } from './config';

interface UseProductsParams {
  query?: string;
  capacity?: Capacity | '';
  energyClass?: EnergyClass | '';
  feature?: Feature | '';
  sort?: 'price' | 'capacity' | '';
}

interface ProductsResponse {
  products: IProduct[];
  hasMore: boolean;
  nextPage: number;
}

const fetchProducts = async (
  params: UseProductsParams,
  page: number
): Promise<ProductsResponse> => {
  const searchParams = new URLSearchParams();

  if (params.query) searchParams.append('query', params.query);
  if (params.capacity) searchParams.append('capacity', String(params.capacity));
  if (params.energyClass) searchParams.append('energyClass', params.energyClass);
  if (params.feature) searchParams.append('feature', params.feature);
  if (params.sort) searchParams.append('sort', params.sort);
  searchParams.append('page', String(page));

  const response = await fetch(`${API_URL}/products?${searchParams}`, {
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
  return useInfiniteQuery({
    queryKey: ['products', params],
    queryFn: ({ pageParam }) => fetchProducts(params, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextPage : undefined),
    retry: 1,
  });
};
