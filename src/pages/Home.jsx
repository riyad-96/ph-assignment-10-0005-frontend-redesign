import { useEffect } from 'react';
import Banner from '../components/home/Banner';
import TopStudyPartnersSection from '../components/home/TopStudyPartnersSection';
import TwoExtraSection from '../components/home/TwoExtraSection';

function Home() {
  useEffect(() => {
    document.querySelector('title').textContent = 'Home • StudyMate';
  }, []);

  return (
    <div className="px-2 md:px-3">
      <div className="mx-auto max-w-[1440px]">
        <Banner />
        <TopStudyPartnersSection />
        <TwoExtraSection />
      </div>
    </div>
  );
}

export default Home;
