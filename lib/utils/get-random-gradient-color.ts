import { shuffle } from 'lodash'

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
  'from-emerald-500',
  'from-cyan-500',
  'from-amber-700',
  'from-lime-700',
]

export const getRandomGradientColor = () => shuffle(COLORS).pop() as string
