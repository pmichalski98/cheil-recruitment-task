import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Products } from './components/products';
import { Filters } from './components/filters';
import { FiltersProvider } from './contexts/filters';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto max-w-5xl">
          <FiltersProvider>
            <Filters />
            <Products />
          </FiltersProvider>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
