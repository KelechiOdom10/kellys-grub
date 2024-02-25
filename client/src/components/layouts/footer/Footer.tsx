import { Logo } from "~/components/ui/logo";
import { companySection, contactSectionFooter, openingHoursSection, socialLinksFooter } from "./data";
import { Link } from "@tanstack/react-router";
import { buttonStyles } from "~/components/ui/button/Button";

export const Footer = () => {
  return (
    <footer className="bg-neutral-600 py-8">
      <div className="container grid grid-cols-1 gap-x-4 gap-y-6 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="flex flex-col items-start space-y-5">
          <Logo className="h-16 md:h-20" />
          <div className="flex space-x-3">
            {socialLinksFooter.map((link) => (
              <a
                key={link.name}
                className={buttonStyles({
                  intent: "ghost",
                  size: "icon",
                  class: "hover:bg-neutral-900",
                })}
                target="_blank"
                rel="noopener noreferrer"
                href={link.href}
              >
                <link.icon className="scale-110" />
              </a>
            ))}
          </div>
          <p className="hidden w-11/12 text-gray-500 md:block">{`© Kelly's Grub | ${new Date().getFullYear()}. All rights reserved`}</p>
        </div>
        <div className="flex-col items-start space-y-3">
          <h3 className="text-lg font-bold md:text-xl">{companySection.title}</h3>
          <div className="flex flex-col space-y-2">
            {companySection.links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm text-gray-600 hover:underline md:text-base"
                search={{}}
                params={{}}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex-col items-start space-y-3">
          <h3 className="text-lg font-bold md:text-xl">{openingHoursSection.title}</h3>
          <div className="flex flex-col space-y-2">
            {openingHoursSection.data.map((openingHour) => (
              <p key={openingHour} className="text-sm text-gray-600 md:text-base">
                {openingHour}
              </p>
            ))}
          </div>
        </div>
        <div className="flex-col items-start space-y-3">
          <h3 className="text-lg font-bold md:text-xl">{contactSectionFooter.title}</h3>
          <div className="flex flex-col space-y-2">
            {contactSectionFooter.data.map((contactDetails) => (
              <p key={contactDetails} className="text-sm text-gray-600 md:text-base">
                {contactDetails}
              </p>
            ))}
          </div>
          <p className="block w-11/12 text-gray-500 md:hidden">{`© Kelly's Grub | ${new Date().getFullYear()}. All rights reserved`}</p>
        </div>
      </div>
    </footer>
  );
};
