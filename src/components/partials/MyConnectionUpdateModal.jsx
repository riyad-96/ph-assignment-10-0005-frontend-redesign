import { toast } from 'kitzo';
import { motion } from 'motion/react';
import { useState } from 'react';
import serverAPI from '../../utils/server';
import GradientButton from '../ui/GradientButton';

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

function MyConnectionUpdateModal({ state, func }) {
  const server = serverAPI();
  const { updateInfo } = state;
  const {
    name,
    email,
    profileImage,
    location,
    subject,
    experienceLevel,
    studyMode,
    availabilityTime,
    rating,
    partnerCount,
    _id,
  } = updateInfo;

  const { setUpdateInfo, setConnections } = func;

  const [formError, setFormError] = useState({
    name: '',
    profileImage: '',
    subject: '',
    location: '',
  });

  const [submittingForm, setSubmittingForm] = useState(false);

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

  async function updateRequestPartnerProfile(info) {
    setSubmittingForm(true);

    const response = await server.post(
      '/partner-request/update-partner-profile',
      { info, _id },
    );
    return response.data;
  }

  function handleFormSubmit(form) {
    const formData = {
      name: form.name.value,
      profileImage: form.profileImage.value,
      subject: form.subject.value,
      studyMode: form.studyMode.value,
      availabilityTime: form.availabilityTime.value,
      location: form.location.value,
      experienceLevel: form.experienceLevel.value,
    };

    if (!ableToSubmit(formData)) return;

    toast.promise(
      updateRequestPartnerProfile(formData),
      {
        loading: 'Updating profile info',
        success: (data) => {
          setConnections((prev) =>
            prev.map((c) => (c._id === _id ? { ...data } : c)),
          );
          setSubmittingForm(false);
          setUpdateInfo(null);
          return 'Profile info updated';
        },
        error: () => {
          setSubmittingForm(false);
          return 'Update failed';
        },
      },
      { duration: 2500, style: { color: 'black' } },
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      onMouseDown={() => setUpdateInfo(null)}
      className="fixed inset-0 z-25 grid place-items-center overflow-y-auto bg-black/30 px-4 pt-16 pb-40 dark:bg-black/50"
    >
      <motion.div
        initial={{
          scale: 1.2,
        }}
        animate={{
          scale: 1,
        }}
        exit={{
          opacity: 0,
          scale: 0.8,
        }}
        onMouseDown={(e) => e.stopPropagation()}
        className="w-full max-w-[700px] rounded-xl bg-(--modal-bg) p-4 shadow-md"
      >
        <h2 className="mb-2 max-sm:text-center sm:text-lg">
          Update information of <strong>{name}</strong>
        </h2>
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
                    Name:
                  </label>
                  <input
                    className="w-full min-w-0 rounded-lg border border-gray-200 bg-zinc-400/10 px-4 py-2.5 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-400"
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    defaultValue={name}
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
                    defaultValue={email}
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
                    defaultValue={profileImage}
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
                    defaultValue={subject}
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
                    defaultValue={studyMode}
                    className="w-full min-w-0 appearance-none rounded-lg border border-gray-200 bg-zinc-400/10 px-4 py-2.5 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-400"
                  >
                    <option defaultValue="Online">Online</option>
                    <option defaultValue="Offline">Offline</option>
                  </select>
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <div className="grid">
                  <label className="mb-1 w-fit pl-1" htmlFor="availabilityTime">
                    Availability time:
                  </label>
                  <select
                    className="w-full min-w-0 appearance-none rounded-lg border border-gray-200 bg-zinc-400/10 px-4 py-2.5 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-400"
                    id="availabilityTime"
                    name="availabilityTime"
                    defaultValue={availabilityTime}
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
                    defaultValue={location}
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
                  <label className="mb-1 w-fit pl-1" htmlFor="experienceLevel">
                    Experience level:
                  </label>
                  <select
                    id="experienceLevel"
                    name="experienceLevel"
                    className="w-full min-w-0 appearance-none rounded-lg border border-gray-200 bg-zinc-400/10 px-4 py-2.5 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-400"
                    defaultValue={experienceLevel}
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
                    defaultValue={rating}
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
                    defaultValue={partnerCount}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <GradientButton
              content="Update"
              isLoading={submittingForm}
              disabed={submittingForm}
              type="submit"
              className="mt-6 w-35 text-sm"
            />
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default MyConnectionUpdateModal;
