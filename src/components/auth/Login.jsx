import { useRef, useState } from 'react';
import { EyeOff, EyeOpened, GoogleIcon } from '../Svgs';
import { Link } from 'react-router-dom';
import { toast } from 'kitzo';

import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, GoogleProvider } from '../../configs/firebase';

import { motion, AnimatePresence } from 'motion/react';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { Helmet } from 'react-helmet';

function Login() {
  const { setInteractionDisabled } = useGlobalContext();

  const guest = {
    email: 'guestaccount@gmail.com',
    password: 'guest@Secured.00',
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailErr, setEmailErr] = useState(null);
  const [passErr, setPassErr] = useState(null);

  const [passShowing, setPassShowing] = useState(false);
  const [loggingIn, setLogginIn] = useState(false);
  const passInput = useRef();

  function isAbleToLogin() {
    let ableToLogin = true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    function checkEmail() {
      if (!email) {
        setEmailErr('Email is required');
        ableToLogin = false;
        return;
      } else if (!emailRegex.test(email)) {
        setEmailErr('Insert a valid email');
        ableToLogin = false;
        return;
      } else {
        setEmailErr('');
      }
    }
    checkEmail();

    const minPassLength = 6;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);

    function checkPass() {
      if (!password) {
        setPassErr('Password is required');
        ableToLogin = false;
        return;
      } else if (password.length < minPassLength) {
        setPassErr(`Password must be minimum ${minPassLength} chars.`);
        ableToLogin = false;
        return;
      } else if (!hasUpper) {
        setPassErr(`At least 1 uppercase character required`);
        ableToLogin = false;
        return;
      } else if (!hasLower) {
        setPassErr(`At least 1 lowercase character required`);
        ableToLogin = false;
        return;
      } else {
        setPassErr('');
      }
    }
    checkPass();
    return ableToLogin;
  }

  async function sendLoginRequest() {
    const ableToLogin = isAbleToLogin();
    if (!ableToLogin) return;

    setLogginIn(true);
    toast.promise(
      signInWithEmailAndPassword(auth, email, password),
      {
        loading: 'Logging in...',
        success: () => {
          setLogginIn(false);
          return 'Welcome back';
        },
        error: (err) => {
          setLogginIn(false);
          if (err.code === 'auth/network-request-failed')
            return 'Network error';
          if (err.code === 'auth/invalid-credential')
            return 'Invalid credential';
          return 'Login failed';
        },
      },
      { duration: 3500, style: { color: 'black' } },
    );
  }

  async function loginWithGoogle() {
    setInteractionDisabled(true);
    try {
      await signInWithPopup(auth, GoogleProvider);
      toast.success('Welcome, Login was successful.', {
        duration: 3000,
        style: { color: 'black' },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setInteractionDisabled(false);
    }
  }

  return (
    <div>
      <Helmet title="Login • StudyMate" />

      <h2 className="my-8 text-center text-2xl font-medium opacity-80">
        Welcome back
      </h2>
      <div className="space-y-3">
        <div className="grid">
          <label className="w-fit pb-2 pl-1 leading-4" htmlFor="email">
            Email
          </label>
          <input
            onChange={(e) => {
              setEmailErr(null);
              setEmail(e.target.value);
            }}
            value={email}
            className="w-full min-w-0 rounded-full border border-zinc-200 bg-(--input-bg) px-4 py-2 tracking-wide transition-colors duration-150 outline-none placeholder:text-zinc-400 focus:border-zinc-500 dark:border-zinc-700"
            id="email"
            type="email"
            placeholder="Enter your email"
            required
          />
          <span
            className={`overflow-hidden pl-1 text-sm text-red-500 transition-[height] duration-150 ${emailErr ? 'h-5' : 'h-0'}`}
          >
            {emailErr}
          </span>
        </div>

        <div className="grid">
          <label className="w-fit pb-2 pl-1 leading-4" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <AnimatePresence>
              {password && (
                <motion.button
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  onClick={() => {
                    setPassShowing((prev) => !prev);
                    passInput.current.focus();
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  transition={{
                    opacity: {
                      duration: 0.1,
                    },
                    scale: {
                      duration: 0.2,
                      type: 'spring',
                      stiffness: 900,
                      damping: 25,
                    },
                  }}
                  className="absolute top-1/2 right-2 z-2 grid size-10 -translate-y-1/2 place-items-center rounded-full text-zinc-600 dark:text-zinc-400"
                >
                  {passShowing ? <EyeOff size="20" /> : <EyeOpened size="20" />}
                </motion.button>
              )}
            </AnimatePresence>
            <input
              ref={passInput}
              onChange={(e) => {
                setPassErr(null);
                setPassword(e.target.value);
              }}
              value={password}
              className="w-full min-w-0 rounded-full border border-zinc-200 bg-(--input-bg) px-4 py-2 tracking-wide transition-colors duration-150 outline-none placeholder:text-zinc-400 focus:border-zinc-500 dark:border-zinc-700"
              id="password"
              type={passShowing ? 'text' : 'password'}
              placeholder="Enter your password"
              required
            />
          </div>
          <span
            className={`overflow-hidden pl-1 text-sm text-red-500 transition-[height] duration-150 ${passErr ? 'h-5' : 'h-0'}`}
          >
            {passErr}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              if (loggingIn) return;
              sendLoginRequest();
            }}
            className="grid h-11.25 flex-1 place-items-center rounded-full bg-zinc-800 tracking-wide text-white dark:bg-zinc-200 dark:text-black"
          >
            {loggingIn ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <span>Login</span>
            )}
          </button>

          <button
            onClick={() => {
              if (loggingIn) return;
              if (guest.email === email && guest.password === password) return;
              setEmail(guest.email);
              setPassword(guest.password);
            }}
            className="grid h-11.25 place-items-center rounded-full bg-zinc-800 px-6 tracking-wide text-white dark:bg-zinc-200 dark:text-black"
          >
            <span>Guest</span>
          </button>
        </div>
      </div>

      <div className="my-2 text-center text-sm">or</div>

      <div>
        <button
          onClick={loginWithGoogle}
          className="flex h-11.25 w-full items-center justify-center gap-2 rounded-full bg-zinc-800 tracking-wide text-white dark:bg-zinc-200 dark:text-black"
        >
          <span>
            <GoogleIcon size="20" />
          </span>
          <span>Continue with Google</span>
        </button>
      </div>

      <div className="mt-4 flex justify-center text-sm">
        <span className="flex items-center gap-2">
          <span>Don't have an account?</span>
          <Link
            className="text-blue-500 underline dark:text-blue-400"
            to="/auth/register"
            children="Register"
            replace
          />
        </span>
      </div>
    </div>
  );
}

export default Login;
