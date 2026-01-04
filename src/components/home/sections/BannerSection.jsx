// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// other imports
import { useState } from 'react';
import EachSlide from '../EachSlide';

const carouselData = [
  {
    thumbnail:
      'https://img.freepik.com/free-photo/brainstorm-meeting_1098-15871.jpg?t=st=1762720033~exp=1762723633~hmac=4dcf66d0b6b7bca7732847fe3b60fbc275115e4af91619a1ff20a78a98e609b0&w=1920',
    tag_line: 'Find Your Perfect Study Match',
    description:
      'Connect with learners who share your goals. Study smarter, not harder — together.',
    cta_text: 'Find a Partner',
  },
  {
    thumbnail:
      'https://img.freepik.com/free-photo/confident-young-salesman-waving-colleague-video-call-computer-desk_662251-944.jpg?t=st=1762720264~exp=1762723864~hmac=6a494713e812a0c1bd746f49ef860c49388b10595e92310ed9b926a0c0202748&w=1920',
    tag_line: 'Learn. Share. Grow.',
    description:
      'Exchange ideas, share notes, and stay motivated with your study buddy.',
    cta_text: 'Start Learning',
  },
  {
    thumbnail:
      'https://img.freepik.com/free-photo/calendar-planner-agenda-schedule-concept_53876-176748.jpg?t=st=1762720334~exp=1762723934~hmac=6f2535d079e4b1dab3f46787604d80f4212f701e4e9678bf26ea0ba05b7b8c07&w=1920',
    tag_line: 'Stay Consistent with Study Sessions',
    description:
      'Schedule sessions, track progress, and make learning a habit that sticks.',
    cta_text: 'Join Now',
  },
  {
    thumbnail:
      'https://img.freepik.com/free-photo/friends-walking-together-medium-shot_23-2149183684.jpg?t=st=1762725244~exp=1762728844~hmac=fdb77dcaa94c76896d50e1f4b896504539a425f42d784a55964b92118ba69227&w=1920',
    tag_line: 'Connect Beyond Borders',
    description:
      'Meet StudyMates from around the world. Learn new perspectives and grow together.',
    cta_text: 'Explore Now',
  },
  {
    thumbnail:
      'https://img.freepik.com/free-photo/colleagues-using-laptops-notebooks-learning-study-session_23-2149285389.jpg?t=st=1762720605~exp=1762724205~hmac=87bee2007641aede305c554b8a3bb189764d0d3b16a67f15c4d830fdb4ed5edb&w=1920',
    tag_line: 'Group Up for Greater Goals',
    description:
      'Create or join study groups for any subject. Collaboration turns effort into success.',
    cta_text: 'Start a Group',
  },
];

export default function BannerSection() {
  const [slides, setSlides] = useState(() => {
    return carouselData
      .map((s) => ({ random: Math.random(), obj: s }))
      .sort((a, b) => a.random - b.random)
      .map((sObj) => sObj.obj);
  });

  return (
    <div>
      <div className="space-y-2 px-4 pt-4 pb-12 text-center">
        <h1 className="text-lg font-medium sm:text-xl md:text-2xl md:font-semibold xl:text-4xl">
          No need to study alone anymore!
        </h1>
        <p className="opacity-80">
          Meet study buddies who make learning easier — and a lot more fun.
        </p>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1.4}
        centeredSlides={false}
        autoplay={{
          delay: 4000,
          pauseOnMouseEnter: true,
        }}
        speed={800}
        loop
        className="w-[clamp(19.625rem,-1.625rem+100vw,46.3125rem)] select-none [--swiper-pagination-color:#0baeee] md:w-[clamp(45.875rem,-2.125rem+100vw,87.875rem)]"
      >
        {slides.map((s, i) => {
          return (
            <SwiperSlide key={i}>
              <EachSlide s={s} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
