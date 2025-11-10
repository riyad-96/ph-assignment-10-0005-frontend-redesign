import { useState } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';

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
  const { user } = useGlobalContext();

  const [formError, setFormError] = useState({
    name: '',
    profileimage: '',
    subject: '',
    location: '',
  });

  function ableToSubmit(data) {
    let accepted = true;
    if (!data.name?.trim()) {
      setFormError((prev) => ({ ...prev, name: 'Name is required' }));
      accepted = false;
    }
    if (!data.profileimage?.trim()) {
      setFormError((prev) => ({
        ...prev,
        profileimage: 'Profile image is required',
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

  function handleFormSubmit(form) {
    const partnerProfileInfo = {
      name: form.name.value,
      email: user.email,
      profileimage: form.profileimage.value,
      subject: form.subject.value,
      studymode: form.studymode.value,
      availabilitytime: form.availabilitytime.value,
      location: form.location.value,
      experience: form.experience.value,
      rating: 0,
      partner: 0,
    };

    if (!ableToSubmit(partnerProfileInfo)) return;

    console.log(partnerProfileInfo);
  }

  return (
    <div className="px-2 md:px-3">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="mb-4 pl-1 text-lg font-medium md:text-2xl">
          Create partner profile
        </h2>

        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleFormSubmit(e.target);
            }}
          >
            <div className="gap-2 sm:flex">
              <div className="flex-1 space-y-2">
                <div className="grid gap-1">
                  <label className="w-fit pl-1" htmlFor="name">
                    Your name:
                  </label>
                  <input
                    className="h-[34px] w-full min-w-0 rounded-md border border-(--slick-border-clr) bg-(--input-bg) px-3 shadow-xs ring-2 ring-transparent outline-none focus:ring-(--input-focus-ring-clr)"
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    defaultValue={user.displayName}
                    onChange={() => {
                      if (formError.name.trim()) {
                        setFormError((prev) => ({ ...prev, name: '' }));
                      }
                    }}
                  />
                  <span
                    className={`overflow-hidden pl-1.5 text-sm text-red-400 transition-[height] duration-150 ${formError.name ? 'h-5' : 'h-0'}`}
                  >
                    {formError.name}
                  </span>
                </div>

                <div className="grid gap-1">
                  <label className="w-fit pl-1" htmlFor="email">
                    Default email:
                  </label>
                  <input
                    className="h-[34px] w-full min-w-0 rounded-md border border-transparent bg-(--input-bg) px-3 text-(--disabled-input-clr) shadow-xs ring-2 ring-transparent outline-none focus:ring-(--input-focus-ring-clr)"
                    id="email"
                    type="email"
                    name="email"
                    defaultValue={user.email}
                    readOnly
                  />
                </div>

                <div className="grid gap-1">
                  <label className="w-fit pl-1" htmlFor="profileimage">
                    Profile image link:
                  </label>
                  <input
                    className="h-[34px] w-full min-w-0 rounded-md border border-(--slick-border-clr) bg-(--input-bg) px-3 shadow-xs ring-2 ring-transparent outline-none focus:ring-(--input-focus-ring-clr)"
                    id="profileimage"
                    type="text"
                    name="profileimage"
                    placeholder="Enter profile image url"
                    defaultValue={user.photoURL}
                    onChange={() => {
                      if (formError.profileimage.trim()) {
                        setFormError((prev) => ({ ...prev, profileimage: '' }));
                      }
                    }}
                  />
                  <span
                    className={`overflow-hidden pl-1.5 text-sm text-red-400 transition-[height] duration-150 ${formError.profileimage ? 'h-5' : 'h-0'}`}
                  >
                    {formError.profileimage}
                  </span>
                </div>

                <div className="grid gap-1">
                  <label className="w-fit pl-1" htmlFor="subject">
                    Subject:
                  </label>
                  <input
                    className="h-[34px] w-full min-w-0 rounded-md border border-(--slick-border-clr) bg-(--input-bg) px-3 shadow-xs ring-2 ring-transparent outline-none focus:ring-(--input-focus-ring-clr)"
                    id="subject"
                    type="text"
                    name="subject"
                    placeholder="Enter subject"
                    onChange={() => {
                      if (formError.subject.trim()) {
                        setFormError((prev) => ({ ...prev, subject: '' }));
                      }
                    }}
                  />
                  <span
                    className={`overflow-hidden pl-1.5 text-sm text-red-400 transition-[height] duration-150 ${formError.subject ? 'h-5' : 'h-0'}`}
                  >
                    {formError.subject}
                  </span>
                </div>

                <div className="grid gap-1">
                  <label className="w-fit pl-1" htmlFor="studymode">
                    Study mode:
                  </label>
                  <select
                    id="studymode"
                    name="studymode"
                    className="h-[34px] w-full min-w-0 rounded-md border border-(--slick-border-clr) bg-(--input-bg) px-3 shadow-xs ring-2 ring-transparent outline-none focus:ring-(--input-focus-ring-clr)"
                  >
                    <option defaultValue="Online">Online</option>
                    <option defaultValue="Offline">Offline</option>
                  </select>
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <div className="grid gap-1">
                  <label className="w-fit pl-1" htmlFor="availabilitytime">
                    Availability time:
                  </label>
                  <select
                    className="h-[34px] w-full min-w-0 rounded-md border border-(--slick-border-clr) bg-(--input-bg) px-3 shadow-xs ring-2 ring-transparent outline-none focus:ring-(--input-focus-ring-clr)"
                    id="availabilitytime"
                    name="availabilitytime"
                  >
                    {availabilityTimes.map((t, i) => (
                      <option key={t + i} defaultValue={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-1">
                  <label className="w-fit pl-1" htmlFor="location">
                    Location
                  </label>
                  <input
                    className="h-[34px] w-full min-w-0 rounded-md border border-(--slick-border-clr) bg-(--input-bg) px-3 shadow-xs ring-2 ring-transparent outline-none focus:ring-(--input-focus-ring-clr)"
                    id="location"
                    type="text"
                    name="location"
                    placeholder="Enter Location"
                    onChange={() => {
                      if (formError.location.trim()) {
                        setFormError((prev) => ({ ...prev, location: '' }));
                      }
                    }}
                  />
                  <span
                    className={`overflow-hidden pl-1.5 text-sm text-red-400 transition-[height] duration-150 ${formError.location ? 'h-5' : 'h-0'}`}
                  >
                    {formError.location}
                  </span>
                </div>

                <div className="grid gap-1">
                  <label className="w-fit pl-1" htmlFor="experience">
                    Experience level:
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    className="h-[34px] w-full min-w-0 rounded-md border border-(--slick-border-clr) bg-(--input-bg) px-3 shadow-xs ring-2 ring-transparent outline-none focus:ring-(--input-focus-ring-clr)"
                  >
                    <option defaultValue="Beginner">Beginner</option>
                    <option defaultValue="Intermediate">Intermediate</option>
                    <option defaultValue="Expert">Expert</option>
                  </select>
                </div>

                <div className="grid gap-1">
                  <label className="w-fit pl-1" htmlFor="rating">
                    Profile Rating:
                  </label>
                  <input
                    className="h-[34px] w-full min-w-0 rounded-md border border-transparent bg-(--input-bg) px-3 text-(--disabled-input-clr) shadow-xs ring-2 ring-transparent outline-none focus:ring-(--input-focus-ring-clr)"
                    id="rating"
                    type="text"
                    name="rating"
                    defaultValue={0}
                    readOnly
                  />
                </div>

                <div className="grid gap-1">
                  <label className="w-fit pl-1" htmlFor="partnercount">
                    Partner Count:
                  </label>
                  <input
                    className="h-[34px] w-full min-w-0 rounded-md border border-transparent bg-(--input-bg) px-3 text-(--disabled-input-clr) shadow-xs ring-2 ring-transparent outline-none focus:ring-(--input-focus-ring-clr)"
                    id="partnercount"
                    type="text"
                    name="partnercount"
                    defaultValue={0}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <button
              className="mt-6 rounded-md bg-(--nav-link-hover-bg) px-4 py-1.5 text-sm"
              type="submit"
            >
              Create Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePartnerProfile;
