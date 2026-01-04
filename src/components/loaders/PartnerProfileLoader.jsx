function PartnerProfileLoader() {
  const fiveFields = Array.from({ length: 5 }).map(
    () => `random${Math.random() * 1000}`,
  );
  return (
    <div className="mt-6 gap-2 max-sm:grid sm:flex">
      <div className="flex-1 space-y-2.5">
        {fiveFields.map((n) => (
          <div key={n} className="grid gap-2">
            <span className="inline-block h-5 w-30 animate-pulse rounded-md bg-(--loader-bg)"></span>
            <span className="block h-10.5 animate-pulse rounded-md bg-(--loader-bg)"></span>
          </div>
        ))}
      </div>
      <div className="flex-1 space-y-2.5">
        {fiveFields.map((n) => (
          <div key={n} className="grid gap-2">
            <span className="inline-block h-5 w-30 animate-pulse rounded-md bg-(--loader-bg)"></span>
            <span className="block h-10.5 animate-pulse rounded-md bg-(--loader-bg)"></span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PartnerProfileLoader;
