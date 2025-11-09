function Logo({ onClick }) {
  return (
    <div className="relative flex items-center">
      <div className="size-10">
        <img className="size-full" src="/study-logo.png" alt="" />
      </div>
      <span className="font-medium md:text-lg max-sm:text-sm">Study Partner</span>
      <button className="absolute inset-0 z-1" onClick={onClick}></button>
    </div>
  );
}

export default Logo;
