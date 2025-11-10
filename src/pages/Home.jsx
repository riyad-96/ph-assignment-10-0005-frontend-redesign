import Banner from '../components/home/Banner';
import TopStudyPartners from '../components/home/TopStudyPartners';

function Home() {
  return (
    <div className="px-2 md:px-3">
      <div className="mx-auto max-w-[1440px]">
        <Banner />
        <TopStudyPartners />
      </div>
    </div>
  );
}

export default Home;
