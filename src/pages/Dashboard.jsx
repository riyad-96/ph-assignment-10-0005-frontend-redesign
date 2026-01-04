import { Helmet } from 'react-helmet';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

export default function Dashboard() {
  // Demo data for charts
  const studyHoursData = [
    { day: 'Mon', hours: 4 },
    { day: 'Tue', hours: 6 },
    { day: 'Wed', hours: 3 },
    { day: 'Thu', hours: 7 },
    { day: 'Fri', hours: 5 },
    { day: 'Sat', hours: 8 },
    { day: 'Sun', hours: 6 },
  ];

  const subjectDistributionData = [
    { name: 'Mathematics', value: 30 },
    { name: 'Science', value: 25 },
    { name: 'History', value: 20 },
    { name: 'English', value: 15 },
    { name: 'Others', value: 10 },
  ];

  const COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#c084fc', '#d8b4fe'];

  return (
    <div className="px-2 md:px-3">
      <Helmet title="Dashboard • StudyMate" />

      <div className="space-y-6">
        <div>
          <h1 className="mb-4 text-lg font-medium md:text-2xl">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back to StudyMate
          </p>
        </div>
        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-(--white) p-6 transition-colors duration-150 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Partners
            </p>
            <p className="mt-2 text-gray-900 dark:text-white">12</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-(--white) p-6 transition-colors duration-150 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Active Sessions
            </p>
            <p className="mt-2 text-gray-900 dark:text-white">3</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-(--white) p-6 transition-colors duration-150 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Hours Studied
            </p>
            <p className="mt-2 text-gray-900 dark:text-white">48h</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-(--white) p-6 transition-colors duration-150 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Study Streak
            </p>
            <p className="mt-2 text-gray-900 dark:text-white">7 days</p>
          </div>
        </div>
        {/* Recent Activity */}
        <div className="rounded-xl border border-gray-200 bg-(--white) p-6 transition-colors duration-150 dark:border-gray-700">
          <h2 className="mb-4 text-gray-900 dark:text-white">
            Recent Activity
          </h2>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <p>Your dashboard content goes here...</p>
          </div>
        </div>
        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Bar Chart - Study Hours */}
          <div className="rounded-xl border border-gray-200 bg-(--white) p-6 transition-colors duration-150 dark:border-gray-700">
            <h2 className="mb-4 text-gray-900 dark:text-white">
              Weekly Study Hours
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studyHoursData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-gray-200 dark:stroke-gray-700"
                />
                <XAxis
                  dataKey="day"
                  className="text-gray-600 dark:text-gray-400"
                />
                <YAxis className="text-gray-600 dark:text-gray-400" />

                <Bar
                  dataKey="hours"
                  fill="url(#colorGradient)"
                  radius={[8, 8, 0, 0]}
                />
                <defs>
                  <linearGradient
                    id="colorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Pie Chart - Subject Distribution */}
          <div className="rounded-xl border border-gray-200 bg-(--white) p-6 transition-colors duration-150 dark:border-gray-700">
            <h2 className="mb-4 text-gray-900 dark:text-white">
              Subject Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subjectDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {subjectDistributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
