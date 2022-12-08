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

interface GradientBackgroundProps {
  brightness?: number
}

export const GradientBackground = ({ brightness = 1 }: GradientBackgroundProps) => {
  const { asPath: currentPath } = useRouter()
  const [color, setColor] = useRecoilState<string>(backgroundGradientState)

  useEffect(() => {
    setColor(getRandomGradientColor())
  }, [currentPath])

  useEffect(() => {
    if (!brightness) {
      setColor('from-dragonstone')
    }
  }, [brightness])

  return (
    <section
      className={`transition-all ease duration-200 absolute left-0 top-0 z-0
      bg-gradient-to-b ${color} to-transparent text-white
      h-[29.5rem] md:h-[35rem] w-full`}
      style={{ filter: brightness ? `brightness(${brightness})` : '' }}
    />
  )
}
