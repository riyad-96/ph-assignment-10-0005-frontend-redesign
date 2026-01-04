import { motion } from 'motion/react';
import FilterButton from './FilterButton';
import ClearFilterButton from './ClearFilterButton';
import { X } from 'lucide-react';

export default function FilterDropDown({
  filters,
  setFilters,
  setIsFilterDropdownShowing,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.15 }}
      className="sort-dropdown absolute top-[calc(100%+5px)] left-0 z-5 w-72 origin-top-left space-y-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-xl transition-colors duration-150 dark:border-zinc-700 dark:bg-zinc-800"
    >
      <button
        className="group absolute top-3 right-3 z-5 grid size-8 place-items-center rounded-full bg-zinc-100 transition-colors duration-150 hover:bg-zinc-200 active:scale-95 dark:bg-zinc-700 dark:hover:bg-zinc-600"
        onClick={() => setIsFilterDropdownShowing(false)}
      >
        <X
          size="16"
          strokeWidth={2.5}
          className="text-zinc-600 dark:text-zinc-300"
        />
      </button>

      <div>
        <h3 className="mb-3 font-medium text-zinc-900 dark:text-white">
          Filters
        </h3>
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Rating:
          </p>
          <div className="flex gap-2 text-sm">
            <FilterButton
              onClick={() =>
                setFilters((prev) => ({ ...prev, page: 1, rating: 'asc' }))
              }
              content={'Low'}
              isSelected={filters.rating === 'asc'}
              className="h-7.5 px-3"
            />
            <FilterButton
              onClick={() =>
                setFilters((prev) => ({ ...prev, page: 1, rating: 'desc' }))
              }
              content={'High'}
              isSelected={filters.rating === 'desc'}
              className="h-7.5 px-3"
            />
            <ClearFilterButton
              onClick={() => {
                if (filters.rating === null) return;
                setFilters((prev) => ({ ...prev, page: 1, rating: null }));
              }}
              className="h-7.5 px-2.5"
            />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Study mode:
          </p>
          <div className="flex gap-2 text-sm">
            <FilterButton
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  page: 1,
                  studyMode: 'Online',
                }))
              }
              content={'Online'}
              isSelected={filters.studyMode === 'Online'}
              className="h-7.5 px-3"
            />
            <FilterButton
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  page: 1,
                  studyMode: 'Offline',
                }))
              }
              content={'Offline'}
              isSelected={filters.studyMode === 'Offline'}
              className="h-7.5 px-3"
            />
            <ClearFilterButton
              onClick={() => {
                if (filters.studyMode === null) return;
                setFilters((prev) => ({ ...prev, page: 1, studyMode: null }));
              }}
              className="h-7.5 px-2.5"
            />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Experience:
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            <FilterButton
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  page: 1,
                  experience: 'Beginner',
                }))
              }
              content={'Beginner'}
              isSelected={filters.experience === 'Beginner'}
              className="h-7.5 px-3"
            />
            <FilterButton
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  page: 1,
                  experience: 'Intermediate',
                }))
              }
              content={'Intermediate'}
              isSelected={filters.experience === 'Intermediate'}
              className="h-7.5 px-3"
            />
            <FilterButton
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  page: 1,
                  experience: 'Expert',
                }))
              }
              content={'Expert'}
              isSelected={filters.experience === 'Expert'}
              className="h-7.5 px-3"
            />
            <ClearFilterButton
              onClick={() => {
                if (filters.experience === null) return;
                setFilters((prev) => ({ ...prev, page: 1, experience: null }));
              }}
              className="h-7.5 px-2.5"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
