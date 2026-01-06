import { Tooltip } from 'kitzo';
import { useGlobalContext } from '../../contexts/GlobalContext';

export default function CustomTooltip({
  content,
  children,
  tooltipOptions = {},
  isHidden = false,
}) {
  const { isDark } = useGlobalContext();

  return (
    <Tooltip
      tooltipOptions={tooltipOptions}
      isHidden={isHidden}
      content={
        <div
          className={`rounded-md px-2 py-1 text-xs font-light tracking-wide text-nowrap transition-[background-color] duration-150 ${isDark ? 'bg-neutral-200 text-black' : 'bg-neutral-800 text-white'}`}
        >
          {content}
        </div>
      }
    >
      {children}
    </Tooltip>
  );
}
