import { Link } from "@tanstack/react-router";
import { Menu } from "~/components/icons/Menu";
import { Search } from "~/components/icons/Search";
import { ShoppingCart } from "~/components/icons/ShoppingCart";
import { Button } from "~/components/ui/button";
import { Indicator } from "~/components/ui/indicator";
import { LogoWithText } from "~/components/ui/logo";
import { navigationLinks } from "./data";
import { ChevronDown } from "~/components/icons/ChevronDown";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

export const Navbar = () => {
  return (
    <nav className="container flex items-center justify-between py-4 px-4 md:px-0">
      <Button size="icon" intent="ghost" rightIcon={<Menu className="h-6 w-6 font-bold" />} className="lg:hidden" />
      <Link to="/" className="ml-4">
        <LogoWithText className="h-10 sm:h-14" />
      </Link>

      <div className="hidden items-center lg:flex">
        {navigationLinks.map((link) => {
          if (link.name === "Categories") {
            return (
              <Popover key={link.name}>
                <>
                  <Popover.Button
                    as={Button}
                    intent="ghost"
                    size="sm"
                    className="inline-flex items-center border-none py-2 px-2 text-[15px] font-bold focus:ring-dark focus:ring-offset-0"
                    leftIcon={link.icon && <link.icon className="h-4.5 w-4.5 -mr-1" />}
                  >
                    {link.name}
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="lg:max-w-l absolute left-1/2 z-10 mt-3 w-screen max-w-2xl -translate-x-1/2 transform border-[0.5px] px-4 sm:px-0">
                      <div className="overflow-hidden rounded-lg shadow-md">
                        <div className="relative grid gap-8 bg-neutral-300 p-7 lg:grid-cols-2">
                          {link.children &&
                            link.children.map((item) => (
                              <Link
                                key={item.name}
                                to={item.href}
                                params={{}}
                                search={{}}
                                className="focus-visible:ring-orange-500 -m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-550 focus:outline-none focus-visible:ring focus-visible:ring-opacity-50 "
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  loading="lazy"
                                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border object-cover text-white sm:h-12 sm:w-12"
                                />
                                <div className="ml-4">
                                  <p className="text-sm font-bold">{item.name}</p>
                                  <p className="text-xs text-gray-500">{item.description}</p>
                                </div>
                              </Link>
                            ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              </Popover>
            );
          }

          return (
            <Link
              key={link.name}
              to={link.href}
              className="flex items-center rounded-md py-0.5 px-2 text-[15px] font-bold"
              params={{}}
              search={{}}
            >
              {link.icon && <link.icon className="mr-2 h-5 w-5" />}
              {link.name}
              {link.children && (
                <Button size="icon" intent="ghost" rightIcon={<ChevronDown className="w-4" />} className="self-end" />
              )}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center space-x-4">
        <Button size="icon" intent="ghost" rightIcon={<Search className="h-5 w-5 font-bold" />} />
        <Button as="link" size="sm" intent="dark" to="/login" className="hidden sm:block">
          Login
        </Button>
        <Indicator label={1} color="dark">
          <Button size="icon" intent="white" rightIcon={<ShoppingCart />} />
        </Indicator>
      </div>
    </nav>
  );
};
