import { useState } from 'react'
import { Transition, Menu } from '@headlessui/react'
import NextLink from 'next/link'
import React from 'react'
import Unsplash from '../elements/icons/Unsplash'
import { ExternalLinkIcon, ChevronDownIcon } from '@heroicons/react/solid'
import {
  CameraIcon,
  RssIcon,
  UserCircleIcon,
  UserGroupIcon,
  InboxInIcon,
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline'

function Mlink(props) {
  let { href, children, ...rest } = props
  return (
    <NextLink href={href}>
      <a {...rest}>{children}</a>
    </NextLink>
  )
}

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  return (
    <div className="sticky top-0 z-100 mx-auto max-w-7xl bg-gradient-to-b from-eigengrau pt-4">
      <div className="flex items-center justify-between py-6">
        <NextLink href="/">
          <span className="cursor-pointer font-mono text-xl font-black">
            JP VALERY
          </span>
        </NextLink>

        <div className="-my-2 -mr-2 md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="inline-flex items-center justify-center rounded-md bg-gray-900 bg-opacity-10 p-2 text-accent hover:bg-gray-800 hover:text-white focus:outline-none"
          >
            <span className="sr-only">Open menu</span>
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="hidden md:flex">
          <NextLink href="/featured-shots">
            <span className="group ml-4 inline-flex cursor-pointer items-center text-base font-medium text-gray-400 outline-none hover:text-accent">
              Portfolio
            </span>
          </NextLink>
          <Menu>
            {({ open }) => (
              <>
                <Menu.Button className="group ml-4 inline-flex items-center text-base font-medium text-gray-400 outline-none hover:text-accent focus:outline-none">
                  <span>More</span>
                  <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400 group-hover:text-accent" />
                </Menu.Button>
                <Transition
                  show={open}
                  enter="transition ease-out duration-80 transform"
                  enterFrom="opacity-0 scale-90"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-80transform"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-90"
                >
                  <Menu.Items static as={React.Fragment}>
                    <div className="absolute z-50 mt-12 -ml-menu outline-none">
                      <div className="w-screen max-w-md overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-8 bg-gray-900 px-8 py-8">
                          <Menu.Item>
                            {({ active }) => (
                              <Mlink href="/biography">
                                <span className="-m-3 flex cursor-pointer items-start rounded-lg p-3 hover:bg-gray-800">
                                  <UserCircleIcon className="h-6 w-6 flex-shrink-0 text-accent" />
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-white">
                                      About me
                                    </p>
                                    <p className="mt-1 text-sm text-gray-200">
                                      Biography and achievements
                                    </p>
                                  </div>
                                </span>
                              </Mlink>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="https://archive.jpvalery.photo"
                                target="_blank"
                                className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-800"
                              >
                                <RssIcon className="h-6 w-6 flex-shrink-0 text-accent" />
                                <div className="ml-4">
                                  <p className="inline-flex text-base font-medium text-white">
                                    Photo Archive
                                    <svg
                                      className="mt-1 ml-2 h-4 w-4 text-gray-500"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                    </svg>
                                  </p>
                                  <p className="mt-1 text-sm text-gray-200">
                                    An unfiltered stream of all my photos
                                  </p>
                                </div>
                              </a>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="https://montrealphoto.club"
                                target="_blank"
                                className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-800"
                              >
                                <UserGroupIcon className="h-6 w-6 flex-shrink-0 text-accent" />
                                <div className="ml-4">
                                  <p className="inline-flex text-base font-medium text-white">
                                    Montréal Photo Club
                                    <svg
                                      className="mt-1 ml-2 h-4 w-4 text-gray-500"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                    </svg>
                                  </p>
                                  <p className="mt-1 text-sm text-gray-200">
                                    I founded a Photo Club in Montréal in 2019
                                  </p>
                                </div>
                              </a>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="https://unsplash.com/@jpvalery"
                                target="_blank"
                                className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-800"
                              >
                                <svg
                                  className="h-6 w-6 flex-shrink-0 text-accent"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  aria-hidden="true"
                                >
                                  <path d="M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z" />
                                </svg>
                                <div className="ml-4">
                                  <p className="inline-flex text-base font-medium text-white">
                                    Unsplash
                                    <div className="mt-1 ml-2 h-4 w-4 text-gray-500">
                                      <svg
                                        className="mt-1 ml-2 h-4 w-4 text-gray-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                      </svg>
                                    </div>
                                  </p>
                                  <p className="mt-1 text-sm text-gray-200">
                                    I share hundreds of photos for free on
                                    Unsplash
                                  </p>
                                </div>
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                        <Menu.Item>
                          {({ active }) => (
                            <div className="space-y-6 bg-gray-800 px-5 py-5 hover:bg-gray-700 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                              <div className="flow-root w-full">
                                <a
                                  href="https://contact.jpvalery.me/photography"
                                  className="-m-3 flex items-center rounded-md p-3 text-base font-medium text-white"
                                >
                                  <InboxInIcon className="h-6 w-6 flex-shrink-0 text-gray-400" />
                                  <span className="ml-3">
                                    Get in touch about my photography
                                  </span>
                                </a>
                              </div>
                            </div>
                          )}
                        </Menu.Item>
                      </div>
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </div>
      </div>

      <Transition
        show={isMobileOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div
            ref={ref}
            className="absolute inset-x-0 top-5 z-100 origin-top-right transform p-2 transition md:hidden"
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="relative p-5">
                <div className="absolute top-2 right-2">
                  <button
                    type="button"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="inline-flex items-center justify-center rounded-md bg-gray-900 p-2 text-gray-400 hover:bg-gray-800 hover:text-accent focus:outline-none"
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="w-11/12">
                  <nav className="grid gap-y-8">
                    <Mlink href="/featured-shots">
                      <span className="-m-3 flex cursor-pointer items-center rounded-md p-3 hover:bg-gray-800">
                        <CameraIcon className="h-6 w-6 flex-shrink-0 text-accent" />
                        <span className="ml-3 text-base font-medium text-white">
                          Portfolio
                        </span>
                      </span>
                    </Mlink>

                    <a
                      href="https://archive.jpvalery.photo"
                      target="_blank"
                      className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-800"
                    >
                      <RssIcon className="h-6 w-6 flex-shrink-0 text-accent" />
                      <span className="ml-3 inline-flex text-base font-medium text-white">
                        Photo Archive
                        <ExternalLinkIcon className="mt-1 ml-2 h-4 w-4 text-gray-500" />
                      </span>
                    </a>

                    <Mlink href="/about">
                      <span className="-m-3 flex cursor-pointer items-center rounded-md p-3 hover:bg-gray-800">
                        <UserCircleIcon className="h-6 w-6 flex-shrink-0 text-accent" />
                        <span className="ml-3 text-base font-medium text-white">
                          About me
                        </span>
                      </span>
                    </Mlink>

                    <a
                      href="https://unsplash.com/@jpvalery"
                      target="_blank"
                      className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-800"
                    >
                      <div className="h-6 w-6 flex-shrink-0 text-accent">
                        <Unsplash />
                      </div>
                      <span className="ml-3 inline-flex text-base font-medium text-white">
                        Unsplash
                        <ExternalLinkIcon className="mt-1 ml-2 h-4 w-4 text-gray-500" />
                      </span>
                    </a>

                    <a
                      href="https://contact.jpvalery.me/photography"
                      className="cursor-pointer"
                    >
                      <span
                        href="#"
                        className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-800"
                      >
                        <InboxInIcon className="h-6 w-6 flex-shrink-0 text-accent" />
                        <span className="ml-3 text-base font-medium text-white">
                          Get in touch
                        </span>
                      </span>
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </div>
  )
}
