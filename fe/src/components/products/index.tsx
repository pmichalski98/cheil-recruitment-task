import { useProducts } from '../../api/products';
import { ProductCard } from '../cards/Product';
import { Button } from '../button';
import { useFilterContext } from '../../contexts/filters';
import { ChevronDown, Loader } from 'react-feather';

export const Products = () => {
  const { filters, query } = useFilterContext();
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useProducts({
    query,
    ...filters,
  });

  const products = data?.pages.flatMap((page) => page.products) ?? [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader className="w-10 h-10 animate-spin text-blue-700" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 text-xl mt-4">Błąd podczas ładowania produktów</p>
    );
  }

  if (products.length === 0) {
    return (
      <div>
        <p className="text-center text-gray-500 text-xl mt-4">
          Brak produktów spełniających kryteria wyszukiwania
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-6 sm:px-2  gap-x-4 gap-y-5">
        {products.map((product) => (
          <ProductCard key={product.code} {...product} />
        ))}
      </div>
      {hasNextPage && (
        <div className="flex justify-center mt-4">
          <Button
            variant={'tertiary'}
            value={isFetchingNextPage ? 'Ładowanie...' : 'Pokaż więcej'}
            icon={<ChevronDown />}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          />
        </div>
      )}
    </>
  );
};
