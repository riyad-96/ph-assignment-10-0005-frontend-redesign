import BannerSection from '../components/home/sections/BannerSection';
import TopStudyPartnersSection from '../components/home/sections/TopStudyPartnersSection';
import HowItWorksSection from '../components/home/sections/HowItWorksSection';
import ReviewsSection from '../components/home/sections/ReviewsSection';
import { Helmet } from 'react-helmet';
import StatsSection from '../components/home/sections/StatsSection';
import BenefitOfGroupStudySection from '../components/home/sections/BenefitOfGroupStudySection';
import BlogPreviewSection from '../components/home/sections/BlogPreviewSection';
import FAQSection from '../components/home/sections/FAQSection';
import NewsletterSection from '../components/home/sections/NewsletterSection';
import FeaturesSection from '../components/home/sections/FeaturesSection';

function Home() {
  return (
    <div className="px-2 md:px-3">
      <Helmet title="Home • StudyMate" />

      <div className="mx-auto max-w-360 space-y-30">
        <BannerSection />
        <StatsSection />
        <FeaturesSection />
        <TopStudyPartnersSection />
        <HowItWorksSection />
        <BenefitOfGroupStudySection />
        <ReviewsSection />
        <BlogPreviewSection />
        <FAQSection />
        <NewsletterSection />
      </div>
    </div>
  );
}

export default Home;
