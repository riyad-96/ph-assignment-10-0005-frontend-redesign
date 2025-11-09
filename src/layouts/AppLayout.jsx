import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/Footer';
import { useEffect } from 'react';

function AppLayout() {
  useEffect(() => {
    function scrollObserver() {
      requestAnimationFrame(() => {
        document
          .querySelector('.header')
          .classList.toggle('scroll-trigger', window.scrollY > 10);
      });
    }

    window.addEventListener('scroll', scrollObserver);
    return () => window.removeEventListener('scroll', scrollObserver);
  }, []);

  return (
    <div className="screen-height grid grid-rows-[1fr_auto]">
      <Header />
      <div className="mt-[50px] min-h-[95vh] pt-8 md:mt-[65px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
