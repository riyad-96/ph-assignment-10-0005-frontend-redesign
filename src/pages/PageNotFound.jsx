import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/header/Logo';

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="screen-height text-(--main-text-clr) not-found-bg relative flex items-center bg-(--main-bg)">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 flex h-[50px] w-40 items-center justify-center gap-2 rounded-r-full bg-(--accent-color) pr-4 text-lg font-medium"
      >
        <span>
          <ArrowLeft size="26" />
        </span>
        <span>Go back</span>
      </button>
      <div className="mx-auto my-auto grid h-fit w-fit justify-items-center text-center">
        <h1 className="px-4 text-4xl opacity-90">
          Sorry! this page isn't available
        </h1>
        <p className="mt-4 mb-2 opacity-80">
          The page you were looking for couldn't be found
        </p>
        <Logo onClick={() => navigate('/')} />
      </div>
    </div>
  );
}

export default PageNotFound;
