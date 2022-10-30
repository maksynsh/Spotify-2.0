import { atom } from 'recoil'
import { getRandomGradientColor } from 'lib/utils'

export const backgroundGradientState = atom<string>({
  key: 'backgroundGradientState',
  default: getRandomGradientColor(),
})
