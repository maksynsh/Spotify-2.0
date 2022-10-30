import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { backgroundGradientState } from 'atoms/background'
import { getRandomGradientColor } from 'lib/utils'

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
