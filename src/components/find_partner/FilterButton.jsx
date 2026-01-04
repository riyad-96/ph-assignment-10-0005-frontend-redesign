export default function FilterButton({
  onClick = () => {},
  content,
  isSelected = false,
  className,
}) {
  return (
    <button
      onClick={onClick}
      className={`grid origin-center place-items-center rounded-lg border tracking-wide transition-colors duration-150 ${className} ${
        isSelected
          ? 'border-indigo-600 bg-indigo-600 text-white dark:border-indigo-500 dark:bg-indigo-500 '
          : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
      }`}
    >
      {content}
    </button>
  );
}
