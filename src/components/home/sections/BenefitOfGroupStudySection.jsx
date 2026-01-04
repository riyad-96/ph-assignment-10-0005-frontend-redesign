import {
  Lightbulb,
  Users2,
  TrendingUp,
  MessageSquare,
  Target,
  Sparkles,
} from 'lucide-react';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Lightbulb,
      title: 'Diverse Perspectives',
      description:
        'Gain new insights and approaches to problems from peers with different learning styles and backgrounds.',
    },
    {
      icon: Users2,
      title: 'Collaborative Learning',
      description:
        "Work together to tackle challenging topics, share knowledge, and fill in each other's learning gaps.",
    },
    {
      icon: TrendingUp,
      title: 'Improved Retention',
      description:
        'Teaching concepts to others reinforces your own understanding and helps retain information longer.',
    },
    {
      icon: MessageSquare,
      title: 'Active Discussion',
      description:
        'Engage in meaningful conversations that deepen comprehension and make learning more interactive.',
    },
    {
      icon: Target,
      title: 'Stay Motivated',
      description:
        'Keep each other accountable, maintain focus, and build momentum with shared goals and deadlines.',
    },
    {
      icon: Sparkles,
      title: 'Build Connections',
      description:
        'Form lasting friendships and professional networks while achieving academic success together.',
    },
  ];

  return (
    <section className="">
      <div className="">
        {/* Section Header */}
        <div className="mb-12 space-y-4 text-center">
          <h2 className="pl-1 text-lg font-medium md:text-2xl">
            Benefits of Group Study
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Discover why studying together is more effective than going it
            alone. Join our community and unlock the power of collaborative
            learning.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="group rounded-xl border border-gray-200 bg-(--white) p-6 transition-all duration-150 hover:border-indigo-300 dark:border-gray-700 dark:hover:border-indigo-500"
              >
                {/* Icon */}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-indigo-100 to-purple-100 transition-colors group-hover:from-indigo-200 group-hover:to-purple-200 dark:from-indigo-900 dark:to-purple-900 dark:group-hover:from-indigo-800 dark:group-hover:to-purple-800">
                  <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-gray-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
