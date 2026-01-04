import useInitialData from '../../../hooks/useInitialData';
import { staticReviews } from '../../../utils/contants';
import FetchError from '../../error/FetchError';
import ReviewCardLoader from '../../loaders/ReviewCardLoader';

export default function ReviewsSection() {
  const {
    data: initialData,
    isLoading: initialDataLoading,
    error: initialDataError,
    refetch: refetchInitialData,
  } = useInitialData();

  return (
    <section>
      <div className="mb-12 space-y-4 text-center">
        <h2 className="pl-1 text-lg font-medium md:text-2xl">
          What Learners Say
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Honest reviews from students who found their perfect study match.
        </p>
      </div>

      {initialDataError && !initialDataLoading && (
        <FetchError
          content="Couldn't load reviews"
          onClick={refetchInitialData}
        />
      )}

      {initialDataLoading && <ReviewCardLoader />}

      {!initialDataError && !initialDataLoading && initialData && (
        <div className="my-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {initialData.reviews.map((p, i) => (
            <div
              key={p._id}
              className="space-y-3 rounded-xl border border-gray-200 bg-(--white) p-4 transition-all duration-150 hover:border-indigo-300 dark:border-gray-700 dark:hover:border-indigo-500"
            >
              <div className="flex items-center gap-2">
                <div className="size-8 overflow-hidden rounded-full md:size-10">
                  <img
                    draggable="false"
                    className="size-full object-cover object-center"
                    src={p.profileImage}
                    alt={p.name}
                  />
                </div>
                <h5 className="font-medium dark:text-white">{p.name}</h5>
              </div>
              <p className="leading-5 tracking-wide opacity-80 max-sm:text-sm dark:text-gray-400">
                "{staticReviews[i]}"
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
