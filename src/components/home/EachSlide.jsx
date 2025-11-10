import { useNavigate } from "react-router-dom";

function EachSlide({ s }) {
  const { thumbnail, tag_line, description, cta_text } = s;
  const navigate = useNavigate();

  return (
    <div className="grid aspect-video pb-6 max-md:aspect-5/4">
      <div className="grid rounded-lg p-2 pointer-fine:hover:bg-zinc-500/10">
        <div className="relative overflow-hidden rounded-lg shadow">
          <div className="absolute inset-0 z-1">
            <img
              className="size-full object-cover object-center"
              src={thumbnail}
              alt={tag_line}
              loading="eager"
            />
          </div>

          <div className="relative z-2 grid size-full grid-rows-[1fr_0fr] transition-[grid-template-rows] duration-200 pointer-fine:grid-rows-[1fr_0fr] pointer-fine:hover:grid-rows-[2fr_1fr]">
            <div className="flex flex-col items-center justify-center gap-1 bg-black/40">
              <h4 className="text-center text-lg font-medium tracking-wide text-white max-sm:text-sm md:text-2xl lg:text-4xl">
                {tag_line}
              </h4>
              <button 
              onClick={() => navigate('/find-partners')}
               className="rounded-md bg-white/70 px-2 py-1 text-sm hover:bg-white/90 max-sm:text-xs">
                {cta_text}
              </button>
            </div>
            <div className="flex items-center justify-center overflow-hidden bg-black/40 px-2 text-white backdrop-blur-xs sm:backdrop-blur-sm">
              <p className="text-center text-lg leading-6 font-light tracking-wide max-sm:text-xs max-sm:leading-3.5 md:text-xl">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EachSlide;
