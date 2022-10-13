import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { shuffle } from 'lodash'

interface GradientSectionProps {
  children: React.ReactNode
}

const COLORS = [
  'from-green',
  'from-purple-500',
  'from-rose-500',
  'from-yellow-500',
  'from-orange-500',
  'from-slate-500',
  'from-pink-500',
  'from-indigo-500',
  'from-blue-500',
  'from-cyan-500',
]

export const GradientSection = ({ children }: GradientSectionProps) => {
  const { asPath: currentPath } = useRouter()
  const [color, setColor] = useState<string | undefined>()

  useEffect(() => {
    setColor(shuffle(COLORS).pop())
  }, [currentPath])

  return (
    <section
      className={`overflow-y-hidden bg-gradient-to-b ${color}
      to-dark h-96 md:h-[30rem] w-full text-white pt-16 transition-all ease-in duration-200`}
    >
      {children}
    </section>
  )
}
