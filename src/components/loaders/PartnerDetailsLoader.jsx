function PartnerDetailsLoader() {
  return (
    <div className="pb-24">
      <div className="my-4 h-8 w-[200px] animate-pulse rounded-lg bg-(--loader-bg) max-md:mx-auto md:h-10 md:w-[300px]"></div>
      <div className="grid gap-8 md:flex md:items-center">
        <div className="aspect-square h-[450px] flex-1 animate-pulse overflow-hidden rounded-2xl bg-(--loader-bg) max-md:mx-auto md:rounded-4xl"></div>
        <div className="mx-auto flex-1 space-y-2 max-md:w-fit">
          <div className="h-[30px] max-w-[230px] animate-pulse rounded-lg bg-(--loader-bg) max-md:w-[230px] md:h-[40px]"></div>
          <div className="h-[30px] max-w-[210px] animate-pulse rounded-lg bg-(--loader-bg) max-md:w-[210px] md:h-[40px]"></div>
          <div className="h-[30px] max-w-[240px] animate-pulse rounded-lg bg-(--loader-bg) max-md:w-[240px] md:h-[40px]"></div>
          <div className="h-[30px] max-w-[390px] animate-pulse rounded-lg bg-(--loader-bg) max-md:w-[330px] md:h-[40px]"></div>
          <div className="h-[30px] max-w-[260px] animate-pulse rounded-lg bg-(--loader-bg) max-md:w-[260px] md:h-[40px]"></div>
          <div className="h-[30px] max-w-[220px] animate-pulse rounded-lg bg-(--loader-bg) max-md:w-[220px] md:h-[40px]"></div>
          <div className="h-[30px] max-w-[170px] animate-pulse rounded-lg bg-(--loader-bg) max-md:w-[170px] md:h-[40px]"></div>
        </div>
      </div>
    </div>
  );
}

export default PartnerDetailsLoader;
