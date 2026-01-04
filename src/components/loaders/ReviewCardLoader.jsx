export default function ReviewCardLoader({ length = 4 }) {
  const fields = Array.from({ length }).map(
    () => `random${Math.random() * 1000}`,
  );

  return (
    <div className="my-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
      {fields.map((n) => (
        <div key={n} className="space-y-4 rounded-lg bg-(--white) shadow-xs p-3">
          <div className="flex items-center gap-2">
            <div className="size-8 animate-pulse rounded-full bg-(--loader-bg)"></div>
            <div className="h-4 w-[50%] animate-pulse rounded-md bg-(--loader-bg)"></div>
          </div>
          <div className="space-y-1">
            <div className="h-4 animate-pulse rounded-md bg-(--loader-bg)"></div>
            <div className="h-4 animate-pulse rounded-md bg-(--loader-bg)"></div>
            <div className="h-4 w-[30%] animate-pulse rounded-md bg-(--loader-bg)"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
