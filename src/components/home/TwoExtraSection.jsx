import React from 'react';
import { useGlobalContext } from '../../contexts/GlobalContext';

const reviews = [
  'Found an amazing study buddy within minutes! Makes learning so much more fun.',
  'The partner matching is spot on — finally someone who studies the same subjects as me.',
  'I actually stay consistent now because my study partner keeps me accountable. Love it!',
  'Clean interface, easy to use, and super helpful during exam season.',
];

function TwoExtraSection() {
  const { allPartners } = useGlobalContext();
  const randomized = allPartners
    .map((p) => ({ p, random: Math.random() }))
    .sort((a, b) => a.random - b.random)
    .map((obj) => obj.p)
    .slice(0, 4);

  return (
    <>
      <div className="">
        <h2 className="mt-8 pl-1 text-lg font-medium md:text-2xl">
          How the Study Partner Works!
        </h2>

        <ol className="my-4 list-inside list-[number] space-y-3 pl-2">
          <li className="leading-5">
            <span className="font-medium">Create Your Profile</span> —{' '}
            <span className="font-light tracking-wide">
              Sign up and share your learning interests, subjects, and goals.
            </span>
          </li>
          <li className="leading-5">
            <span className="font-medium">Find a Match</span> —{' '}
            <span className="font-light tracking-wide">
              Browse or search for students with similar study interests or
              skill levels.
            </span>
          </li>
          <li className="leading-5">
            <span className="font-medium">Send a Request</span> —{' '}
            <span className="font-light tracking-wide">
              Request to connect with a potential study partner or group.
            </span>
          </li>
          <li className="leading-5">
            <span className="font-medium">Start Studying Together</span> —{' '}
            <span className="font-light tracking-wide">
              Once matched, you can chat, share resources, and plan study
              sessions.
            </span>
          </li>
        </ol>
      </div>

      <div className="">
        <h2 className="mt-10 pl-1 text-lg font-medium md:text-2xl">Reviews</h2>

        <div className="my-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {randomized.map((p, i) => (
            <div
              key={`p${i}`}
              className="space-y-3 rounded-lg bg-white px-4 py-3 shadow"
            >
              <div className="flex items-center gap-2">
                <div className="size-8 overflow-hidden rounded-full md:size-10">
                  <img
                    draggable="false"
                    className="size-full object-cover object-center"
                    src={p.profileImage}
                    alt={p.name}
                  />
                </div>
                <h5 className="font-medium">{p.name}</h5>
              </div>
              <p className="leading-5 tracking-wide opacity-80 max-sm:text-sm">
                "{reviews[i]}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TwoExtraSection;
