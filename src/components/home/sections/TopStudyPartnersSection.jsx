import { Link, useNavigate } from 'react-router-dom';
import useInitialData from '../../../hooks/useInitialData';
import FetchError from '../../error/FetchError';
import StudyParternerCardLoader from '../../loaders/StudyParternerCardLoader';
import EachStudyPartnerCard from '../EachStudyPartnerCard';
import GradientButton from '../../ui/GradientButton';

function TopStudyPartnersSection() {
  const {
    data: initialData,
    isLoading: initialDataLoading,
    error: initialDataError,
    refetch: refetchInitialData,
  } = useInitialData();

  const navigate = useNavigate();

  return (
    <div>
      <div className="mb-12 space-y-4 text-center">
        <h2 className="pl-1 text-lg font-medium md:text-2xl">Top StudyMates</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Meet the most active and trusted learners in the StudyMate community.
        </p>
      </div>

      {initialDataError && !initialDataLoading && (
        <FetchError
          content="Couldn't load top study partners"
          onClick={refetchInitialData}
        />
      )}

      {initialDataLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <StudyParternerCardLoader key={`cardLoader${i}`} />
          ))}
        </div>
      )}

      {!initialDataLoading && !initialDataError && initialData && (
        <div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 pointer-coarse:gap-4">
            {initialData.topStudyPartners.map((p) => (
              <EachStudyPartnerCard key={p._id} p={p} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <GradientButton
              onClick={() => navigate('/partners')}
              content="View all partners"
              className="px-4 text-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TopStudyPartnersSection;
