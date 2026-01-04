import { useState } from 'react';
import { useParams } from 'react-router-dom';
import serverAPI from '../utils/server';
import { Star, MapPin, Clock, Award, Users } from 'lucide-react';
import { toast } from 'kitzo';
import PartnerDetailsLoader from '../components/loaders/PartnerDetailsLoader';
import { useGlobalContext } from '../contexts/GlobalContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';

function PartnerDetails() {
  const { user, userProfile, setUserProfile } = useGlobalContext();
  const { id } = useParams();
  const server = serverAPI();
  const [sendingRequest, setSendingRequest] = useState(false);

  const queryClient = useQueryClient();
  const {
    data: details,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['partner-details', id],
    queryFn: async () => {
      const res = await server.get(
        `/partner-request/single-partner-profile/${id}`,
      );

      return {
        partner: res.data.partner,
        isPartner: res.data.isPartner,
      };
    },
  });

  async function sendPartnerRequest(toId) {
    try {
      const res = await server.post('partner-request/send-request', {
        toId,
        name: userProfile?.name || user.displayName,
        profileImage: userProfile?.profileImage || user.photoURL,
      });
      return res.data;
    } finally {
      setSendingRequest(false);
    }
  }

  function triggerParnterRequest() {
    setSendingRequest(true);
    toast.promise(
      sendPartnerRequest(id),
      {
        loading: 'Sending request',
        success: (data) => {
          let message = 'Request was sent';
          if (data.code && data.code === 'created') {
            message = 'Profile created and request was sent';
          }
          setUserProfile(data.userProfile);
          queryClient.setQueryData(['partner-details', id], {
            partner: {
              ...details.partner,
              partnerCount: details.partner.partnerCount + 1,
            },
            isPartner: true,
          });
          return message;
        },
        error: (err) => {
          if (err.status === 409) return 'Partner already exists';
          return 'Failed to send request';
        },
      },
      { duration: 3000, style: { color: 'black' } },
    );
  }

  return (
    <div className="px-4 py-8 md:px-6">
      <div className="mx-auto max-w-6xl">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
            Something went wrong. Please try again.
          </div>
        )}
        {isLoading && <PartnerDetailsLoader />}

        {!error && !isLoading && details && (
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-2xl font-semibold">{details.partner.name}</h1>
            </div>

            {/* Main Content */}
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Profile Image */}
              <div className="mx-auto w-full max-w-md">
                <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg transition-colors duration-150 dark:border-gray-700">
                  <img
                    draggable="false"
                    className="aspect-square w-full object-cover object-top"
                    src={details.partner.profileImage}
                    alt={`${details.partner.name} profile image`}
                  />
                </div>
              </div>

              {/* Details Section */}
              <div className="space-y-6">
                {/* Rating */}
                <div className="rounded-xl border border-gray-200 bg-(--white) p-6 transition-colors duration-150 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-yellow-100 to-orange-100 transition-colors duration-150 dark:from-yellow-900 dark:to-orange-900">
                      <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Rating
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {Array.from({ length: details.partner.rating }).map(
                            (_, i) => (
                              <Star
                                key={`star${i}`}
                                fill="currentColor"
                                className="h-5 w-5 text-yellow-500 transition-colors duration-150"
                              />
                            ),
                          )}
                        </div>
                        <span className="font-medium">
                          ({details.partner.rating})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div className="rounded-xl border border-gray-200 bg-(--white) p-6 transition-colors duration-150 dark:border-gray-700">
                  <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                    Subject
                  </p>
                  <p className="inline-flex items-center gap-2 rounded-lg bg-linear-to-br from-indigo-100 to-purple-100 px-4 py-2 font-medium transition-colors duration-150 dark:from-indigo-900 dark:to-purple-900">
                    {details.partner.subject}
                  </p>
                </div>

                {/* Study Mode */}
                <div className="rounded-xl border border-gray-200 bg-(--white) p-6 transition-colors duration-150 dark:border-gray-700">
                  <p className="mb-2 text-sm text-gray-600 transition-colors duration-150 dark:text-gray-400">
                    Study mode
                  </p>
                  <div className="inline-flex items-center gap-2 rounded-lg bg-linear-to-br from-indigo-100 to-purple-100 px-4 py-2 font-medium transition-colors duration-150 dark:from-indigo-900 dark:to-purple-900">
                    <span>{details.partner.studyMode}</span>
                    <span
                      className={`inline-block h-2.5 w-2.5 rounded-full ${details.partner.studyMode === 'Online' ? 'bg-emerald-500' : 'bg-gray-400'}`}
                    ></span>
                  </div>
                </div>

                {/* Grid of Details */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Availability Time */}
                  <div className="rounded-xl border border-gray-200 bg-(--white) p-4 transition-colors duration-150 dark:border-gray-700">
                    <div className="mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-indigo-600 transition-colors duration-150 dark:text-indigo-400" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Availability
                      </p>
                    </div>
                    <p className="font-medium">
                      {details.partner.availabilityTime}
                    </p>
                  </div>

                  {/* Location */}
                  <div className="rounded-xl border border-gray-200 bg-(--white) p-4 transition-colors duration-150 dark:border-gray-700">
                    <div className="mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-indigo-600 transition-colors duration-150 dark:text-indigo-400" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Location
                      </p>
                    </div>
                    <p className="font-medium">{details.partner.location}</p>
                  </div>

                  {/* Experience */}
                  <div className="rounded-xl border border-gray-200 bg-(--white) p-4 transition-colors duration-150 dark:border-gray-700">
                    <div className="mb-2 flex items-center gap-2">
                      <Award className="h-4 w-4 text-indigo-600 transition-colors duration-150 dark:text-indigo-400" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Experience
                      </p>
                    </div>
                    <p className="font-medium">
                      {details.partner.experienceLevel}
                    </p>
                  </div>

                  {/* Partners */}
                  <div className="rounded-xl border border-gray-200 bg-(--white) p-4 transition-colors duration-150 dark:border-gray-700">
                    <div className="mb-2 flex items-center gap-2">
                      <Users className="h-4 w-4 text-indigo-600 transition-colors duration-150 dark:text-indigo-400" />
                      <p className="text-sm text-gray-600 transition-colors duration-150 dark:text-gray-400">
                        Partners
                      </p>
                    </div>
                    <p className="font-medium">
                      {details.partner.partnerCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center pt-4">
              {details.isPartner ? (
                <div className="w-full max-w-md rounded-xl border border-indigo-200 bg-linear-to-br from-indigo-50 to-purple-50 px-6 py-4 text-center font-medium text-indigo-700 transition-colors duration-150 dark:border-indigo-800 dark:from-indigo-950 dark:to-purple-950 dark:text-indigo-300">
                  Partner request sent
                </div>
              ) : (
                <button
                  onClick={() => triggerParnterRequest()}
                  className="w-full max-w-md rounded-xl bg-linear-to-br from-indigo-600 to-purple-600 px-8 py-4 font-medium text-white shadow-lg transition-all duration-150 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600"
                >
                  {sendingRequest ? (
                    <span className="loading loading-spinner loading-sm opacity-70"></span>
                  ) : (
                    <span>Send partner request</span>
                  )}
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
