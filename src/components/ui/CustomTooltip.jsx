import { Tooltip } from 'kitzo';
import { useGlobalContext } from '../../contexts/GlobalContext';

export default function CustomTooltip({ content, children }) {
  const { isDark } = useGlobalContext();

  return (
    <Tooltip
      content={
        <div
          className={`rounded-md px-2 py-1 text-xs font-light tracking-wide text-nowrap ${isDark ? 'bg-neutral-200 text-black' : 'bg-neutral-800 text-white'}`}
        >
          {content}
        </div>
      }
    >
      {children}
    </Tooltip>
  );
}
