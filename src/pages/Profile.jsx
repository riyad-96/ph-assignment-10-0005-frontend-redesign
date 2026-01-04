import { useState } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import { toast } from 'kitzo';
import serverAPI from '../utils/server';
import { updateProfile } from 'firebase/auth';
import { Helmet } from 'react-helmet';
import { User, Mail, Image } from 'lucide-react';
import GradientButton from '../components/ui/GradientButton';

function Profile() {
  const server = serverAPI();
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
    await updateProfile(user, {
      displayName: formData.name,
      photoURL: formData.profileImage,
    });
    const response = await server.post('/user/update', {
      name: formData.name,
      profileImage: formData.profileImage,
    });
    return response.data;
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
      <div>
        <Helmet title="Profile • StudyMate" />
        <div className="max-w-6xl">
          <div className="mb-6">
            <h1 className="mb-4 text-lg font-medium md:text-2xl">
              Profile Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your account information
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Profile Image Card */}
            <div className="rounded-xl border border-gray-200 bg-(--white) p-6 transition-colors duration-150 lg:col-span-1 dark:border-gray-700">
              <h2 className="mb-4 text-gray-900 dark:text-white">
                Profile Photo
              </h2>
              <div className="aspect-square w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 max-lg:mx-auto max-lg:max-w-75 dark:border-gray-700 dark:bg-gray-800">
                <img
                  draggable="false"
                  className="size-full object-cover object-center"
                  src={photo}
                  alt={`${name} profile photo`}
                />
              </div>
            </div>
            {/* Profile Form Card */}
            <div className="rounded-xl border border-gray-200 bg-(--white) p-6 transition-colors duration-150 lg:col-span-2 dark:border-gray-700">
              <h2 className="mb-6 text-gray-900 dark:text-white">
                Personal Information
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleFormSubmit(e.target);
                }}
                className="space-y-6"
              >
                {/* Name Field */}
                <div className="space-y-2">
                  <label
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="name"
                  >
                    <User
                      size={16}
                      className="text-indigo-600 dark:text-indigo-400"
                    />
                    Your Name
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
                  {formError.name && (
                    <p className="text-sm text-red-500 dark:text-red-400">
                      {formError.name}
                    </p>
                  )}
                </div>
                {/* Email Field */}
                <div className="space-y-2">
                  <label
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="email"
                  >
                    <Mail
                      size={16}
                      className="text-indigo-600 dark:text-indigo-400"
                    />
                    Email Address
                  </label>
                  <input
                    className="w-full min-w-0 rounded-lg border border-gray-200 bg-zinc-400/10 px-4 py-2.5 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-400"
                    id="email"
                    type="email"
                    name="email"
                    defaultValue={email}
                    readOnly
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Email cannot be changed
                  </p>
                </div>
                {/* Profile Image URL Field */}
                <div className="space-y-2">
                  <label
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="profileImage"
                  >
                    <Image
                      size={16}
                      className="text-indigo-600 dark:text-indigo-400"
                    />
                    Profile Image URL
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
                  {formError.profileImage && (
                    <p className="text-sm text-red-500 dark:text-red-400">
                      {formError.profileImage}
                    </p>
                  )}
                </div>
                {/* Submit Button */}
                <div className="pt-4">
                  <GradientButton
                    content={'Update Profile'}
                    type="submit"
                    disabled={submittingForm}
                    isLoading={submittingForm}
                    className="w-40 text-sm"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
