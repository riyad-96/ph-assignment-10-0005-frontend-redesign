function PartnerProfileLoader() {
  const fiveFields = Array.from({ length: 5 }).map(
    (u) => `random${Math.random() * 1000}`,
  );
  return (
    <div className="mt-6 gap-2 max-sm:grid sm:flex">
      <div className="flex-1 space-y-2">
        {fiveFields.map((n) => (
          <div key={n} className="grid gap-2">
            <span className="inline-block h-5 w-[120px] animate-pulse rounded-md bg-(--loader-bg)"></span>
            <span className="block h-9 animate-pulse rounded-md bg-(--loader-bg)"></span>
          </div>
        ))}
      </div>
      <div className="flex-1 space-y-2">
        {fiveFields.map((n) => (
          <div key={n} className="grid gap-2">
            <span className="inline-block h-5 w-[120px] animate-pulse rounded-md bg-(--loader-bg)"></span>
            <span className="block h-9 animate-pulse rounded-md bg-(--loader-bg)"></span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PartnerProfileLoader;
