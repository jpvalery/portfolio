import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import PropTypes from 'prop-types'
import React from 'react'

import Icon from '../elements/icons/Icon'

export default function Bookmark({
  title,
  description,
  icon,
  url,
  urlExternal,
  color,
}) {
  if (urlExternal == true) {
    return (
      <a href={url} target="_blank">
        <span className="flex max-w-lg cursor-pointer items-center gap-2 rounded-md px-4 py-3 shadow-md shadow-zinc-900/20 hover:bg-zinc-800/70 hover:outline hover:outline-1 hover:outline-offset-2 hover:outline-zinc-100/50">
          <span
            className={`h-10 w-10 ${
              icon == 'Growth' ? 'text-center' : ''
            } flex-shrink-0 
              ${
                color == 'slate'
                  ? 'text-slate-500 drop-shadow-[0_0_1rem_#F1F5F940]'
                  : ''
              }
              ${
                color == 'gray'
                  ? 'text-gray-500 drop-shadow-[0_0_1rem_#F3F4F640]'
                  : ''
              }
              ${
                color == 'zinc'
                  ? 'text-zinc-500 drop-shadow-[0_0_1rem_#F4F4F540]'
                  : ''
              }
              ${
                color == 'neutral'
                  ? 'text-neutral-500 drop-shadow-[0_0_1rem_#F5F5F540]'
                  : ''
              }
              ${
                color == 'stone'
                  ? 'text-stone-500 drop-shadow-[0_0_1rem_#F5F5F440]'
                  : ''
              }
              ${
                color == 'red'
                  ? 'text-red-500 drop-shadow-[0_0_1rem_#FECACA40]'
                  : ''
              }
              ${
                color == 'orange'
                  ? 'text-orange-500 drop-shadow-[0_0_1rem_#FFEDD540]'
                  : ''
              }
              ${
                color == 'amber'
                  ? 'text-amber-500 drop-shadow-[0_0_1rem_#FEF3C740]'
                  : ''
              }
              ${
                color == 'lime'
                  ? 'text-lime-500 drop-shadow-[0_0_1rem_#ECFCCB40]'
                  : ''
              }
              ${
                color == 'green'
                  ? 'text-green-500 drop-shadow-[0_0_1rem_#DCFEC740]'
                  : ''
              }
              ${
                color == 'emerald'
                  ? 'text-emerald-500 drop-shadow-[0_0_1rem_#D1FAE540]'
                  : ''
              }
              ${
                color == 'teal'
                  ? 'text-teal-500 drop-shadow-[0_0_1rem_#CCFBF140]'
                  : ''
              }
              ${
                color == 'cyan'
                  ? 'text-cyan-500 drop-shadow-[0_0_1rem_#CFFAFE40]'
                  : ''
              }
              ${
                color == 'sky'
                  ? 'text-sky-500 drop-shadow-[0_0_1rem_#E0F2FE40]'
                  : ''
              }
              ${
                color == 'blue'
                  ? 'text-blue-500 drop-shadow-[0_0_1rem_#DBEAFE40]'
                  : ''
              }
              ${
                color == 'indigo'
                  ? 'text-indigo-500 drop-shadow-[0_0_1rem_#E0E7FF40]'
                  : ''
              }
              ${
                color == 'violet'
                  ? 'text-violet-500 drop-shadow-[0_0_1rem_#EDE9FE40]'
                  : ''
              }
              ${
                color == 'purple'
                  ? 'text-purple-500 drop-shadow-[0_0_1rem_#F3E8FF40]'
                  : ''
              }
              ${
                color == 'fuchsia'
                  ? 'text-fuchsia-500 drop-shadow-[0_0_1rem_#FAE8FF40]'
                  : ''
              }
              ${
                color == 'pink'
                  ? 'text-pink-500 drop-shadow-[0_0_1rem_#FCE7F340]'
                  : ''
              }
              ${
                color == 'rose'
                  ? 'text-rose-500 drop-shadow-[0_0_1rem_#FFE4E640]'
                  : ''
              }
              ${
                color == 'accent'
                  ? 'text-[#D8D8C7] drop-shadow-[0_0_1rem_#D8D8C730]'
                  : ''
              }
              `}
          >
            <Icon icon={icon} stroke={'1'} />
          </span>
          <div className="ml-4">
            <p className="inline-flex text-base font-medium text-stone-50">
              {title}
              <ArrowTopRightOnSquareIcon className="mt-1 ml-2 h-4 w-4 text-stone-200" />
            </p>
            <p className="mt-1 text-sm text-stone-400">{description}</p>
          </div>
        </span>
      </a>
    )
  } else {
    return (
      <Link href={url} passHref>
        <span className="flex max-w-lg cursor-pointer items-center gap-2 rounded-md px-4 py-3 shadow-md shadow-zinc-900/20 hover:bg-zinc-800/70 hover:outline hover:outline-1 hover:outline-offset-2 hover:outline-zinc-100/50">
          <span
            className={`h-10 w-10 ${
              icon == 'Growth' ? 'text-center' : ''
            } flex-shrink-0 
              ${
                color == 'slate'
                  ? 'text-slate-500 drop-shadow-[0_0_1rem_#F1F5F940]'
                  : ''
              }
              ${
                color == 'gray'
                  ? 'text-gray-500 drop-shadow-[0_0_1rem_#F3F4F640]'
                  : ''
              }
              ${
                color == 'zinc'
                  ? 'text-zinc-500 drop-shadow-[0_0_1rem_#F4F4F540]'
                  : ''
              }
              ${
                color == 'neutral'
                  ? 'text-neutral-500 drop-shadow-[0_0_1rem_#F5F5F540]'
                  : ''
              }
              ${
                color == 'stone'
                  ? 'text-stone-500 drop-shadow-[0_0_1rem_#F5F5F440]'
                  : ''
              }
              ${
                color == 'red'
                  ? 'text-red-500 drop-shadow-[0_0_1rem_#FECACA40]'
                  : ''
              }
              ${
                color == 'orange'
                  ? 'text-orange-500 drop-shadow-[0_0_1rem_#FFEDD540]'
                  : ''
              }
              ${
                color == 'amber'
                  ? 'text-amber-500 drop-shadow-[0_0_1rem_#FEF3C740]'
                  : ''
              }
              ${
                color == 'lime'
                  ? 'text-lime-500 drop-shadow-[0_0_1rem_#ECFCCB40]'
                  : ''
              }
              ${
                color == 'green'
                  ? 'text-green-500 drop-shadow-[0_0_1rem_#DCFEC740]'
                  : ''
              }
              ${
                color == 'emerald'
                  ? 'text-emerald-500 drop-shadow-[0_0_1rem_#D1FAE540]'
                  : ''
              }
              ${
                color == 'teal'
                  ? 'text-teal-500 drop-shadow-[0_0_1rem_#CCFBF140]'
                  : ''
              }
              ${
                color == 'cyan'
                  ? 'text-cyan-500 drop-shadow-[0_0_1rem_#CFFAFE40]'
                  : ''
              }
              ${
                color == 'sky'
                  ? 'text-sky-500 drop-shadow-[0_0_1rem_#E0F2FE40]'
                  : ''
              }
              ${
                color == 'blue'
                  ? 'text-blue-500 drop-shadow-[0_0_1rem_#DBEAFE40]'
                  : ''
              }
              ${
                color == 'indigo'
                  ? 'text-indigo-500 drop-shadow-[0_0_1rem_#E0E7FF40]'
                  : ''
              }
              ${
                color == 'violet'
                  ? 'text-violet-500 drop-shadow-[0_0_1rem_#EDE9FE40]'
                  : ''
              }
              ${
                color == 'purple'
                  ? 'text-purple-500 drop-shadow-[0_0_1rem_#F3E8FF40]'
                  : ''
              }
              ${
                color == 'fuchsia'
                  ? 'text-fuchsia-500 drop-shadow-[0_0_1rem_#FAE8FF40]'
                  : ''
              }
              ${
                color == 'pink'
                  ? 'text-pink-500 drop-shadow-[0_0_1rem_#FCE7F340]'
                  : ''
              }
              ${
                color == 'rose'
                  ? 'text-rose-500 drop-shadow-[0_0_1rem_#FFE4E640]'
                  : ''
              }
              ${
                color == 'accent'
                  ? 'text-[#D8D8C7] drop-shadow-[0_0_1rem_#D8D8C730]'
                  : ''
              }
              `}
          >
            <Icon icon={icon} stroke={'1'} />
          </span>
          <div className="ml-4">
            <p className="text-base font-medium text-stone-50">{title}</p>
            <p className="mt-1 text-sm text-stone-400">{description}</p>
          </div>
        </span>
      </Link>
    )
  }
}

Bookmark.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  urlExternal: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
}

Bookmark.defaultProps = {}
