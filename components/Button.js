import PropTypes from 'prop-types'
import React from 'react'

import Link from 'next/link'

import {
  ArrowLongRightIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/20/solid'
import Icon from '../elements/icons/Icon'
export default function Button({
  label,
  icon,
  destination,
  onClick,
  color,
  theme,
  url,
  maxW,
}) {
  if (url) {
    if (url.charAt(0) == '/') {
      return (
        <Link href={url}>
          <div
            className={`flex ${
              maxW == true ? 'min-w-fit' : 'max-w-fit'
            } cursor-pointer items-center justify-start gap-2 rounded-md
            ${theme == 'light' && 'bg-gray-100 text-gray-900'}
            ${theme == 'dark' && 'bg-zinc-800 text-zinc-100'}
            ${
              color == 'slate'
                ? 'hover:bg-slate-500 hover:shadow-slate-500/20 focus:ring-slate-500'
                : ''
            }
            ${
              color == 'gray'
                ? 'hover:bg-gray-500 hover:shadow-gray-500/20 focus:ring-gray-500'
                : ''
            }
            ${
              color == 'zinc'
                ? 'hover:bg-zinc-500 hover:shadow-zinc-500/20 focus:ring-zinc-500'
                : ''
            }
            ${
              color == 'neutral'
                ? 'hover:bg-neutral-500 hover:shadow-neutral-500/20 focus:ring-neutral-500'
                : ''
            }
            ${
              color == 'stone'
                ? 'hover:bg-stone-500 hover:shadow-stone-500/20 focus:ring-stone-500'
                : ''
            }
            ${
              color == 'red'
                ? 'hover:bg-red-500 hover:shadow-red-500/20 focus:ring-red-500'
                : ''
            }
            ${
              color == 'orange'
                ? 'hover:bg-orange-500 hover:shadow-orange-500/20 focus:ring-orange-500'
                : ''
            }
            ${
              color == 'amber'
                ? 'hover:bg-amber-500 hover:shadow-amber-500/20 focus:ring-amber-500'
                : ''
            }
            ${
              color == 'lime'
                ? 'hover:bg-lime-500 hover:shadow-lime-500/20 focus:ring-lime-500'
                : ''
            }
            ${
              color == 'green'
                ? 'hover:bg-green-500 hover:shadow-green-500/20 focus:ring-green-500'
                : ''
            }
            ${
              color == 'emerald'
                ? 'hover:bg-emerald-500 hover:shadow-emerald-500/20 focus:ring-emerald-500'
                : ''
            }
            ${
              color == 'teal'
                ? 'hover:bg-teal-500 hover:shadow-teal-500/20 focus:ring-teal-500'
                : ''
            }
            ${
              color == 'cyan'
                ? 'hover:bg-cyan-500 hover:shadow-cyan-500/20 focus:ring-cyan-500'
                : ''
            }
            ${
              color == 'sky'
                ? 'hover:bg-sky-500 hover:shadow-sky-500/20 focus:ring-sky-500'
                : ''
            }
            ${
              color == 'blue'
                ? 'hover:bg-blue-500 hover:shadow-blue-500/20 focus:ring-blue-500'
                : ''
            }
            ${
              color == 'indigo'
                ? 'hover:bg-indigo-500 hover:shadow-indigo-500/20 focus:ring-indigo-500'
                : ''
            }
            ${
              color == 'violet'
                ? 'hover:bg-violet-500 hover:shadow-violet-500/20 focus:ring-violet-500'
                : ''
            }
            ${
              color == 'purple'
                ? 'hover:bg-purple-500 hover:shadow-purple-500/20 focus:ring-purple-500'
                : ''
            }
            ${
              color == 'fuchsia'
                ? 'hover:bg-fuchsia-500 hover:shadow-fuchsia-500/20 focus:ring-fuchsia-500'
                : ''
            }
            ${
              color == 'pink'
                ? 'hover:bg-pink-500 hover:shadow-pink-500/20 focus:ring-pink-500'
                : ''
            }
            ${
              color == 'rose'
                ? 'hover:bg-rose-500 hover:shadow-rose-500/20 focus:ring-rose-500'
                : ''
            }
      h-12 py-2 px-4 text-base font-medium shadow-md shadow-zinc-900/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm`}
          >
            {icon && (
              <div className="h-6 w-6">
                <Icon icon={icon} />
              </div>
            )}
            <div>{label}</div>
            {destination == 'external' && (
              <ArrowTopRightOnSquareIcon className={`h-4 w-4`} />
            )}
            {destination == 'step' && (
              <ArrowLongRightIcon className="mt-px h-4 w-4" />
            )}
          </div>
        </Link>
      )
    } else {
      {
        return (
          <a href={url}>
            <div
              className={`flex ${
                maxW == true ? 'min-w-fit' : 'max-w-fit'
              } cursor-pointer items-center justify-start gap-2 rounded-md 
            ${theme == 'light' && 'bg-gray-100 text-gray-900'}
            ${theme == 'dark' && 'bg-zinc-800 text-zinc-100'}
            ${
              color == 'slate'
                ? 'hover:bg-slate-500 hover:shadow-slate-500/20 focus:ring-slate-500'
                : ''
            }
            ${
              color == 'gray'
                ? 'hover:bg-gray-500 hover:shadow-gray-500/20 focus:ring-gray-500'
                : ''
            }
            ${
              color == 'zinc'
                ? 'hover:bg-zinc-500 hover:shadow-zinc-500/20 focus:ring-zinc-500'
                : ''
            }
            ${
              color == 'neutral'
                ? 'hover:bg-neutral-500 hover:shadow-neutral-500/20 focus:ring-neutral-500'
                : ''
            }
            ${
              color == 'stone'
                ? 'hover:bg-stone-500 hover:shadow-stone-500/20 focus:ring-stone-500'
                : ''
            }
            ${
              color == 'red'
                ? 'hover:bg-red-500 hover:shadow-red-500/20 focus:ring-red-500'
                : ''
            }
            ${
              color == 'orange'
                ? 'hover:bg-orange-500 hover:shadow-orange-500/20 focus:ring-orange-500'
                : ''
            }
            ${
              color == 'amber'
                ? 'hover:bg-amber-500 hover:shadow-amber-500/20 focus:ring-amber-500'
                : ''
            }
            ${
              color == 'lime'
                ? 'hover:bg-lime-500 hover:shadow-lime-500/20 focus:ring-lime-500'
                : ''
            }
            ${
              color == 'green'
                ? 'hover:bg-green-500 hover:shadow-green-500/20 focus:ring-green-500'
                : ''
            }
            ${
              color == 'emerald'
                ? 'hover:bg-emerald-500 hover:shadow-emerald-500/20 focus:ring-emerald-500'
                : ''
            }
            ${
              color == 'teal'
                ? 'hover:bg-teal-500 hover:shadow-teal-500/20 focus:ring-teal-500'
                : ''
            }
            ${
              color == 'cyan'
                ? 'hover:bg-cyan-500 hover:shadow-cyan-500/20 focus:ring-cyan-500'
                : ''
            }
            ${
              color == 'sky'
                ? 'hover:bg-sky-500 hover:shadow-sky-500/20 focus:ring-sky-500'
                : ''
            }
            ${
              color == 'blue'
                ? 'hover:bg-blue-500 hover:shadow-blue-500/20 focus:ring-blue-500'
                : ''
            }
            ${
              color == 'indigo'
                ? 'hover:bg-indigo-500 hover:shadow-indigo-500/20 focus:ring-indigo-500'
                : ''
            }
            ${
              color == 'violet'
                ? 'hover:bg-violet-500 hover:shadow-violet-500/20 focus:ring-violet-500'
                : ''
            }
            ${
              color == 'purple'
                ? 'hover:bg-purple-500 hover:shadow-purple-500/20 focus:ring-purple-500'
                : ''
            }
            ${
              color == 'fuchsia'
                ? 'hover:bg-fuchsia-500 hover:shadow-fuchsia-500/20 focus:ring-fuchsia-500'
                : ''
            }
            ${
              color == 'pink'
                ? 'hover:bg-pink-500 hover:shadow-pink-500/20 focus:ring-pink-500'
                : ''
            }
            ${
              color == 'rose'
                ? 'hover:bg-rose-500 hover:shadow-rose-500/20 focus:ring-rose-500'
                : ''
            } 
      h-12 py-2 px-4 text-base font-medium shadow-md shadow-zinc-900/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm`}
            >
              {icon && (
                <div className="h-6 w-6">
                  <Icon icon={icon} />
                </div>
              )}
              <div>{label}</div>
              {destination == 'external' && (
                <ArrowTopRightOnSquareIcon className={`h-4 w-4`} />
              )}
              {destination == 'step' && (
                <ArrowLongRightIcon className="mt-px h-4 w-4" />
              )}
            </div>
          </a>
        )
      }
    }
  } else {
    return (
      <button
        onClick={onClick}
        className={`flex ${
          maxW == true ? 'min-w-fit' : 'max-w-fit'
        } cursor-pointer items-center justify-start gap-2 rounded-md
            ${theme == 'light' && 'bg-gray-100 text-gray-900'}
            ${theme == 'dark' && 'bg-zinc-800 text-zinc-100'}
            ${
              color == 'slate'
                ? 'hover:bg-slate-500 hover:shadow-slate-500/20 focus:ring-slate-500'
                : ''
            }
            ${
              color == 'gray'
                ? 'hover:bg-gray-500 hover:shadow-gray-500/20 focus:ring-gray-500'
                : ''
            }
            ${
              color == 'zinc'
                ? 'hover:bg-zinc-500 hover:shadow-zinc-500/20 focus:ring-zinc-500'
                : ''
            }
            ${
              color == 'neutral'
                ? 'hover:bg-neutral-500 hover:shadow-neutral-500/20 focus:ring-neutral-500'
                : ''
            }
            ${
              color == 'stone'
                ? 'hover:bg-stone-500 hover:shadow-stone-500/20 focus:ring-stone-500'
                : ''
            }
            ${
              color == 'red'
                ? 'hover:bg-red-500 hover:shadow-red-500/20 focus:ring-red-500'
                : ''
            }
            ${
              color == 'orange'
                ? 'hover:bg-orange-500 hover:shadow-orange-500/20 focus:ring-orange-500'
                : ''
            }
            ${
              color == 'amber'
                ? 'hover:bg-amber-500 hover:shadow-amber-500/20 focus:ring-amber-500'
                : ''
            }
            ${
              color == 'lime'
                ? 'hover:bg-lime-500 hover:shadow-lime-500/20 focus:ring-lime-500'
                : ''
            }
            ${
              color == 'green'
                ? 'hover:bg-green-500 hover:shadow-green-500/20 focus:ring-green-500'
                : ''
            }
            ${
              color == 'emerald'
                ? 'hover:bg-emerald-500 hover:shadow-emerald-500/20 focus:ring-emerald-500'
                : ''
            }
            ${
              color == 'teal'
                ? 'hover:bg-teal-500 hover:shadow-teal-500/20 focus:ring-teal-500'
                : ''
            }
            ${
              color == 'cyan'
                ? 'hover:bg-cyan-500 hover:shadow-cyan-500/20 focus:ring-cyan-500'
                : ''
            }
            ${
              color == 'sky'
                ? 'hover:bg-sky-500 hover:shadow-sky-500/20 focus:ring-sky-500'
                : ''
            }
            ${
              color == 'blue'
                ? 'hover:bg-blue-500 hover:shadow-blue-500/20 focus:ring-blue-500'
                : ''
            }
            ${
              color == 'indigo'
                ? 'hover:bg-indigo-500 hover:shadow-indigo-500/20 focus:ring-indigo-500'
                : ''
            }
            ${
              color == 'violet'
                ? 'hover:bg-violet-500 hover:shadow-violet-500/20 focus:ring-violet-500'
                : ''
            }
            ${
              color == 'purple'
                ? 'hover:bg-purple-500 hover:shadow-purple-500/20 focus:ring-purple-500'
                : ''
            }
            ${
              color == 'fuchsia'
                ? 'hover:bg-fuchsia-500 hover:shadow-fuchsia-500/20 focus:ring-fuchsia-500'
                : ''
            }
            ${
              color == 'pink'
                ? 'hover:bg-pink-500 hover:shadow-pink-500/20 focus:ring-pink-500'
                : ''
            }
            ${
              color == 'rose'
                ? 'hover:bg-rose-500 hover:shadow-rose-500/20 focus:ring-rose-500'
                : ''
            }
      h-12 py-2 px-4 text-base font-medium shadow-md shadow-zinc-900/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm`}
      >
        {icon && (
          <div className="h-6 w-6">
            <Icon icon={icon} />
          </div>
        )}
        <div>{label}</div>
        {destination == 'external' && (
          <ArrowTopRightOnSquareIcon className={`h-4 w-4`} />
        )}
        {destination == 'step' && (
          <ArrowLongRightIcon className="mt-px h-4 w-4" />
        )}
      </button>
    )
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  url: PropTypes.string,
  destination: PropTypes.oneOf(['external', 'step']),
  color: PropTypes.string,
  theme: PropTypes.oneOf(['dark', 'light']),
  maxW: PropTypes.bool,
}

Button.defaultProps = {
  onClick: undefined,
  theme: 'light',
  color: 'green',
  maxW: false,
}
