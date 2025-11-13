import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/Footer';
import { useLayoutEffect, useRef } from 'react';

function AppLayout() {
  const lastScroll = useRef(0);
  useLayoutEffect(() => {
    function scrollObserver() {
      requestAnimationFrame(() => {
        const header = document.querySelector('.header');

        const currentScroll = window.scrollY;
        const delta = currentScroll - lastScroll.current;
        header.classList.toggle('scroll-trigger', delta > 0);

        lastScroll.current = currentScroll;
      });
    }

    window.addEventListener('scroll', scrollObserver);
    return () => window.removeEventListener('scroll', scrollObserver);
  }, []);

  return (
    <div className="scroll-top grid min-h-screen grid-rows-[1fr_auto]">
      <Header />
      <div className="mt-[50px] py-8 md:mt-[65px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
