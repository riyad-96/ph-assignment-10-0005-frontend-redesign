import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EachStudyPartnerCard({ p, studymode = false }) {
  const {
    _id,
    name,
    profileImage,
    subject,
    rating,
    experienceLevel,
    studyMode,
  } = p;

  return (
    <div className="group relative p-4 lg:pointer-fine:p-6">
      <div className="shadow-xs absolute inset-0 z-1 rounded-xl border border-transparent bg-(--white) p-4 transition-[color,background-color,border-color,opacity,scale] duration-[150ms,150ms,150ms,300ms,300ms] dark:border-zinc-800 pointer-fine:scale-70 pointer-fine:opacity-0 pointer-fine:group-hover:scale-100 pointer-fine:group-hover:opacity-100"></div>

      <div className="relative z-3">
        <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
          <img
            draggable="false"
            className="size-full object-cover object-center"
            src={profileImage}
            alt={`${name}'s profile photo`}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-lg bg-white/80 px-3 py-1 text-sm backdrop-blur-sm transition-colors duration-150 dark:bg-gray-900/80">
            <span className="font-medium">{name}</span>
          </span>
        </div>

        {/* Details */}
        <div className="mb-4 space-y-2 text-sm">
          <p className="text-gray-600 transition-colors duration-150 dark:text-gray-400">
            Subject:{' '}
            <span className="font-medium text-gray-900 transition-colors duration-150 dark:text-white">
              {subject}
            </span>
          </p>
          {studymode && (
            <p className="text-gray-600 transition-colors duration-150 dark:text-gray-400">
              Study mode:{' '}
              <span className="font-medium text-gray-900 transition-colors duration-150 dark:text-white">
                {studyMode}
              </span>
            </p>
          )}
          <p className="text-gray-600 transition-colors duration-150 dark:text-gray-400">
            Experience:{' '}
            <span className="font-medium text-gray-900 transition-colors duration-150 dark:text-white">
              {experienceLevel}
            </span>
          </p>
          <div className="flex items-center gap-1.5">
            <p className="text-gray-600 transition-colors duration-150 dark:text-gray-400">
              Rating:{' '}
              <span className="font-medium text-gray-900 transition-colors duration-150 dark:text-white">
                {rating}
              </span>
            </p>
            <Star size="16" fill="currentColor" className="text-yellow-500" />
          </div>
        </div>

        {/* Button */}
        <Link
          to={`/partner/${_id}`}
          className="block w-full rounded-lg bg-linear-to-br from-indigo-600 to-purple-600 py-2.5 text-center text-sm font-medium tracking-wide text-white transition-all duration-150 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
