function AppLoader() {
  return (
    <div className="screen-height grid place-items-center bg-(--main-bg)">
      <span className="dark:text-zinc-200 loading loading-infinity loading-xl opacity-80 scale-120 md:scale-150"></span>
    </div>
  );
}

export default AppLoader;
