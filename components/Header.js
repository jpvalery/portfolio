import React from 'react'

import Link from 'next/link'

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from '@headlessui/react'

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/16/solid'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {
  Camera,
  FilmStrip,
  Mailbox,
  UserCircleCheck,
  UsersThree,
} from '@phosphor-icons/react'
import Unsplash from '../elements/icons/Unsplash'

function MenuItemTexts({ title, external, description }) {
  return (
    <>
      <div className="grid grid-flow-col justify-between items-center w-full">
        <div className="grid grid-flow-row gap">
          <span>{title}</span>
          <span className="max-w-72">{description}</span>
        </div>

        <kbd className="hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
          {external && <ArrowTopRightOnSquareIcon className="size-4" />}
        </kbd>
      </div>
    </>
  )
}

export default function Header() {
  return (
    <div className="sticky top-0 z-50 bg-gradient-to-b from-stone-900 pb-4 pt-0 md:pt-4">
      <div className="mx-auto max-w-4xl text-stone-300">
        <div className="flex items-center justify-between py-4 px-4 md:px-0">
          <div className="cursor-pointer font-mono text-xl font-black uppercase">
            <Link href="/">JP VALERY</Link>
          </div>
          <Menu className="z-100" as="div">
            <MenuButton className="inline-flex items-center justify-between gap-2 rounded-md py-1.5 pl-4 pr-2 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-stone-800 data-[open]:bg-stone-800 data-[focus]:outline-1 data-[focus]:outline-white">
              Explore
              <ChevronDownIcon className="size-4 fill-white/60" />
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom end"
              className="z-100 w-[30rem] space-y-2 mt-2 origin-top-right rounded-xl border border-white/5 bg-stone-900 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              <MenuItem>
                <Link
                  href="/biography"
                  className="group flex w-full items-center gap-6 rounded-lg py-1.5 px-3 data-[focus]:bg-stone-200/10"
                >
                  <UserCircleCheck className="size-10 fill-stone-100/50 group-hover:fill-stone-100/90" />
                  <MenuItemTexts
                    title="About me"
                    description="Biography, achievements, and media coverage"
                  />
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  href="/featured-shots"
                  className="group flex w-full items-center gap-6 rounded-lg py-1.5 px-3 data-[focus]:bg-stone-200/10"
                >
                  <Camera className="size-10 fill-stone-100/50 group-hover:fill-stone-100/90" />
                  <MenuItemTexts
                    title="Portfolio"
                    description="My photography portfolio"
                  />
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  href="https://archive.jpvalery.photo"
                  className="group flex w-full items-center gap-6 rounded-lg py-1.5 px-3 data-[focus]:bg-stone-200/10"
                >
                  <FilmStrip className="size-10 fill-stone-100/50 group-hover:fill-stone-100/90" />
                  <MenuItemTexts
                    title="Contact Sheets"
                    description="An unfiltered stream of all my photos"
                    external
                  />
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  href="https://montrealphoto.club"
                  className="group flex w-full items-center gap-6 rounded-lg py-1.5 px-3 data-[focus]:bg-stone-200/10"
                >
                  <UsersThree className="size-10 fill-stone-100/50 group-hover:fill-stone-100/90" />
                  <MenuItemTexts
                    title="Montréal Photo Club"
                    description="I founded a Photo Club in Montréal in 2019"
                    external
                  />
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  href="https://unsplash.com/@jpvalery"
                  className="group flex w-full items-center gap-6 rounded-lg py-1.5 px-3 data-[focus]:bg-stone-200/10"
                >
                  <span className="size-10 text-stone-100/50 group-hover:text-stone-100/90">
                    <Unsplash />
                  </span>
                  <MenuItemTexts
                    title="Unsplash"
                    description="Where I share hundreds of photos for free"
                    external
                  />
                </Link>
              </MenuItem>
              <MenuSeparator className="my-3 mx-6 h-px bg-stone-100/5" />
              <MenuItem>
                <Link
                  href="https://jpvalery.me/contact/photography"
                  className="group flex w-full items-center gap-6 rounded-lg py-1.5 px-3 data-[focus]:bg-green-500/20"
                >
                  <Mailbox className="size-10 fill-stone-100/50 group-hover:fill-stone-100/90" />
                  <MenuItemTexts
                    title="Get in touch about my photography"
                    description=""
                    external
                  />
                </Link>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  )
}
