import { Moon, SunDim } from 'lucide-react';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { AnimatePresence, motion } from 'motion/react';

function ThemeToggler() {
  const { isDark, setIsDark } = useGlobalContext();
  return (
    <button
      onClick={() => setIsDark((prev) => !prev)}
      className="relative h-5 w-10 rounded-full bg-(--main-bg)/50 inset-shadow-xs outline-2 outline-(--accent-color) transition-colors duration-150"
    >
      <span
        className={`absolute top-0 left-0 grid h-full w-1/2 place-items-center overflow-hidden rounded-full bg-(--white) shadow-xs transition-[color,background-color,translate] duration-[150ms,150ms,300ms] ${isDark ? 'translate-x-1/1' : 'translate-x-0'}`}
      >
        <AnimatePresence>
          {isDark && (
            <motion.span
              initial={{
                y: -20,
              }}
              animate={{
                y: 0,
              }}
              transition={{
                y: {
                  duration: 0.3,
                },
              }}
              className="absolute grid opacity-70"
            >
              <Moon size="12" />
            </motion.span>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!isDark && (
            <motion.span
              initial={{
                y: -20,
              }}
              animate={{
                y: 0,
              }}
              transition={{
                y: {
                  duration: 0.3,
                },
              }}
              className="absolute grid opacity-70"
            >
              <SunDim size="14" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
}

export default ThemeToggler;
