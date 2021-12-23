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
    <div className="sticky top-0 pt-4 mx-auto z-100 max-w-7xl bg-gradient-to-b from-eigengrau">
      <div className="flex items-center justify-between py-6">
        <NextLink href="/">
          <span className="font-mono text-xl font-black cursor-pointer">
            JP VALERY
          </span>
        </NextLink>

        <div className="-my-2 -mr-2 md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="inline-flex items-center justify-center p-2 bg-gray-900 rounded-md bg-opacity-10 text-accent hover:text-white hover:bg-gray-800 focus:outline-none"
          >
            <span className="sr-only">Open menu</span>
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="hidden md:flex">
          <NextLink href="/featured-shots">
            <span className="inline-flex items-center ml-4 text-base font-medium text-gray-400 outline-none cursor-pointer group hover:text-accent">
              Portfolio
            </span>
          </NextLink>
          <Menu>
            {({ open }) => (
              <>
                <Menu.Button className="inline-flex items-center ml-4 text-base font-medium text-gray-400 outline-none group hover:text-accent focus:outline-none">
                  <span>More</span>
                  <ChevronDownIcon className="w-5 h-5 ml-2 text-gray-400 group-hover:text-accent" />
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
                    <div className="absolute z-50 mt-12 outline-none -ml-menu">
                      <div className="w-screen max-w-md overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-8 px-8 py-8 bg-gray-900">
                          <Menu.Item>
                            {({ active }) => (
                              <Mlink href="/biography">
                                <span className="flex items-start p-3 -m-3 rounded-lg cursor-pointer hover:bg-gray-800">
                                  <UserCircleIcon className="flex-shrink-0 w-6 h-6 text-accent" />
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
                                className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-800"
                              >
                                <RssIcon className="flex-shrink-0 w-6 h-6 text-accent" />
                                <div className="ml-4">
                                  <p className="inline-flex text-base font-medium text-white">
                                    Photo Archive
                                    <svg
                                      className="w-4 h-4 mt-1 ml-2 text-gray-500"
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
                                className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-800"
                              >
                                <UserGroupIcon className="flex-shrink-0 w-6 h-6 text-accent" />
                                <div className="ml-4">
                                  <p className="inline-flex text-base font-medium text-white">
                                    Montréal Photo Club
                                    <svg
                                      className="w-4 h-4 mt-1 ml-2 text-gray-500"
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
                                className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-800"
                              >
                                <svg
                                  className="flex-shrink-0 w-6 h-6 text-accent"
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
                                    <div className="w-4 h-4 mt-1 ml-2 text-gray-500">
                                      <Unsplash />
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
                            <div className="px-5 py-5 space-y-6 bg-gray-800 hover:bg-gray-700 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                              <div className="flow-root w-full">
                                <a
                                  href="https://contact.jpvalery.me/photography"
                                  className="flex items-center p-3 -m-3 text-base font-medium text-white rounded-md"
                                >
                                  <InboxInIcon className="flex-shrink-0 w-6 h-6 text-gray-400" />
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
            className="absolute inset-x-0 p-2 transition origin-top-right transform z-100 top-5 md:hidden"
          >
            <div className="bg-gray-900 divide-y-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-gray-50">
              <div className="relative p-5">
                <div className="absolute top-2 right-2">
                  <button
                    type="button"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-900 rounded-md hover:text-accent hover:bg-gray-800 focus:outline-none"
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="w-6 h-6" />
                  </button>
                </div>

                <div className="w-11/12">
                  <nav className="grid gap-y-8">
                    <Mlink href="/featured-shots">
                      <span className="flex items-center p-3 -m-3 rounded-md cursor-pointer hover:bg-gray-800">
                        <CameraIcon className="flex-shrink-0 w-6 h-6 text-accent" />
                        <span className="ml-3 text-base font-medium text-white">
                          Portfolio
                        </span>
                      </span>
                    </Mlink>

                    <a
                      href="https://archive.jpvalery.photo"
                      target="_blank"
                      className="flex items-center p-3 -m-3 rounded-md hover:bg-gray-800"
                    >
                      <RssIcon className="flex-shrink-0 w-6 h-6 text-accent" />
                      <span className="inline-flex ml-3 text-base font-medium text-white">
                        Photo Archive
                        <ExternalLinkIcon className="w-4 h-4 mt-1 ml-2 text-gray-500" />
                      </span>
                    </a>

                    <Mlink href="/about">
                      <span className="flex items-center p-3 -m-3 rounded-md cursor-pointer hover:bg-gray-800">
                        <UserCircleIcon className="flex-shrink-0 w-6 h-6 text-accent" />
                        <span className="ml-3 text-base font-medium text-white">
                          About me
                        </span>
                      </span>
                    </Mlink>

                    <a
                      href="https://unsplash.com/@jpvalery"
                      target="_blank"
                      className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-800"
                    >
                      <div className="flex-shrink-0 w-6 h-6 text-accent">
                        <Unsplash />
                      </div>
                      <span className="inline-flex ml-3 text-base font-medium text-white">
                        Unsplash
                        <ExternalLinkIcon className="w-4 h-4 mt-1 ml-2 text-gray-500" />
                      </span>
                    </a>

                    <a
                      href="https://contact.jpvalery.me/photography"
                      className="cursor-pointer"
                    >
                      <span
                        href="#"
                        className="flex items-center p-3 -m-3 rounded-md hover:bg-gray-800"
                      >
                        <InboxInIcon className="flex-shrink-0 w-6 h-6 text-accent" />
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
