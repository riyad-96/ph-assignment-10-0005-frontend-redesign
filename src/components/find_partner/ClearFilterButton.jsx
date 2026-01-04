import { X } from 'lucide-react';

export default function ClearFilterButton({ onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`grid origin-center place-items-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition-colors duration-150 hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-red-700 dark:hover:bg-red-950 dark:hover:text-red-400 ${className}`}
    >
      <span className="grid">
        <X size="16" />
      </span>
    </button>
  );
}
