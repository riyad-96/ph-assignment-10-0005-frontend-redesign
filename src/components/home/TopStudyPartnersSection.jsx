import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../contexts/GlobalContext';
import EachStudyPartnerCard from './EachStudyPartnerCard';
import StudyParternerCardLoader from '../loaders/StudyParternerCardLoader';

function TopStudyPartnersSection() {
  const { topStudyPartners, partnersLoading } = useGlobalContext();

  return (
    <div>
      <h2 className="mt-6 pl-1 text-lg font-medium md:text-2xl">
        Top study partners
      </h2>

      <div className="my-4 grid grid-cols-2 md:grid-cols-3">
        {partnersLoading ? (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <StudyParternerCardLoader key={`cardLoader${i}`} />
            ))}
          </>
        ) : (
          <>
            {topStudyPartners.map((p) => (
              <EachStudyPartnerCard key={p._id} p={p} />
            ))}
          </>
        )}
      </div>

      <div className="my-8 flex justify-center">
        <Link
          to="/partners"
          className="rounded-md bg-(--accent-color) px-3 py-1 text-sm"
        >
          View all partners
        </Link>
      </div>
    </div>
  );
}

export default TopStudyPartnersSection;
