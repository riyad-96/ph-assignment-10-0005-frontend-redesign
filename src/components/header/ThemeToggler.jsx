import { Moon, SunDim } from 'lucide-react';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { AnimatePresence, motion } from 'motion/react';
import CustomTooltip from '../ui/CustomTooltip';

function ThemeToggler() {
  const { isDark, setIsDark } = useGlobalContext();
  return (
    <button
      onClick={() => setIsDark((prev) => !prev)}
      className="relative grid h-5 w-10 rounded-full bg-zinc-200 ring-1 ring-(--accent-color) transition-colors duration-150 dark:bg-zinc-800 pointer-fine:hover:ring-cyan-500/30"
    >
      <span
        className={`absolute top-0 left-0 grid h-full w-1/2 place-items-center overflow-hidden rounded-full transition-[background-color,translate] duration-[150ms,250ms] ${isDark ? 'translate-x-1/1 bg-zinc-700' : 'translate-x-0 bg-white'}`}
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
