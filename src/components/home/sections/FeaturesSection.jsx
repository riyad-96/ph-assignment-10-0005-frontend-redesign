import { Sparkles, Users, Shield } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Sparkles,
      title: 'Smart Tools',
      description:
        'AI-powered study aids that adapt to your learning style and pace.',
    },
    {
      icon: Users,
      title: 'Community Support',
      description:
        'Connect with thousands of students sharing tips and motivation.',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description:
        'Your study data is encrypted and never shared with third parties.',
    },
  ];

  return (
    <section>
      <div>
        {/* Section Header */}
        <div className="mb-12 space-y-4 text-center">
          <h2 className="pl-1 text-lg font-medium md:text-2xl">
            Why students love us
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Everything you need to succeed in your studies, all in one place.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group rounded-xl border border-gray-200 bg-(--white) p-6 text-center transition-all duration-150 hover:border-indigo-300 dark:border-gray-700 dark:hover:border-indigo-500"
              >
                {/* Icon */}
                <div className="mb-4 flex justify-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-indigo-100 to-purple-100 transition-colors group-hover:from-indigo-200 group-hover:to-purple-200 dark:from-indigo-900 dark:to-purple-900 dark:group-hover:from-indigo-800 dark:group-hover:to-purple-800">
                    <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
