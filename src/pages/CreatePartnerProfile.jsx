import { useEffect, useState } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import PartnerProfileLoader from '../components/loaders/PartnerProfileLoader';
import { toast } from 'kitzo/react';
import { updateProfile } from 'firebase/auth';
import useAxios from '../hooks/useAxios';

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
  const server = useAxios();
  const { user, partnerProfile, setPartnerProfile } = useGlobalContext();

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
        const res = await server.get('partner-profile/get');
        setPartnerProfile(res.data);
      } catch (err) {
        setPartnerProfile(null);
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
      const res = await server.post('partner-profile/create', createInfo);
      await updateFirebaseInfo(createInfo.name, createInfo.profileImage);
      return res.data;
    } catch (err) {
      throw err;
    } finally {
      setSubmittingForm(false);
    }
  }
  async function update(updateInfo) {
    setSubmittingForm(true);
    try {
      const res = await server.post('partner-profile/update', updateInfo);
      await updateFirebaseInfo(updateInfo.name, updateInfo.profileImage);
      return res.data;
    } catch (err) {
      throw err;
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

    if (partnerProfile) {
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
          success: (newProfileData) => {
            setPartnerProfile(newProfileData);
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
          success: (profileData) => {
            console.log(profileData);
            setPartnerProfile(profileData);
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
      <div className="mx-auto max-w-[1440px]">
        <h2 className="mb-4 pl-1 text-lg font-medium md:text-2xl">
          {partnerProfileLoading ? (
            <span className="block h-8 w-[200px] animate-pulse rounded-lg bg-(--loader-bg)"></span>
          ) : (
            <span>
              {partnerProfile
                ? 'Update partner profile'
                : 'Create partner profile'}
            </span>
          )}
        </h2>

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
                      className="h-[38px] w-full min-w-0 rounded-md border border-(--slick-border-clr) bg-(--input-bg) px-3 shadow-xs ring-2 ring-transparent transition-colors duration-150 outline-none focus:ring-(--input-focus-ring-clr)"
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      defaultValue={partnerProfile?.name || user.displayName}
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
                      className="transition-colors duration-150 h-[38px] w-full min-w-0 rounded-md border border-transparent bg-(--input-bg) px-3 text-(--disabled-input-clr) shadow-xs ring-2 ring-transparent outline-none focus:ring-(--input-focus-ring-clr)"
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
                      className="h-[38px] w-full min-w-0 rounded-md border border-(--slick-border-clr) bg-(--input-bg) px-3 shadow-xs ring-2 ring-transparent transition-colors duration-150 outline-none focus:ring-(--input-focus-ring-clr)"
                      id="profileImage"
                      type="text"
                      name="profileImage"
                      placeholder="Enter profile image url"
                      defaultValue={
                        partnerProfile?.profileImage || user.photoURL || ''
                      }
                      onChange={() => {
                        if (formError.profileImage.trim()) {
                          setFormError((prev) => ({
                            ...prev,
                            profileimage: '',
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
                      className="h-[38px] w-full min-w-0 rounded-md border border-(--slick-border-clr) bg-(--input-bg) px-3 shadow-xs ring-2 ring-transparent transition-colors duration-150 outline-none focus:ring-(--input-focus-ring-clr)"
                      id="subject"
                      type="text"
                      name="subject"
                      placeholder="Enter subject"
                      defaultValue={partnerProfile?.subject || ''}
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
                      defaultValue={partnerProfile?.studyMode || 'Online'}
                      className="h-[38px] w-full min-w-0 rounded-md border border-(--slick-border-clr) bg-(--input-bg) px-3 shadow-xs ring-2 ring-transparent transition-colors duration-150 outline-none focus:ring-(--input-focus-ring-clr)"
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
                      className="h-[38px] w-full min-w-0 rounded-md border border-(--slick-border-clr) bg-(--input-bg) px-3 shadow-xs ring-2 ring-transparent transition-colors duration-150 outline-none focus:ring-(--input-focus-ring-clr)"
                      id="availabilityTime"
                      name="availabilityTime"
                      defaultValue={
                        partnerProfile?.availabilityTime ||
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
                      className="h-[38px] w-full min-w-0 rounded-md border border-(--slick-border-clr) bg-(--input-bg) px-3 shadow-xs ring-2 ring-transparent transition-colors duration-150 outline-none focus:ring-(--input-focus-ring-clr)"
                      id="location"
                      type="text"
                      name="location"
                      placeholder="Enter Location"
                      defaultValue={partnerProfile?.location || ''}
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
                      className="h-[38px] w-full min-w-0 rounded-md border border-(--slick-border-clr) bg-(--input-bg) px-3 shadow-xs ring-2 ring-transparent transition-colors duration-150 outline-none focus:ring-(--input-focus-ring-clr)"
                      defaultValue={
                        partnerProfile?.experienceLevel || 'Beginner'
                      }
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
                      className="transition-colors duration-150 h-[38px] w-full min-w-0 rounded-md border border-transparent bg-(--input-bg) px-3 text-(--disabled-input-clr) shadow-xs ring-2 ring-transparent outline-none focus:ring-(--input-focus-ring-clr)"
                      id="rating"
                      type="text"
                      name="rating"
                      defaultValue={partnerProfile?.rating || 0}
                      readOnly
                    />
                  </div>

                  <div className="grid">
                    <label className="mb-1 w-fit pl-1" htmlFor="partnerCount">
                      Partner Count:
                    </label>
                    <input
                      className="transition-colors duration-150 h-[38px] w-full min-w-0 rounded-md border border-transparent bg-(--input-bg) px-3 text-(--disabled-input-clr) shadow-xs ring-2 ring-transparent outline-none focus:ring-(--input-focus-ring-clr)"
                      id="partnerCount"
                      type="text"
                      name="partnerCount"
                      defaultValue={partnerProfile?.partnerCount || 0}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <button
                className="transition-[background-color] duration-150 mt-6 grid h-8 w-[140px] place-items-center rounded-md bg-(--accent-color) px-4 py-1.5 text-sm"
                type="submit"
              >
                {submittingForm ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <>{partnerProfile ? 'Update profile' : 'Create profile'}</>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePartnerProfile;
