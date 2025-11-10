import { useEffect } from 'react';
import { useGlobalContext } from '../../contexts/GlobalContext';
import EachTopStudyPartnerCard from './eachTopStudyPartnerCard';

function TopStudyPartnersSection() {
  const { topStudyPartners, partnersLoading } = useGlobalContext();

  useEffect(() => {
    if (partnersLoading) return;
    console.log(topStudyPartners);
  }, [partnersLoading]);

  return (
    <div>
      <h2 className="mt-6 pl-1 text-lg font-medium md:text-2xl">
        Top study partners
      </h2>

      <div className="my-4 grid grid-cols-2 md:grid-cols-3">
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

      <div className="flex justify-center my-8">
        <button className="bg-(--nav-link-hover-bg) text-sm px-3 py-1 rounded-md">View all partners</button>
      </div>
    </div>
  );
}

export default TopStudyPartnersSection;
