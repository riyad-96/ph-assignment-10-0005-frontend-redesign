function Logo({ onClick = () => {} }) {
  return (
    <div className="relative flex items-center w-fit">
      <div className="size-10 shrink-0">
        <img draggable="false" className="size-full" src="/study-logo.png" alt="" />
      </div>
      <span className="font-medium max-sm:text-sm md:text-lg">
        Study Partner
      </span>
      <button className="absolute inset-0 z-1" onClick={onClick}></button>
    </div>
  );
}

export default Logo;
