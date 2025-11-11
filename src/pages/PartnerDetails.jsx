import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { Star } from 'lucide-react';
import { toast } from 'kitzo/react';
import PartnerDetailsLoader from '../components/loaders/PartnerDetailsLoader';

function PartnerDetails() {
  const { id } = useParams();
  const server = useAxios();

  const [partnerLoading, setPartnerLoading] = useState(true);
  const [partner, setPartner] = useState(null);
  const [isPartner, setIsPartner] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await server.get('base-partner/all');
        setPartner([...response.data].find((p) => p._id === id));
        const exists = await server.post('partner-request/check-request', {
          partnerId: id,
        });
        if (exists.data.message === 'request-already-exists') {
          setIsPartner(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setPartnerLoading(false);
      }
    })();
  }, []);

  async function sendPartnerRequest(toId) {
    try {
      const res = await server.post('partner-request/send-request', { toId });
      setPartner((prev) => ({ ...prev, partnerCount: prev.partnerCount + 1 }));
      setIsPartner(true);
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  function triggerParnterRequest(toId) {
    toast.promise(sendPartnerRequest(toId), {
      loading: 'Sending request',
      success: 'Partner request sent',
      error: 'Request already exists',
    });
  }

  return (
    <div className="px-2 md:px-3">
      <div className="mx-auto max-w-[1440px]">
        {partnerLoading ? (
          <PartnerDetailsLoader />
        ) : (
          <div className="space-y-3">
            <h1 className="py-4 text-xl font-medium tracking-wide opacity-90 max-md:text-center sm:text-xl md:text-2xl md:font-semibold xl:text-4xl">
              {partner.name}
            </h1>

            <div className="grid gap-8 md:flex md:items-center">
              <div className="aspect-square max-h-[450px] flex-1 overflow-hidden rounded-2xl shadow-md max-md:mx-auto md:rounded-4xl">
                <img
                  className="size-full object-cover object-top"
                  src={partner.profileImage}
                  alt={`${partner.name} profile image`}
                />
              </div>

              <div className="mx-auto flex-1 space-y-2 max-md:w-fit">
                <div className="flex items-center gap-2 text-xl font-medium md:text-2xl">
                  <span>Ratings:</span>
                  <span className="flex gap-1">
                    {Array.from({ length: partner.rating }).map((_, i) => (
                      <span key={`star${i}`} className="grid text-yellow-500">
                        <Star fill="currentColor" />
                      </span>
                    ))}
                  </span>
                  <span>({partner.rating})</span>
                </div>

                <div className="text-xl font-medium md:text-2xl">
                  <span>
                    Subject:{' '}
                    <span className="rounded-md bg-(--white) px-2 py-0.5 font-normal shadow">
                      {partner.subject}
                    </span>
                  </span>
                </div>

                <div className="text-xl font-medium md:text-2xl">
                  <span>
                    Study mode:{' '}
                    <span className="inline-flex items-center gap-2 rounded-md bg-(--white) px-2 font-normal shadow">
                      <span>{partner.studyMode}</span>
                      <span
                        className={`inline-block size-2 rounded-full md:size-3 ${partner.studyMode === 'Online' ? 'bg-emerald-300' : 'bg-zinc-400'}`}
                      ></span>
                    </span>
                  </span>
                </div>

                <div className="text-xl font-medium md:text-2xl">
                  <span>
                    Availability time:{' '}
                    <span className="rounded-md bg-(--white) px-2 py-0.5 font-normal shadow">
                      {partner.availabilityTime}
                    </span>
                  </span>
                </div>
                <div className="text-xl font-medium md:text-2xl">
                  <span>
                    Location:{' '}
                    <span className="rounded-md bg-(--white) px-2 py-0.5 font-normal shadow">
                      {partner.location}
                    </span>
                  </span>
                </div>
                <div className="text-xl font-medium md:text-2xl">
                  <span>
                    Experience:{' '}
                    <span className="rounded-md bg-(--white) px-2 py-0.5 font-normal shadow">
                      {partner.experienceLevel}
                    </span>
                  </span>
                </div>
                <div className="text-xl font-medium md:text-2xl">
                  <span>
                    Partners:{' '}
                    <span className="rounded-md bg-(--white) px-2 py-0.5 font-normal shadow">
                      {partner.partnerCount}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-16 w-[260px] max-md:w-[230px]">
              {isPartner ? (
                <span className="flex w-full justify-center rounded-lg bg-(--accent-color)/20 py-2 font-medium duration-150 select-none md:py-2.5 md:text-lg">
                  Partner request sent
                </span>
              ) : (
                <button
                  onClick={() => triggerParnterRequest(id)}
                  className="flex w-full justify-center rounded-lg bg-(--accent-color) py-2 font-medium shadow transition-shadow duration-150 md:py-2.5 md:text-lg pointer-fine:hover:shadow-transparent"
                >
                  Send partner request
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PartnerDetails;
