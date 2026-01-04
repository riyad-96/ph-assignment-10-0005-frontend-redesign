import { Users, BookOpen, Network } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      value: '500+',
      label: 'Active Students',
      icon: Users,
    },
    {
      value: '120+',
      label: 'Subjects',
      icon: BookOpen,
    },
    {
      value: '1000+',
      label: 'Connections Made',
      icon: Network,
    },
  ];

  return (
    <section className="">
      <div className="mb-12 space-y-4 text-center">
        <h2 className="pl-1 text-lg font-medium md:text-2xl">
          StudyMate in Numbers
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Real stats that show how learners connect, collaborate, and grow
          together.
        </p>
      </div>

      <div className="">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group rounded-xl border border-gray-200 bg-(--white) p-6 transition-all duration-150 hover:border-indigo-300 dark:border-gray-700 dark:hover:border-indigo-500"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-linear-to-br from-indigo-100 to-purple-100 p-3 transition-colors group-hover:from-indigo-200 group-hover:to-purple-200 dark:from-indigo-900 dark:to-purple-900 dark:group-hover:from-indigo-800 dark:group-hover:to-purple-800">
                    <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <h4
                      className="mb-1 text-gray-900 dark:text-white"
                      style={{
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        lineHeight: '1',
                      }}
                    >
                      {stat.value}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
