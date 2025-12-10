import { useProducts } from '../../api/products';
import { ProductCard } from '../cards/Product';
import { Button } from '../button';
import { useFilterContext } from '../../contexts/filters';
import { ChevronDown } from 'react-feather';

export const Products = () => {
  const { filters, query } = useFilterContext();
  const {
    data: products = [],
    isLoading,
    error,
  } = useProducts({
    query,
    ...filters,
  });

  if (isLoading) {
    return <p className="text-center text-gray-500 text-xl mt-4">Ładowanie...</p>;
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
      <div className="grid grid-cols-3 gap-x-4 gap-y-5">
        {products.map((product) => (
          <ProductCard key={product.code} {...product} />
        ))}
      </div>
      <div className="flex justify-center mt-4 ">
        <Button
          variant={'tertiary'}
          value={'Pokaż więcej'}
          icon={<ChevronDown />}
          onClick={() => console.log('some action')}
        />
      </div>
    </>
  );
};
