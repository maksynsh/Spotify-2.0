import { flexRender, Row } from '@tanstack/react-table'
import { useRecoilState } from 'recoil'

import { currentTrackIdState, isPlayingState } from 'atoms/song'
import { useSpotify } from 'hooks'
import { Song } from '..'
import { availableDevicesState } from 'atoms/devices'

interface SongRowProps {
  row: Row<Song>
  contextUri: string
}

export const SongRow = ({ row, contextUri }: SongRowProps) => {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [availableDevices] = useRecoilState(availableDevicesState)

  const playSong = () => {
    spotifyApi
      .play({
        context_uri: contextUri,
        offset: { uri: row.original.uri as string },
        //uris: [row.original.uri || ''],
        device_id:
          availableDevices?.find((d) => d.is_active)?.id ||
          (availableDevices && availableDevices[0]?.id) ||
          '',
      })
      .then(() => {
        setCurrentTrackId(row.original.id || ''), setIsPlaying(true)
      })
  }

  return (
    <tr
      className='text-gray h-14 ease-in duration-100 hover:bg-carbon hover:bg-opacity-60 hover:text-white'
      onClick={playSong}
    >
      {row.getVisibleCells().map((cell) => {
        return (
          <td
            key={cell.id}
            className={`text-trim px-4 cursor-default first-of-type:pr-0 last-of-type:px-1 
            ${
              cell.column.id === 'title'
                ? cell.row.original.id === currentTrackId
                  ? 'text-green'
                  : 'text-white'
                : ''
            }`}
          >
            {cell.column.id === 'id' && cell.row.original.id === currentTrackId ? (
              <img className='w-3 h-3' src={'/images/equaliser-animated.gif'} alt='eq' />
            ) : (
              flexRender(cell.column.columnDef.cell, { ...cell.getContext() })
            )}
          </td>
        )
      })}
    </tr>
  )
}
