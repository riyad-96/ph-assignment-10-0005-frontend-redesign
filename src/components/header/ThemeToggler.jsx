import { Moon, SunDim } from 'lucide-react';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { AnimatePresence, motion } from 'motion/react';

function ThemeToggler() {
  const { isDark, setIsDark } = useGlobalContext();
  return (
    <button
      onClick={() => setIsDark((prev) => !prev)}
      className="relative h-5 w-10 rounded-full bg-black/5 ring-1 ring-(--accent-color) transition-[background-color,box-shadow] duration-150 pointer-fine:hover:ring-cyan-500/30"
    >
      <span
        className={`absolute top-0 left-0 grid h-full w-1/2 place-items-center overflow-hidden rounded-full bg-white transition-[background-color,translate] duration-[150ms,300ms] dark:bg-white/10 ${isDark ? 'translate-x-1/1' : 'translate-x-0'}`}
      >
        <AnimatePresence>
          {isDark && (
            <motion.span
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
              }}
              transition={{
                duration: 0.2,
                delay: 0.1,
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
                scale: 0,
              }}
              animate={{
                scale: 1,
              }}
              transition={{
                duration: 0.2,
                delay: 0.1,
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
