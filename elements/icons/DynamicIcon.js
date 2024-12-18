import dynamic from 'next/dynamic'
import React from 'react'

import Unsplash from './Unsplash'

export default function HeroIcon(props) {
  if (props.icon == 'Unsplash') {
    return <Unsplash />
  } else if (props.icon == 'Growth') {
    return (
      <span className="text-growth-500 h-8 w-8 flex-shrink-0 text-4xl">𝔊</span>
    )
  } else {
    const Icon = dynamic(() =>
      import('@heroicons/react/24/outline').then((mod) => mod[props.icon])
    )
    return <Icon />
  }
}
