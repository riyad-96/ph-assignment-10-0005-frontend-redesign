import { useEffect } from 'react';
import { useGlobalContext } from '../../contexts/GlobalContext';
import EachTopStudyPartnerCard from './eachTopStudyPartnerCard';

function TopStudyPartners() {
  const { topStudyPartners, partnersLoading } = useGlobalContext();

  useEffect(() => {
    if (partnersLoading) return;
    console.log(topStudyPartners);
  }, [partnersLoading]);

  return (
    <div>
      <h2 className="pl-1 text-lg font-medium md:text-2xl mb-4">
        Top study partners
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3">
        {partnersLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {topStudyPartners.map((p) => (
              <EachTopStudyPartnerCard key={p._id} p={p} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default TopStudyPartners;
