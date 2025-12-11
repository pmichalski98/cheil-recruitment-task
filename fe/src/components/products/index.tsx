import { useProducts } from '../../api/products';
import { ProductCard } from '../cards/Product';
import { Button } from '../button';
import { useFilterContext } from '../../contexts/filters';
import { AlertCircle, ChevronDown, Loader, RefreshCw } from 'react-feather';

export const Products = () => {
  const { filters, query } = useFilterContext();
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useProducts({
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
      <div className="flex flex-col items-center gap-4 py-12 px-6 mx-auto max-w-md">
        <div className="rounded-full bg-red-100 p-4">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Błąd podczas ładowania produktów
          </h3>
          <p className="text-gray-500">
            Nie udało się pobrać produktów. Sprawdź połączenie i spróbuj ponownie.
          </p>
        </div>
        <Button
          variant="secondary"
          value="Spróbuj ponownie"
          icon={<RefreshCw className="w-4 h-4" />}
          onClick={() => refetch()}
        />
      </div>
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
