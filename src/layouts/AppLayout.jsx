import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/Footer';
import { useLayoutEffect } from 'react';

function AppLayout() {
  useLayoutEffect(() => {
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
    <div className="grid min-h-screen grid-rows-[1fr_auto]">
      <Header />
      <div className="mt-[50px] py-8 md:mt-[65px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
