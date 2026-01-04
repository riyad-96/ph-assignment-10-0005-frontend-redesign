import { toast } from 'kitzo';
import { Mail } from 'lucide-react';
import { useRef } from 'react';

export default function NewsletterSection() {
  const inputRef = useRef(null);

  return (
    <section>
      <div>
        {/* Section Header */}
        <div className="mb-12 space-y-4 text-center">
          <h2 className="pl-1 text-lg font-medium md:text-2xl">
            Join our community
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Get weekly study tips, productivity hacks, and exclusive resources
            delivered to your inbox.
          </p>
        </div>

        {/* Newsletter Form */}
        <div className="mx-auto max-w-md">
          <div className="rounded-xl border border-gray-200 bg-(--white) p-8 transition-all duration-150 hover:border-indigo-300 dark:border-gray-700 dark:hover:border-indigo-500">
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900">
                <Mail className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>

            {/* Form */}
            <form className="space-y-4">
              <input
                ref={inputRef}
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-400"
              />
              <button
                onClick={() => {
                  const inputValue = inputRef.current.value;
                  if (!inputValue) {
                    toast.error('Enter a email address', {
                      duration: 3500,
                    });
                    inputRef.current.focus();
                    return;
                  }

                  const savedEmails = JSON.parse(
                    localStorage.getItem('emails') || '[]',
                  );

                  if (savedEmails.includes(inputValue)) {
                    toast.info('You are already subscribed', {
                      duration: 3500,
                    });
                    inputRef.current.focus();
                  } else {
                    savedEmails.push(inputValue);
                    localStorage.setItem('emails', JSON.stringify(savedEmails));
                    toast.success('Successfully subscribed!', {
                      duration: 3500,
                    });
                    inputRef.current.value = '';
                  }
                }}
                type="button"
                className="w-full rounded-lg bg-linear-to-br from-indigo-600 to-purple-600 px-6 py-3 text-white transition-all duration-150 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600"
              >
                Subscribe
              </button>
            </form>

            {/* Privacy Note */}
            <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-500">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
