function StudyParternerCardLoader() {
  return (
    <div className="p-3 md:p-4">
      <div className="space-y-2">
        <div className="aspect-video animate-pulse rounded-lg bg-(--loader-bg)"></div>
        <div className="h-4 w-[135px] animate-pulse rounded-lg bg-(--loader-bg) md:h-6"></div>
        <div className="h-4 w-[155px] animate-pulse rounded-lg bg-(--loader-bg) md:h-6"></div>
        <div className="h-4 w-[120px] animate-pulse rounded-lg bg-(--loader-bg) md:h-6"></div>
      </div>
      <div className="mt-2 h-8 w-full animate-pulse rounded-lg bg-(--loader-bg)"></div>
    </div>
  );
}

export default StudyParternerCardLoader;
