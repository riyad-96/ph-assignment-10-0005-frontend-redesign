import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../ui/accordion';

export default function FAQSection() {
  const faqs = [
    {
      question: 'Is this free?',
      answer:
        'Yes! Our platform is completely free to use. You can join study groups, connect with peers, and access all our features without any cost.',
    },
    {
      question: 'How do I report a user?',
      answer:
        "If you encounter inappropriate behavior, click on the user's profile and select 'Report User' from the menu. Our moderation team will review all reports within 24 hours.",
    },
    {
      question: 'Can I join multiple study groups?',
      answer:
        'Absolutely! You can join as many study groups as you like. We recommend starting with 2-3 groups to maintain a manageable schedule and stay engaged.',
    },
    {
      question: 'How do I create my own study group?',
      answer:
        "Click the 'Create Group' button from your dashboard, choose your subject, set a schedule, and invite your peers. You can customize group settings and add a description to help others find you.",
    },
    {
      question: "What if I can't find a group for my subject?",
      answer:
        "You can create a new group for any subject! If you're looking for something specific, try using our search filters or post in the community board to find interested students.",
    },
    {
      question: 'How do I change my notification settings?',
      answer:
        'Go to Settings > Notifications to customize what alerts you receive. You can control notifications for new messages, group invites, study reminders, and more.',
    },
  ];

  return (
    <section>
      <div>
        {/* Section Header */}
        <div className="mb-12 space-y-4 text-center">
          <h2 className="pl-1 text-lg font-medium md:text-2xl">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Got questions? We've got answers. Find everything you need to know
            about our platform.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="mx-auto max-w-5xl">
          <div className="rounded-xl border border-gray-200 bg-(--white) p-6 transition-colors duration-150 dark:border-gray-700">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-gray-200 dark:border-gray-700"
                >
                  <AccordionTrigger className="text-gray-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
