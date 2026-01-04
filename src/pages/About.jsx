import { Heart, Target, Users, Zap } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen px-2 py-12 md:px-3">
      <div className="mx-auto max-w-360">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-xl font-medium md:text-2xl">
            About StudyMate
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Empowering students to learn together and achieve more
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-12 rounded-xl border border-gray-200 bg-(--white) p-8 transition-colors duration-150 dark:border-gray-700">
          <div className="mb-6 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900">
              <Heart className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <h2 className="mb-4 text-center">Our Mission</h2>
          <p className="text-center text-gray-600 dark:text-gray-400">
            At StudyMate, we believe that learning is better together. Our
            mission is to connect students from around the world, creating a
            supportive community where everyone can find the perfect study
            partner to help them achieve their academic goals.
          </p>
        </div>

        {/* Values Grid */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-(--white) p-6 transition-colors duration-150 dark:border-gray-700">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900">
              <Target className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="mb-2 font-medium">Focused Learning</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              We help students stay focused and motivated by connecting them
              with partners who share their academic interests.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-(--white) p-6 transition-colors duration-150 dark:border-gray-700">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900">
              <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="mb-2 font-medium">Community First</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Building a supportive community where students can learn from each
              other and grow together.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-(--white) p-6 transition-colors duration-150 dark:border-gray-700">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900">
              <Zap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="mb-2 font-medium">Fast Matching</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Our smart algorithm quickly connects you with compatible study
              partners based on your preferences.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="mb-12 rounded-xl border border-gray-200 bg-(--white) p-8 transition-colors duration-150 dark:border-gray-700">
          <h2 className="mb-4">Our Story</h2>
          <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
            <p>
              StudyMate was founded in 2024 by a group of students who
              recognized the power of collaborative learning. We struggled to
              find study partners who matched our schedule, subjects, and
              learning style. That's when we decided to create a platform that
              would make it easy for students to connect.
            </p>
            <p>
              Today, StudyMate has helped thousands of students find their
              perfect study partners, leading to improved grades, better
              understanding of complex topics, and lasting friendships.
            </p>
            <p>
              We're constantly working to improve our platform and add new
              features that help students learn more effectively together.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-linear-to-br from-indigo-50 to-purple-50 p-6 text-center dark:border-gray-700 dark:from-indigo-950 dark:to-purple-950">
            <p className="mb-2 text-4xl font-bold text-indigo-600 dark:text-indigo-400">
              10,000+
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Active Students
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-linear-to-br from-indigo-50 to-purple-50 p-6 text-center dark:border-gray-700 dark:from-indigo-950 dark:to-purple-950">
            <p className="mb-2 text-4xl font-bold text-indigo-600 dark:text-indigo-400">
              50,000+
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Study Sessions
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-linear-to-br from-indigo-50 to-purple-50 p-6 text-center dark:border-gray-700 dark:from-indigo-950 dark:to-purple-950">
            <p className="mb-2 text-4xl font-bold text-indigo-600 dark:text-indigo-400">
              95%
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Satisfaction Rate
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="rounded-xl border border-gray-200 bg-(--white) p-8 transition-colors duration-150 dark:border-gray-700">
          <h2 className="mb-6 text-center">Our Team</h2>
          <p className="mb-8 text-center text-sm text-gray-600 dark:text-gray-400">
            We're a passionate team of educators, developers, and designers
            dedicated to making learning more collaborative and enjoyable.
          </p>
          <div className="text-center">
            <a
              href="/support"
              className="inline-flex rounded-lg bg-linear-to-br from-indigo-600 to-purple-600 px-6 py-3 font-medium text-white shadow-lg transition-all hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl dark:from-indigo-500 dark:to-purple-500"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
