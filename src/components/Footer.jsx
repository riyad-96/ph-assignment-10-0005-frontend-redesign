import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from './header/Logo';
import { FacebookIcon, InstagramIcon, LinkedInIcon, XIcon } from './Svgs';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-(--white) px-4 transition-colors duration-150 dark:border-gray-800">
      <div className="mx-auto max-w-360 py-12">
        {/* Main Footer Content */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-3 lg:col-span-1">
            <Logo
              onClick={() => {
                document
                  .querySelector('.scroll-top')
                  .scrollIntoView({ block: 'start', behavior: 'smooth' });
              }}
            />
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              A platform where learners can easily find, connect, and
              collaborate with StudyMates online. Build knowledge together,
              anytime, anywhere.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-medium">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/partners"
                  className="text-sm text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                >
                  Find Partners
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="text-sm text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 font-medium">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-medium">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:support@studymate.com"
                  className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                >
                  <Mail size={16} className="flex-shrink-0" />
                  <span>support@studymate.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                >
                  <Phone size={16} className="flex-shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                  <span>
                    123 Learning Street
                    <br />
                    Education City, EC 12345
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-200 transition-colors duration-150 dark:border-gray-800"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
          {/* Copyright */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()}{' '}
            <a
              className="font-semibold pointer-fine:hover:underline"
              href="https://github.com/riyad-96"
              target="_blank"
              rel="noopener noreferrer"
            >
              Riyad
            </a>
            . All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex-1">
            <div className="flex w-fit items-center md:h-full md:w-full md:justify-end">
              <div className="relative flex items-center gap-1 rounded-md py-2 text-sm md:py-1 pointer-fine:px-2 pointer-fine:hover:bg-zinc-500/10 pointer-fine:hover:text-indigo-600 pointer-fine:dark:hover:text-indigo-400">
                <span className="grid">
                  <FacebookIcon size="20" />
                </span>
                <span>Facebook</span>
                <a
                  className="absolute inset-0"
                  href="https://www.facebook.com/"
                  target="_blank"
                ></a>
              </div>

              <div className="relative flex items-center gap-1 rounded-md py-2 text-sm md:py-1 pointer-fine:px-2 pointer-fine:hover:bg-zinc-500/10 pointer-fine:hover:text-indigo-600 pointer-fine:dark:hover:text-indigo-400">
                <span className="grid">
                  <XIcon size="20" />
                </span>
                <span>X</span>
                <a
                  className="absolute inset-0"
                  href="https://x.com/"
                  target="_blank"
                ></a>
              </div>

              <div className="relative flex items-center gap-1 rounded-md py-2 text-sm md:py-1 pointer-fine:px-2 pointer-fine:hover:bg-zinc-500/10 pointer-fine:hover:text-indigo-600 pointer-fine:dark:hover:text-indigo-400">
                <span className="grid">
                  <LinkedInIcon size="20" />
                </span>
                <span>LinkedIn</span>
                <a
                  className="absolute inset-0"
                  href="https://www.linkedin.com/"
                  target="_blank"
                ></a>
              </div>

              <div className="relative flex items-center gap-1 rounded-md py-2 text-sm md:py-1 pointer-fine:px-2 pointer-fine:hover:bg-zinc-500/10 pointer-fine:hover:text-indigo-600 pointer-fine:dark:hover:text-indigo-400">
                <span className="grid">
                  <InstagramIcon size="20" />
                </span>
                <span>Instagram</span>
                <a
                  className="absolute inset-0"
                  href="https://www.instagram.com/"
                  target="_blank"
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
