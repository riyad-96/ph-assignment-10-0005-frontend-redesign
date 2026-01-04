import { Mail, MessageSquare, Phone } from 'lucide-react';
import { toast } from 'kitzo';

export default function Support() {
  return (
    <div className="min-h-screen px-2 py-12 md:px-3">
      <div className="mx-auto max-w-360">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-xl font-medium md:text-2xl">Support</h1>
          <p className="text-gray-600 dark:text-gray-400">
            We're here to help! Get in touch with us.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-(--white) p-6 text-center transition-colors duration-150 dark:border-gray-700">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900">
              <Mail className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="mb-2 font-medium">Email</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              support@studymate.com
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-(--white) p-6 text-center transition-colors duration-150 dark:border-gray-700">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900">
              <MessageSquare className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="mb-2 font-medium">Live Chat</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Available 24/7
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-(--white) p-6 text-center transition-colors duration-150 dark:border-gray-700">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900">
              <Phone className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="mb-2 font-medium">Phone</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              +1 (555) 123-4567
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="rounded-xl border border-gray-200 bg-(--white) p-8 transition-colors duration-150 dark:border-gray-700">
          <h2 className="mb-6">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="mb-2 font-medium">
                How do I find a study partner?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Navigate to the "Find Partners" page and use our filters to
                search for partners based on subject, availability, and study
                mode. Once you find someone, send them a partner request!
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-medium">Is StudyMate free to use?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Yes! StudyMate is completely free. We believe in making quality
                education accessible to everyone.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-medium">How do I update my profile?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Go to your Dashboard and click on "Profile" in the sidebar. From
                there, you can update your name, profile image, and other
                information.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-medium">
                Can I study with multiple partners?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Absolutely! You can connect with as many study partners as you'd
                like. We encourage building a diverse learning community.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-12 rounded-xl border border-gray-200 bg-(--white) p-8 transition-colors duration-150 dark:border-gray-700">
          <h2 className="mb-6">Send us a message</h2>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-700"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-700"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-700"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button
              type="reset"
              onClick={() => toast.success('Message sent!')}
              className="w-full rounded-lg bg-linear-to-br from-indigo-600 to-purple-600 px-6 py-3 font-medium text-white shadow-lg transition-all hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl dark:from-indigo-500 dark:to-purple-500"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
