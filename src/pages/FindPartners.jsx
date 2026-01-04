import { useEffect, useRef, useState } from 'react';
import serverAPI from '../utils/server';
import { useDebounce, useWindowSize } from 'kitzo';
import EachStudyPartnerCard from '../components/home/EachStudyPartnerCard';
import StudyParternerCardLoader from '../components/loaders/StudyParternerCardLoader';
import { ArrowUpDown, Search, SearchX } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import FilterDropDown from '../components/find_partner/FilterDropDown';
import { findPartnerLines } from '../utils/contants';
import { Pagination } from '@heroui/pagination';
import FetchError from '../components/error/FetchError';
import { Helmet } from 'react-helmet';
import FilterAndSearch from '../components/find_partner/FilterAndSearch';

export default function FindPartners() {
  const server = serverAPI();

  // sorting and fetching with tanstack query
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const [filters, setFilters] = useState({
    rating: null,
    studyMode: null,
    experience: null,
    search: '',
    page: 1,
  });

  useEffect(() => {
    setFilters((prev) => ({ ...prev, page: 1, search: debouncedSearch }));
  }, [debouncedSearch]);

  const {
    data: partnerData,
    isLoading: partnerDataLoading,
    error: partnerDataError,
    refetch: refetchPartnerData,
  } = useQuery({
    queryKey: ['all-partners', filters],
    queryFn: async () => {
      const res = await server.post('base-partner/query', filters);
      return res.data;
    },
  });

  // listers for closing drop down
  const [isFilterDropdownShowing, setIsFilterDropdownShowing] = useState(false);
  useEffect(() => {
    function closeSortDropDown(e) {
      if (e.target.closest('.sort-dropdown-open-btn')) return;
      if (e.target.closest('.sort-dropdown')) return;

      setIsFilterDropdownShowing(false);
    }

    document.addEventListener('click', closeSortDropDown);
    document.addEventListener('touchstart', closeSortDropDown);

    return () => {
      document.removeEventListener('click', closeSortDropDown);
      document.removeEventListener('touchstart', closeSortDropDown);
    };
  }, []);

  const tag_lines = useRef(
    findPartnerLines[Math.floor(Math.random() * findPartnerLines.length)],
  );

  const { screenWidth } = useWindowSize({ delay: 40 });

  return (
    <div className="px-2 md:px-3">
      <Helmet title="Find partners • StudyMate" />

      <div className="mx-auto max-w-360">
        <div className="space-y-2 px-4 pt-4 pb-12 text-center">
          <h1 className="text-lg font-medium sm:text-xl md:text-2xl md:font-semibold xl:text-4xl">
            {tag_lines.current.heading}
          </h1>
          <p className="opacity-80">{tag_lines.current.description}</p>
        </div>

        <FilterAndSearch
          filters={filters}
          isFilterDropdownShowing={isFilterDropdownShowing}
          setIsFilterDropdownShowing={setIsFilterDropdownShowing}
          search={search}
          setSearch={setSearch}
          setFilters={setFilters}
        />

        {partnerDataLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3">
            {Array.from({ length: screenWidth > 767 ? 6 : 4 }).map((_, i) => (
              <StudyParternerCardLoader key={`findParter${i}`} />
            ))}
          </div>
        )}

        {partnerDataError && <FetchError onClick={refetchPartnerData} />}

        {!partnerDataLoading &&
          !partnerDataError &&
          partnerData &&
          partnerData.profiles.length > 0 && (
            <div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 pointer-coarse:gap-4">
                {partnerData.profiles.map((p) => (
                  <EachStudyPartnerCard key={p._id} p={p} studymode={true} />
                ))}
              </div>

              <div className="pointer-find:cursor-pointer mx-auto mt-4 grid w-fit rounded-xl bg-(--white) p-2 transition-colors duration-150">
                <Pagination
                  style={{
                    overflow: 'hidden',
                  }}
                  showControls
                  onChange={(page) => setFilters((prev) => ({ ...prev, page }))}
                  total={Math.ceil(partnerData.totalProfiles / 6)}
                  page={filters.page}
                  color={'secondary'}
                />
              </div>
            </div>
          )}

        {!partnerDataLoading &&
          !partnerDataError &&
          partnerData &&
          partnerData.profiles.length === 0 && (
            <div className="grid min-h-62.5 place-items-center md:min-h-87.5">
              <span>Profiles not found.</span>
            </div>
          )}
      </div>
    </div>
  );
}
