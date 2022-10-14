import moment from 'moment'

export const duration = (ms?: number) => {
  if (!ms) {
    return '0'
  }
  const seconds = moment.duration(ms).seconds()
  const minutes = moment.duration(ms).minutes()
  return minutes + ':' + (seconds < 10 ? `0${seconds}` : seconds)
}
