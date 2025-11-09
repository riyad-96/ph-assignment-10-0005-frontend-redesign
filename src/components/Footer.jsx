import Logo from './header/Logo';
import { FacebookIcon, InstagramIcon, LinkedInIcon, XIcon } from './Svgs';

function Footer() {
  return (
    <footer className="bg-(--header-bg) px-2 py-8 md:px-3">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-md:space-y-6 md:flex md:gap-4">
          <div className="flex-1">
            <Logo />
            <p className="max-w-md leading-5 font-light tracking-wide">
              A platform where learners can easily find, connect, and
              collaborate with study partners online. Build knowledge together,
              anytime, anywhere.
            </p>
          </div>

          <div className="flex-1">
            <div className="w-fit md:flex md:h-full md:w-full md:items-center md:justify-center">
              <div className="relative flex items-center gap-1 rounded-md py-0.5 md:py-1 pointer-fine:px-2 pointer-fine:hover:bg-zinc-500/10">
                <span className="grid">
                  <FacebookIcon size="24" />
                </span>
                <span className="font-medium">Facebook</span>
                <a
                  className="absolute inset-0"
                  href="https://www.facebook.com/"
                  target="_blank"
                ></a>
              </div>

              <div className="relative flex items-center gap-1 rounded-md py-0.5 md:py-1 pointer-fine:px-2 pointer-fine:hover:bg-zinc-500/10">
                <span className="grid">
                  <XIcon size="24" />
                </span>
                <span className="font-medium">X</span>
                <a
                  className="absolute inset-0"
                  href="https://x.com/"
                  target="_blank"
                ></a>
              </div>

              <div className="relative flex items-center gap-1 rounded-md py-0.5 md:py-1 pointer-fine:px-2 pointer-fine:hover:bg-zinc-500/10">
                <span className="grid">
                  <LinkedInIcon size="24" />
                </span>
                <span className="font-medium">LinkedIn</span>
                <a
                  className="absolute inset-0"
                  href="https://www.linkedin.com/"
                  target="_blank"
                ></a>
              </div>

              <div className="relative flex items-center gap-1 rounded-md py-0.5 md:py-1 pointer-fine:px-2 pointer-fine:hover:bg-zinc-500/10">
                <span className="grid">
                  <InstagramIcon size="24" />
                </span>
                <span className="font-medium">Instagram</span>
                <a
                  className="absolute inset-0"
                  href="https://www.instagram.com/"
                  target="_blank"
                ></a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 text-center text-sm font-light">
          <p>
            © 2025{' '}
            <a
              className="font-medium pointer-fine:hover:underline"
              href="https://github.com/riyad-96"
              target="_blank"
            >
              Riyad
            </a>
            . All rights reserved{' '}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
