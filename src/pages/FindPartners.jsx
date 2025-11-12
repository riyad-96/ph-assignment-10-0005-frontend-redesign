import { useEffect, useMemo, useRef, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { toast } from 'kitzo/react';
import EachStudyPartnerCard from '../components/home/EachStudyPartnerCard';
import StudyParternerCardLoader from '../components/loaders/StudyParternerCardLoader';
import { ArrowUpDown, Search, SearchX } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const sorts = [
  {
    sort: 'high',
    text: 'Rating: high',
  },
  {
    sort: 'low',
    text: 'Rating: low',
  },
  {
    sort: 'online',
    text: 'Study mode: Online',
  },
  {
    sort: 'offline',
    text: 'Study mode: Offline',
  },
  {
    sort: 'beginner',
    text: 'Experience: Beginner',
  },
  {
    sort: 'intermediate',
    text: 'Experience: Intermediate',
  },
  {
    sort: 'expert',
    text: 'Experience: Expert',
  },
  {
    sort: 'reset',
    text: 'Show all',
  },
];

const lines = [
  {
    heading: 'Find Your Perfect Study Match!',
    description: 'Connect with learners who share your goals and grow together',
  },
  {
    heading: 'Study Smarter, Not Harder — Together',
    description:
      'Team up with students who motivate, challenge, and inspire you',
  },
  {
    heading: 'Learning Feels Easier When You’re Not Alone',
    description:
      'Discover StudyMates who fit your rhythm and help you stay consistent',
  },
  {
    heading: 'Turn Boring Study Sessions into Power Hours',
    description: 'Match with focused partners and make every minute count',
  },
  {
    heading: 'Find a StudyMate Who Gets You',
    description: 'Chat, plan, and learn side by side — from anywhere',
  },
  {
    heading: 'Build Discipline Through Friendship',
    description: 'Stay accountable and crush your goals with people who care',
  },
  {
    heading: 'Your Study Journey Deserves Good Company',
    description: 'Join motivated learners who lift each other up every day',
  },
];

function FindPartners() {
  const server = useAxios();

  // all partner states
  const [allPartners, setAllPartners] = useState([]);
  const [allPartnersLoading, setAllPartnersLoading] = useState(true);

  // search states
  const [searchedPartners, setSearchedPartners] = useState([]);
  const [searching, setSearching] = useState(false);
  const [search, setSearch] = useState('');

  // sort states
  const [sortDropDownShowing, setSortDropDownShowing] = useState(false);
  const [sort, setSort] = useState('');

  const displayProfiles = useMemo(() => {
    let base = search.trim() ? searchedPartners : allPartners;
    let result = [...base];

    if (sort === 'reset') {
      return result;
    }
    if (sort === 'high') {
      return result.sort((a, b) => b.rating - a.rating);
    }
    if (sort === 'low') {
      return result.sort((a, b) => a.rating - b.rating);
    }
    if (sort === 'online') {
      return result.filter((p) => p.studyMode.toLowerCase() === 'online');
    }
    if (sort === 'offline') {
      return result.filter((p) => p.studyMode.toLowerCase() === 'offline');
    }
    if (sort === 'beginner') {
      return result.filter(
        (p) => p.experienceLevel.toLowerCase() === 'beginner',
      );
    }
    if (sort === 'intermediate') {
      return result.filter(
        (p) => p.experienceLevel.toLowerCase() === 'intermediate',
      );
    }
    if (sort === 'expert') {
      return result.filter((p) => p.experienceLevel.toLowerCase() === 'expert');
    }

    return result;
  }, [allPartners, searchedPartners, search, sort]);

  // fetch all partners
  useEffect(() => {
    (async () => {
      try {
        const res = await server.get('base-partner/all');
        const randomSorted = res.data
          .map((p) => ({ p, random: Math.random() }))
          .sort((a, b) => a.random - b.random)
          .map((obj) => obj.p);
        setAllPartners(randomSorted);
      } catch (err) {
        toast.error('Error loading partners profiles', {
          duration: 2500,
          style: { color: 'black' },
        });
        console.error(err);
      } finally {
        setAllPartnersLoading(false);
      }
    })();
  }, []);

  // search function
  const timeout = useRef(null);
  async function searchPartnersProfiles(value) {
    if (!value.trim()) return;
    setSearching(true);

    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(async () => {
      try {
        const res = await server.get(
          `base-partner/query?search=${value.trim()}`,
        );
        setSearchedPartners(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setSearching(false);
      }
    }, 600);
  }

  // listers for closing drop down
  useEffect(() => {
    function closeSortDropDown(e) {
      if (e.target.closest('.sort-dropdown-open-btn')) return;
      if (e.target.closest('.sort-dropdown')) return;

      setSortDropDownShowing(false);
    }

    document.addEventListener('click', closeSortDropDown);
    document.addEventListener('touchstart', closeSortDropDown);

    return () => {
      document.removeEventListener('click', closeSortDropDown);
      document.removeEventListener('touchstart', closeSortDropDown);
    };
  }, []);

  const tag_lines = useRef(lines[Math.floor(Math.random() * lines.length)]);

  return (
    <div className="px-2 md:px-3">
      <div className="mx-auto max-w-[1440px]">
        <div className="space-y-2 px-4 pt-4 pb-12 text-center">
          <h1 className="text-lg font-medium sm:text-xl md:text-2xl md:font-semibold xl:text-4xl">
            {tag_lines.current.heading}
          </h1>
          <p className="opacity-80">{tag_lines.current.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative my-4">
            <button
              onClick={() => {
                setSortDropDownShowing(true);
              }}
              className={`sort-dropdown-open-btn group flex h-8 items-center gap-1 rounded-md pr-2.5 pl-3 text-sm font-medium transition-colors duration-150 ${sortDropDownShowing ? 'bg-(--accent-color)' : 'bg-(--accent-color)/50 hover:bg-(--accent-color)'}`}
            >
              <span>Sort by</span>
              <span
                className={`rounded-md px-1 py-0.5 transition-colors duration-150 ${sortDropDownShowing ? '' : 'bg-(--accent-color) group-hover:bg-transparent'}`}
              >
                <ArrowUpDown size="14" />
              </span>
            </button>

            <AnimatePresence>
              {sortDropDownShowing && (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  transition={{
                    duration: 0.15,
                  }}
                  className="sort-dropdown dropdown-shadow absolute top-[calc(100%+5px)] left-0 z-5 w-[200px] origin-top-left rounded-lg bg-(--dropdown-bg) p-2"
                >
                  <div className="grid gap-0.5 pointer-fine:cursor-pointer">
                    {sorts.map(({ sort, text }) => (
                      <button
                        key={sort}
                        onClick={() => {
                          setTimeout(() => {
                            setSortDropDownShowing(false);
                          }, 50);
                          setSort(sort);
                        }}
                        className={`rounded-md px-3 py-1.5 text-start text-sm pointer-fine:hover:bg-(--accent-color) ${sort === 'reset' ? 'bg-(--accent-color)/50' : ''}`}
                      >
                        {text}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex h-8 rounded-md border border-(--slick-border-clr) transition-colors duration-150 focus-within:border-zinc-500/40">
            <div className="relative grid place-items-center rounded-l-md bg-(--accent-color)/30 px-3">
              {search ? (
                <>
                  <SearchX size="16" className="opacity-70" />
                  <button
                    onClick={() => setSearch('')}
                    className="absolute inset-0 z-2"
                  ></button>
                </>
              ) : (
                <Search size="16" className="opacity-70" />
              )}
            </div>
            <input
              onChange={(e) => {
                searchPartnersProfiles(e.target.value);
                setSearch(e.target.value);
              }}
              value={search}
              className="w-[230px] min-w-0 rounded-r-md bg-(--white) px-3 text-sm transition-[width,color,background-color] duration-150 outline-none max-sm:w-[170px]"
              type="text"
              placeholder="Search here"
            />
          </div>
        </div>

        {searching ? (
          <div className="grid min-h-[300px] place-items-center">
            <span className="loading loading-spinner loading-xl"></span>
          </div>
        ) : (
          <>
            {allPartnersLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3">
                {Array.from({ length: 10 }).map((_, i) => (
                  <StudyParternerCardLoader key={`findParter${i}`} />
                ))}
              </div>
            ) : (
              <>
                {displayProfiles.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3">
                    {displayProfiles.map((p) => (
                      <EachStudyPartnerCard
                        key={p._id}
                        p={p}
                        studymode={true}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid min-h-[250px] place-items-center md:min-h-[350px]">
                    <span>Profile not found.</span>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default FindPartners;
