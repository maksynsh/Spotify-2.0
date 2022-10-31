import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { shuffle } from 'lodash'
import { backgroundGradientState } from 'atoms/background'

const COLORS = [
  'from-green',
  'from-red-500',
  'from-purple-500',
  'from-rose-500',
  'from-yellow-500',
  'from-orange-500',
  'from-slate-500',
  'from-pink-500',
  'from-indigo-500',
  'from-teal-500',
  'from-violet-600',
  'from-blue-500',
  'from-cyan-500',
  'from-amber-500',
  'from-lime-700',
]

export const getRandomGradientColor = () => shuffle(COLORS).pop() as string

export const GradientBackground = () => {
  const { asPath: currentPath } = useRouter()
  const [color, setColor] = useRecoilState<string>(backgroundGradientState)

  useEffect(() => {
    setColor(getRandomGradientColor())
  }, [currentPath])

  return (
    <section
      className={`absolute left-0 top-0 z-0 bg-gradient-to-b ${color}
      to-dark h-[29.5rem] md:h-[35rem] w-full text-white transition-all ease-in duration-200`}
    />
  )
}
