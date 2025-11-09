import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/Footer';

function AppLayout() {
  return (
    <div className="screen-height grid grid-rows-[1fr_auto] overflow-y-auto">
      <Header />
      <div className="mt-[50px] pt-8 md:mt-[65px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
