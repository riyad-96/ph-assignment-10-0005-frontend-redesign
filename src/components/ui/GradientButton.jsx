export default function GradientButton({
  content = 'Button',
  disabled = false,
  isLoading = false,
  type = 'button',
  className = '',
  onClick = () => {},
}) {
  return (
    <button
      onClick={onClick}
      className={`flex h-10 items-center justify-center rounded-lg bg-linear-to-br from-indigo-600 to-purple-600 tracking-wide text-white shadow-lg transition-all duration-150 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl disabled:opacity-50 dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600 ${className}`}
      type={type}
      disabled={disabled}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        <span>{content}</span>
      )}
    </button>
  );
}
