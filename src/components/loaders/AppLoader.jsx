function AppLoader() {
  return (
    <div className="screen-height grid cursor-wait place-items-center bg-(--main-bg)">
      <span className="loading loading-infinity loading-xl scale-120 opacity-80 md:scale-150 dark:text-zinc-200"></span>
    </div>
  );
}

export default AppLoader;
