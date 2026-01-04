import { Shield, Lock, Eye, Database } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen px-2 py-12 md:px-3">
      <div className="mx-auto max-w-360">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-xl font-medium md:text-2xl">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your privacy is important to us. Last updated: January 3, 2026
          </p>
        </div>

        {/* Privacy Features */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-(--white) p-6 text-center transition-colors duration-150 dark:border-gray-700">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900">
              <Shield className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="font-medium">Secure</h3>
          </div>

          <div className="rounded-xl border border-gray-200 bg-(--white) p-6 text-center transition-colors duration-150 dark:border-gray-700">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900">
              <Lock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="font-medium">Encrypted</h3>
          </div>

          <div className="rounded-xl border border-gray-200 bg-(--white) p-6 text-center transition-colors duration-150 dark:border-gray-700">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900">
              <Eye className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="font-medium">Transparent</h3>
          </div>

          <div className="rounded-xl border border-gray-200 bg-(--white) p-6 text-center transition-colors duration-150 dark:border-gray-700">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900">
              <Database className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="font-medium">Protected</h3>
          </div>
        </div>

        {/* Privacy Content */}
        <div className="space-y-8">
          <div className="rounded-xl border border-gray-200 bg-(--white) p-8 transition-colors duration-150 dark:border-gray-700">
            <h2 className="mb-4">Information We Collect</h2>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <p>
                We collect information that you provide directly to us when you
                create an account, update your profile, or interact with other
                users on StudyMate.
              </p>
              <ul className="list-inside list-disc space-y-2 pl-4">
                <li>Name and email address</li>
                <li>Profile photo</li>
                <li>Study preferences and availability</li>
                <li>Messages and interactions with study partners</li>
              </ul>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-(--white) p-8 transition-colors duration-150 dark:border-gray-700">
            <h2 className="mb-4">How We Use Your Information</h2>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <p>
                We use the information we collect to provide, maintain, and
                improve our services. This includes:
              </p>
              <ul className="list-inside list-disc space-y-2 pl-4">
                <li>Connecting you with compatible study partners</li>
                <li>Personalizing your experience on the platform</li>
                <li>Sending you notifications about partner requests</li>
                <li>Improving our matching algorithms</li>
                <li>Ensuring the security of our platform</li>
              </ul>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-(--white) p-8 transition-colors duration-150 dark:border-gray-700">
            <h2 className="mb-4">Data Security</h2>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <p>
                We take the security of your data seriously and use
                industry-standard measures to protect your information. All data
                is encrypted in transit and at rest. We regularly review and
                update our security practices to ensure your information remains
                safe.
              </p>
              <p>
                However, no method of transmission over the Internet is 100%
                secure. While we strive to use commercially acceptable means to
                protect your personal information, we cannot guarantee its
                absolute security.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-(--white) p-8 transition-colors duration-150 dark:border-gray-700">
            <h2 className="mb-4">Your Rights</h2>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <p>You have the right to:</p>
              <ul className="list-inside list-disc space-y-2 pl-4">
                <li>Access and receive a copy of your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your account and data</li>
                <li>Object to processing of your personal data</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-(--white) p-8 transition-colors duration-150 dark:border-gray-700">
            <h2 className="mb-4">Contact Us</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              If you have any questions about this Privacy Policy, please
              contact us at{' '}
              <a
                href="mailto:privacy@studymate.com"
                className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
              >
                privacy@studymate.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
