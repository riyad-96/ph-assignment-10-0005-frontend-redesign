import { useEffect, useState } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import PartnerProfileLoader from '../components/loaders/PartnerProfileLoader';
import { toast } from 'kitzo';
import { updateProfile } from 'firebase/auth';
import serverAPI from '../utils/server';
import { Helmet } from 'react-helmet';
import GradientButton from '../components/ui/GradientButton';

const availabilityTimes = [
  'Early Morning (5-8 AM)',
  'Morning (8-11 AM)',
  'Late Morning (11 AM-1 PM)',
  'Afternoon (1-4 PM)',
  'Late Afternoon (4-6 PM)',
  'Evening (6-9 PM)',
  'Night (9 PM-12 AM)',
  'Late Night (12-3 AM)',
  'Dawn (3-5 AM)',
];

function CreatePartnerProfile() {
  const server = serverAPI();
  const { user, userProfile, setUserProfile } = useGlobalContext();

  const [formError, setFormError] = useState({
    name: '',
    profileImage: '',
    subject: '',
    location: '',
  });

  // fetch partner profile data
  const [partnerProfileLoading, setPartnerProfileLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const res = await server.get('user/get');
        setUserProfile(res.data.userProfile);
      } catch {
        setUserProfile(null);
      } finally {
        setPartnerProfileLoading(false);
      }
    })();
  }, []);

  function ableToSubmit(data) {
    let accepted = true;
    if (!data.name?.trim()) {
      setFormError((prev) => ({ ...prev, name: 'Name is required' }));
      accepted = false;
    }
    if (!data.profileImage?.trim()) {
      setFormError((prev) => ({
        ...prev,
        profileImage: 'Profile image is required',
      }));
      accepted = false;
    }
    if (!data.subject?.trim()) {
      setFormError((prev) => ({ ...prev, subject: 'Subject is required' }));
      accepted = false;
    }
    if (!data.location?.trim()) {
      setFormError((prev) => ({ ...prev, location: 'Location is required' }));
      accepted = false;
    }
    return accepted;
  }

  const [submittingForm, setSubmittingForm] = useState(false);

  async function updateFirebaseInfo(displayName, photoURL) {
    await updateProfile(user, { displayName, photoURL });
  }

  async function create(createInfo) {
    setSubmittingForm(true);
    try {
      const res = await server.post('user/create', createInfo);
      await updateFirebaseInfo(createInfo.name, createInfo.profileImage);
      return res.data;
    } finally {
      setSubmittingForm(false);
    }
  }
  async function update(updateInfo) {
    setSubmittingForm(true);
    try {
      const res = await server.post('user/update', updateInfo);
      await updateFirebaseInfo(updateInfo.name, updateInfo.profileImage);
      return res.data;
    } finally {
      setSubmittingForm(false);
    }
  }

  function handleFormSubmit(form) {
    const createInfo = {
      name: form.name.value,
      email: user.email,
      profileImage: form.profileImage.value,
      subject: form.subject.value,
      studyMode: form.studyMode.value,
      availabilityTime: form.availabilityTime.value,
      location: form.location.value,
      experienceLevel: form.experienceLevel.value,
      rating: 0,
      partnerCount: 0,
    };

    if (!ableToSubmit(createInfo)) return;

    if (userProfile) {
      const updateInfo = {
        name: form.name.value,
        profileImage: form.profileImage.value,
        subject: form.subject.value,
        studyMode: form.studyMode.value,
        availabilityTime: form.availabilityTime.value,
        location: form.location.value,
        experienceLevel: form.experienceLevel.value,
      };

      toast.promise(
        update(updateInfo),
        {
          loading: 'Updating partner profile',
          success: (data) => {
            setUserProfile(data.userProfile);
            return 'Profile update successful';
          },
          error: (err) => {
            console.error(err);
            return 'Error while updating profile';
          },
        },
        { duration: 2300, style: { color: 'black' } },
      );
    } else {
      toast.promise(
        create(createInfo),
        {
          loading: 'Creating partner profile',
          success: (data) => {
            setUserProfile(data.userProfile);
            return 'Profile successfully created';
          },
          error: (err) => {
            console.error(err);
            return 'Error while creating profile';
          },
        },
        { duration: 2300, style: { color: 'black' } },
      );
    }
  }

  return (
    <div className="px-2 md:px-3">
      <Helmet title="Partner profile • StudyMate" />

      <div className="max-w-360">
        <h1 className="mb-4 pl-1 text-lg font-medium md:text-2xl">
          {partnerProfileLoading ? (
            <span className="block h-8 w-50 animate-pulse rounded-lg bg-(--loader-bg)"></span>
          ) : (
            <span>
              {userProfile
                ? 'Update partner profile'
                : 'Create partner profile'}
            </span>
          )}
        </h1>

        {partnerProfileLoading ? (
          <PartnerProfileLoader />
        ) : (
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (submittingForm) return;
                handleFormSubmit(e.target);
              }}
            >
              <div className="gap-2 max-sm:grid sm:flex">
                <div className="flex-1 space-y-2">
                  <div className="grid">
                    <label className="mb-1 w-fit pl-1" htmlFor="name">
                      Your name:
                    </label>
                    <input
                      className="w-full min-w-0 rounded-lg border border-gray-200 bg-zinc-400/10 px-4 py-2.5 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-400"
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      defaultValue={userProfile?.name || user.displayName}
                      onChange={() => {
                        if (formError.name.trim()) {
                          setFormError((prev) => ({ ...prev, name: '' }));
                        }
                      }}
                    />
                    <span
                      className={`overflow-hidden pl-1.5 text-sm text-red-400 transition-[height,margin] duration-150 ${formError.name ? 'mt-0.5 h-5' : 'mt-0 h-0'}`}
                    >
                      {formError.name}
                    </span>
                  </div>

                  <div className="grid">
                    <label className="mb-1 w-fit pl-1" htmlFor="email">
                      Default email:
                    </label>
                    <input
                      className="w-full min-w-0 rounded-lg border border-gray-200 bg-zinc-400/10 px-4 py-2.5 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-400"
                      id="email"
                      type="email"
                      name="email"
                      defaultValue={user.email}
                      readOnly
                    />
                  </div>

                  <div className="grid">
                    <label className="mb-1 w-fit pl-1" htmlFor="profileImage">
                      Profile image link:
                    </label>
                    <input
                      className="w-full min-w-0 rounded-lg border border-gray-200 bg-zinc-400/10 px-4 py-2.5 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-400"
                      id="profileImage"
                      type="text"
                      name="profileImage"
                      placeholder="Enter profile image url"
                      defaultValue={
                        userProfile?.profileImage || user.photoURL || ''
                      }
                      onChange={() => {
                        if (formError.profileImage.trim()) {
                          setFormError((prev) => ({
                            ...prev,
                            profileImage: '',
                          }));
                        }
                      }}
                    />
                    <span
                      className={`overflow-hidden pl-1.5 text-sm text-red-400 transition-[height,margin] duration-150 ${formError.profileImage ? 'mt-0.5 h-5' : 'mt-0 h-0'}`}
                    >
                      {formError.profileImage}
                    </span>
                  </div>

                  <div className="grid">
                    <label className="mb-1 w-fit pl-1" htmlFor="subject">
                      Subject:
                    </label>
                    <input
                      className="w-full min-w-0 rounded-lg border border-gray-200 bg-zinc-400/10 px-4 py-2.5 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-400"
                      id="subject"
                      type="text"
                      name="subject"
                      placeholder="Enter subject"
                      defaultValue={userProfile?.subject || ''}
                      onChange={() => {
                        if (formError.subject.trim()) {
                          setFormError((prev) => ({ ...prev, subject: '' }));
                        }
                      }}
                    />
                    <span
                      className={`overflow-hidden pl-1.5 text-sm text-red-400 transition-[height,margin] duration-150 ${formError.subject ? 'mt-0.5 h-5' : 'mt-0 h-0'}`}
                    >
                      {formError.subject}
                    </span>
                  </div>

                  <div className="grid">
                    <label className="mb-1 w-fit pl-1" htmlFor="studyMode">
                      Study mode:
                    </label>
                    <select
                      id="studyMode"
                      name="studyMode"
                      defaultValue={userProfile?.studyMode || 'Online'}
                      className="w-full min-w-0 appearance-none rounded-lg border border-gray-200 bg-zinc-400/10 px-4 py-2.5 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-400"
                    >
                      <option defaultValue="Online">Online</option>
                      <option defaultValue="Offline">Offline</option>
                    </select>
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="grid">
                    <label
                      className="mb-1 w-fit pl-1"
                      htmlFor="availabilityTime"
                    >
                      Availability time:
                    </label>
                    <select
                      className="w-full min-w-0 appearance-none rounded-lg border border-gray-200 bg-zinc-400/10 px-4 py-2.5 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-400"
                      id="availabilityTime"
                      name="availabilityTime"
                      defaultValue={
                        userProfile?.availabilityTime ||
                        'Early Morning (5-8 AM)'
                      }
                    >
                      {availabilityTimes.map((t, i) => (
                        <option key={t + i} defaultValue={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid">
                    <label className="mb-1 w-fit pl-1" htmlFor="location">
                      Location
                    </label>
                    <input
                      className="w-full min-w-0 rounded-lg border border-gray-200 bg-zinc-400/10 px-4 py-2.5 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-400"
                      id="location"
                      type="text"
                      name="location"
                      placeholder="Enter Location"
                      defaultValue={userProfile?.location || ''}
                      onChange={() => {
                        if (formError.location.trim()) {
                          setFormError((prev) => ({ ...prev, location: '' }));
                        }
                      }}
                    />
                    <span
                      className={`overflow-hidden pl-1.5 text-sm text-red-400 transition-[height,margin] duration-150 ${formError.location ? 'mt-0.5 h-5' : 'mt-0 h-0'}`}
                    >
                      {formError.location}
                    </span>
                  </div>

                  <div className="grid">
                    <label
                      className="mb-1 w-fit pl-1"
                      htmlFor="experienceLevel"
                    >
                      Experience level:
                    </label>
                    <select
                      id="experienceLevel"
                      name="experienceLevel"
                      className="w-full min-w-0 appearance-none rounded-lg border border-gray-200 bg-zinc-400/10 px-4 py-2.5 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-400"
                      defaultValue={userProfile?.experienceLevel || 'Beginner'}
                    >
                      <option defaultValue="Beginner">Beginner</option>
                      <option defaultValue="Intermediate">Intermediate</option>
                      <option defaultValue="Expert">Expert</option>
                    </select>
                  </div>

                  <div className="grid">
                    <label className="mb-1 w-fit pl-1" htmlFor="rating">
                      Profile Rating:
                    </label>
                    <input
                      className="w-full min-w-0 rounded-lg border border-gray-200 bg-zinc-400/10 px-4 py-2.5 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-400"
                      id="rating"
                      type="text"
                      name="rating"
                      defaultValue={userProfile?.rating || 0}
                      readOnly
                    />
                  </div>

                  <div className="grid">
                    <label className="mb-1 w-fit pl-1" htmlFor="partnerCount">
                      Partner Count:
                    </label>
                    <input
                      className="w-full min-w-0 rounded-lg border border-gray-200 bg-zinc-400/10 px-4 py-2.5 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-400"
                      id="partnerCount"
                      type="text"
                      name="partnerCount"
                      defaultValue={userProfile?.partnerCount || 0}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <GradientButton
                content={userProfile ? 'Update profile' : 'Create profile'}
                type="submit"
                isLoading={submittingForm}
                disabled={submittingForm}
                className="mt-8 w-40 text-sm"
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePartnerProfile;
