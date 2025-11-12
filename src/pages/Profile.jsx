import { useState } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import { toast } from 'kitzo/react';
import useAxios from '../hooks/useAxios';
import { updateProfile } from 'firebase/auth';

function Profile() {
  const server = useAxios();
  const { user, userProfile, setUserProfile } = useGlobalContext();
  const email = user.email;
  const name = userProfile?.name || user.displayName;
  const photo = userProfile?.profileImage || user.photoURL;

  const [formError, setFormError] = useState({
    name: '',
    profileImage: '',
  });
  const [submittingForm, setSubmittingForm] = useState(false);

  function isAbleToSubmit(formData) {
    let accepted = true;
    if (!formData.name.trim()) {
      setFormError((prev) => ({ ...prev, name: 'Name is required' }));
      accepted = false;
    }
    if (!formData.profileImage.trim()) {
      setFormError((prev) => ({
        ...prev,
        profileImage: 'Profile image url is required',
      }));
      accepted = false;
    }
    return accepted;
  }

  async function updateProfileInfo(formData) {
    try {
      await updateProfile(user, {
        displayName: formData.name,
        photoURL: formData.profileImage,
      });
      const response = await server.post('/user/update', {
        name: formData.name,
        profileImage: formData.profileImage,
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  function handleFormSubmit(form) {
    const formData = {
      name: form.name.value,
      profileImage: form.profileImage.value,
    };

    if (!isAbleToSubmit(formData)) return;

    setSubmittingForm(true);
    toast.promise(updateProfileInfo(formData), {
      loading: 'Checking profile info',
      success: (data) => {
        let message = 'Profile updated successful';
        if (data.code && data.code === 'created') {
          message = 'Profile created and updated';
        }
        setUserProfile(data.userProfile);
        setSubmittingForm(false);
        return message;
      },
      error: () => {
        setSubmittingForm(false);
        return 'Profile udpate failed';
      },
    });
  }

  return (
    <div className="px-2 md:px-3">
      <div className="mx-auto max-w-[1440px]">
        <h1 className="mb-4 pl-1 text-lg font-medium md:text-2xl">Profile</h1>

        <div>
          <div className="pb-8">
            <div className="mx-auto aspect-square h-[150px] overflow-hidden rounded-2xl bg-zinc-300 transition-[height] duration-200 sm:h-[200px] lg:h-[250px] dark:bg-zinc-700">
              <img
                className="size-full object-cover object-top"
                src={photo}
                alt={`${name} profile photo`}
              />
            </div>
          </div>

          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleFormSubmit(e.target);
              }}
              className="mx-auto max-w-[400px]"
            >
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
                  className="h-[38px] w-full min-w-0 rounded-md border border-transparent bg-(--input-bg) px-3 text-(--disabled-input-clr) shadow-xs ring-2 ring-transparent transition-colors duration-150 outline-none focus:ring-(--input-focus-ring-clr)"
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
                  className="h-[38px] w-full min-w-0 rounded-md border border-(--slick-border-clr) bg-(--input-bg) px-3 shadow-xs ring-2 ring-transparent transition-colors duration-150 outline-none focus:ring-(--input-focus-ring-clr)"
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

              <div>
                <button
                  className="mt-6 grid h-8 w-[140px] place-items-center rounded-md bg-(--accent-color) px-4 py-1.5 text-sm"
                  type="submit"
                >
                  {submittingForm ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <span>Update</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
