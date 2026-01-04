import { UserPlus, Search, MessageCircle, BookOpen } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      icon: UserPlus,
      title: 'Create Your Profile',
      description:
        'Sign up and share your learning interests, subjects, and goals.',
      step: 1,
    },
    {
      icon: Search,
      title: 'Find a Match',
      description:
        'Browse or search for students with similar study interests or skill levels.',
      step: 2,
    },
    {
      icon: MessageCircle,
      title: 'Send a Request',
      description: 'Request to connect with a potential StudyMate or group.',
      step: 3,
    },
    {
      icon: BookOpen,
      title: 'Start Studying Together',
      description:
        'Once matched, you can chat, share resources, and plan study sessions.',
      step: 4,
    },
  ];

  return (
    <section>
      <div>
        {/* Section Header */}
        <div className="mb-12 space-y-4 text-center">
          <h2 className="pl-1 text-lg font-medium md:text-2xl">
            How StudyMate Works
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Four simple steps to find your perfect study partner and start
            learning together.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="group relative rounded-xl border border-gray-200 bg-(--white) p-6 transition-all duration-150 hover:border-indigo-300 dark:border-gray-700 dark:hover:border-indigo-500"
              >
                {/* Step Number Badge */}
                <div className="absolute -top-3 left-6 flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br from-indigo-600 to-purple-600 text-xs text-white dark:from-indigo-500 dark:to-purple-500">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-indigo-100 to-purple-100 transition-colors group-hover:from-indigo-200 group-hover:to-purple-200 dark:from-indigo-900 dark:to-purple-900 dark:group-hover:from-indigo-800 dark:group-hover:to-purple-800">
                  <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
