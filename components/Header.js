import { useState } from 'react'
import { Transition, Menu } from '@headlessui/react'
import NextLink from 'next/link'
import React from 'react'

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  return (
    <div className="sticky top-0 z-50 pt-4 mx-auto max-w-7xl bg-gradient-to-b from-eigengrau">
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
            className="inline-flex items-center justify-center p-2 bg-gray-900 bg-opacity-10 rounded-md text-accent hover:text-white hover:bg-gray-800 focus:outline-none"
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
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
                  <svg
                    className="w-5 h-5 ml-2 text-gray-400 group-hover:text-accent"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
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
                        <div className="relative px-8 py-8 bg-gray-900 grid gap-8">
                          <Menu.Item>
                            {({ active }) => (
                              <NextLink href="/biography">
                                <span className="flex items-start p-3 -m-3 rounded-lg cursor-pointer hover:bg-gray-800">
                                  <svg
                                    className="flex-shrink-0 w-6 h-6 text-accent"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-white">
                                      About me
                                    </p>
                                    <p className="mt-1 text-sm text-gray-200">
                                      Biography and achievements
                                    </p>
                                  </div>
                                </span>
                              </NextLink>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="https://archive.jpvalery.photo"
                                target="_blank"
                                className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-800"
                              >
                                <svg
                                  className="flex-shrink-0 w-6 h-6 text-accent"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"
                                  />
                                </svg>
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
                                <svg
                                  className="flex-shrink-0 w-6 h-6 text-accent"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                  />
                                </svg>
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
                            <div className="px-5 py-5 bg-gray-800 hover:bg-gray-700 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                              <div className="w-full flow-root">
                                <a
                                  href="https://contact.jpvalery.me/photography"
                                  className="flex items-center p-3 -m-3 text-base font-medium text-white rounded-md"
                                >
                                  <svg
                                    className="flex-shrink-0 w-6 h-6 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
                                    />
                                  </svg>
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
            className="absolute inset-x-0 p-2 top-5 transition transform origin-top-right md:hidden"
          >
            <div className="bg-gray-900 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-y-2 divide-gray-50">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div></div>

                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={() => setIsMobileOpen(!isMobileOpen)}
                      className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-900 rounded-md hover:text-accent hover:bg-gray-100 focus:outline-none"
                    >
                      <span className="sr-only">Close menu</span>
                      <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    <NextLink href="/featured-shots">
                      <span className="flex items-center p-3 -m-3 cursor-pointer rounded-md hover:bg-gray-800">
                        <svg
                          className="flex-shrink-0 w-6 h-6 text-accent"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="ml-3 text-base font-medium text-white">
                          Portfolio
                        </span>
                      </span>
                    </NextLink>

                    <a
                      href="https://archive.jpvalery.photo"
                      target="_blank"
                      className="flex items-center p-3 -m-3 rounded-md hover:bg-gray-800"
                    >
                      <svg
                        className="flex-shrink-0 w-6 h-6 text-accent"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"
                        />
                      </svg>
                      <span className="inline-flex ml-3 text-base font-medium text-white">
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
                      </span>
                    </a>

                    <NextLink href="/about">
                      <span className="flex items-center p-3 -m-3 cursor-pointer rounded-md hover:bg-gray-800">
                        <svg
                          className="flex-shrink-0 w-6 h-6 text-accent"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="ml-3 text-base font-medium text-white">
                          About me
                        </span>
                      </span>
                    </NextLink>

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
                      <span className="inline-flex ml-3 text-base font-medium text-white">
                        Unsplash
                        <svg
                          className="w-4 h-4 mt-1 ml-2 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
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
                        <svg
                          className="flex-shrink-0 w-6 h-6 text-accent"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
                          />
                        </svg>
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
