export default function FetchError({ content = '', onClick = () => {} }) {
  return (
    <div className="grid min-h-62.5 place-items-center md:min-h-87.5">
      <div className="space-y-4">
        <p>{content ? content : 'Something went wrong'}</p>
        <button
          className="mx-auto block w-fit rounded-full bg-(--accent-color) px-3 py-1.5 text-sm"
          onClick={onClick}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
