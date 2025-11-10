import { Star } from 'lucide-react';

function EachTopStudyPartnerCard({ p }) {
  const { _id, id, name, profileimage, subject, rating, experienceLevel } = p;

  return (
    <div className="group relative rounded-lg p-4">
      <span className="absolute inset-0 z-2 scale-70 rounded-xl bg-white opacity-0 shadow transition-[scale,opacity] duration-300 group-hover:scale-100 group-hover:opacity-100"></span>
      <div className="relative z-3 space-y-2">
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <img
            className="size-full object-cover object-center"
            src={profileimage}
            alt={`${name}'s profile photo`}
          />
          <span className="absolute bottom-0 left-0 rounded-tr-md bg-white/70 px-2 backdrop-blur-sm max-md:text-sm md:px-3 md:py-0.5">
            Name: <span className="font-medium">{name}</span>
          </span>
        </div>
        <div className="max-sm:text-sm">
          <p>
            Subject: <span className="font-medium">{subject}</span>
          </p>
          <p>
            Exp: <span className="font-medium">{experienceLevel}</span>
          </p>
          <p className="flex items-center gap-1">
            <span>
              Rating:
              <span className="font-medium">{rating}</span>
            </span>
            <span className="text-yellow-500">
              <Star size="18" fill="currentColor" />
            </span>
          </p>
        </div>
        <div>
          <button className="w-full rounded-lg bg-(--nav-link-hover-bg) py-1.5 text-sm font-medium tracking-wide">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default EachTopStudyPartnerCard;
