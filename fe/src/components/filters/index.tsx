import { Dropdown, DropdownOption } from '../dropdown';
import { Search } from '../search';
import { CAPACITIES, ENERGY_CLASSES, FEATURES } from '../../interfaces/product';

const sortOptions: DropdownOption[] = [
  { name: 'price', title: 'Cena' },
  { name: 'capacity', title: 'Pojemność' },
];

const featuresOptions: DropdownOption[] = FEATURES.map((name) => ({ name }));
const energyClassOptions: DropdownOption[] = ENERGY_CLASSES.map((name) => ({ name }));
const capacityOptions: DropdownOption[] = CAPACITIES.map((name) => ({ name }));

export const Filters = () => {
  return (
    <div>
      <div className="mb-8 pt-6 flex sm:max-w-xs px-6 sm:px-2 mx-auto">
        <Search />
      </div>
      <div className="grid px-6 sm:px-2  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-3 mb-4">
        <div>
          <div className="block text-sm font-bold text-black mb-2">Sortuj</div>
          <Dropdown options={sortOptions} filter={'sort'} />
        </div>
        <div>
          <div className="block text-sm font-bold text-black  mb-2">Funkcje</div>
          <Dropdown options={featuresOptions} filter={'feature'} />
        </div>
        <div>
          <div className="block text-sm font-bold text-black  mb-2">Klasa energetyczna</div>
          <Dropdown options={energyClassOptions} filter={'energyClass'} />
        </div>
        <div>
          <div className="block text-sm font-bold text-black  mb-2">Pojemność</div>
          <Dropdown options={capacityOptions} filter={'capacity'} />
        </div>
      </div>
    </div>
  );
};
