import { Clock, Brain, Zap } from 'lucide-react';

export default function BlogPreviewSection() {
  const blogPosts = [
    {
      icon: Clock,
      title: 'How to focus for 2 hours straight',
      description:
        'Discover the proven techniques used by top students to maintain deep concentration without burning out.',
      readTime: '5 min read',
    },
    {
      icon: Brain,
      title: 'The science of spaced repetition',
      description:
        'Learn why reviewing material at specific intervals is the most effective way to retain information long-term.',
      readTime: '7 min read',
    },
    {
      icon: Zap,
      title: 'Boost productivity with the Pomodoro technique',
      description:
        'Master this time management method to accomplish more in less time while staying energized throughout the day.',
      readTime: '4 min read',
    },
  ];

  return (
    <section>
      <div>
        {/* Section Header */}
        <div className="mb-12 space-y-4 text-center">
          <h2 className="pl-1 text-lg font-medium md:text-2xl">
            Study Tips & Blog
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Expert advice and proven strategies to help you study smarter, not
            harder.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => {
            const Icon = post.icon;
            return (
              <div
                key={post.title}
                className="group grid cursor-pointer grid-rows-[auto_auto_1fr_auto] rounded-xl border border-gray-200 bg-(--white) p-6 transition-all duration-150 hover:border-indigo-300 dark:border-gray-700 dark:hover:border-indigo-500"
              >
                {/* Icon */}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-indigo-100 to-purple-100 transition-colors group-hover:from-indigo-200 group-hover:to-purple-200 dark:from-indigo-900 dark:to-purple-900 dark:group-hover:from-indigo-800 dark:group-hover:to-purple-800">
                  <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-gray-900 dark:text-white">
                  {post.title}
                </h3>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  {post.description}
                </p>

                {/* Read Time */}
                <div className="text-sm text-indigo-600 dark:text-indigo-400">
                  {post.readTime}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
