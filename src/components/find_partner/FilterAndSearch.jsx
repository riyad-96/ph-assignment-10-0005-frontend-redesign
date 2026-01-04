import { AnimatePresence } from 'motion/react';
import { ArrowUpDown, Search, SearchX } from 'lucide-react';
import FilterDropDown from './FilterDropDown';

export default function FilterAndSearch({
  isFilterDropdownShowing,
  setIsFilterDropdownShowing,
  filters,
  setFilters,
  search,
  setSearch,
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="relative my-4">
        <button
          onClick={() => {
            setIsFilterDropdownShowing(true);
          }}
          className={`sort-dropdown-open-btn group flex h-9 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition-colors duration-150 ${
            isFilterDropdownShowing
              ? ' border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-950 dark:text-indigo-300'
              : ' border-zinc-200 bg-white text-zinc-700 hover:border-indigo-300 hover:bg-indigo-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-indigo-700 dark:hover:bg-zinc-700'
          }`}
        >
          <span>Filters</span>
          <span
            className={`flex items-center justify-center rounded-md p-1 transition-all duration-150 ${
              isFilterDropdownShowing
                ? 'bg-indigo-200 text-indigo-700 dark:bg-indigo-800 dark:text-indigo-300'
                : 'bg-zinc-100 group-hover:bg-indigo-100 dark:bg-zinc-700 dark:group-hover:bg-zinc-600'
            }`}
          >
            <ArrowUpDown size="14" />
          </span>
        </button>

        <AnimatePresence>
          {isFilterDropdownShowing && (
            <FilterDropDown
              filters={filters}
              setFilters={setFilters}
              setIsFilterDropdownShowing={setIsFilterDropdownShowing}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="group relative flex h-10 items-center overflow-hidden rounded-lg border border-zinc-200 bg-white transition-all duration-150 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:focus-within:border-indigo-400 dark:focus-within:ring-indigo-400/20">
        <div className="relative grid h-full place-items-center px-3.5">
          {search ? (
            <>
              <SearchX
                size="18"
                className="cursor-pointer text-zinc-500 transition-colors hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400"
              />
              <button
                onClick={() => setSearch('')}
                className="absolute inset-0 z-2"
              ></button>
            </>
          ) : (
            <Search size="18" className="text-zinc-400 dark:text-zinc-500" />
          )}
        </div>
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="h-full w-64 min-w-0 bg-transparent pr-4 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 max-sm:w-48 dark:text-zinc-100 dark:placeholder:text-zinc-500"
          type="text"
          placeholder="Search partners..."
        />
      </div>
    </div>
  );
}
