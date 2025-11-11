function Logo({ onClick = () => {}, hideText = false }) {
  return (
    <div className="relative flex w-fit items-center">
      <div className="size-10 shrink-0">
        <img
          draggable="false"
          className="size-full"
          src="/study-logo.png"
          alt=""
        />
      </div>
      {!hideText && (
        <span className="font-medium max-sm:text-sm md:text-lg">StudyMate</span>
      )}

      <button className="absolute inset-0 z-1" onClick={onClick}></button>
    </div>
  );
}

export default Logo;
