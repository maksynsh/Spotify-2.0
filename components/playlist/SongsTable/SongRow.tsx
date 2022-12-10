import Image from 'next/image'
import { flexRender, Row } from '@tanstack/react-table'
import { useRecoilState } from 'recoil'

import { currentTrackIdState, isPlayingState } from 'atoms/song'
import { usePlayPause } from 'hooks'

interface SongRowProps {
  row: Row<any>
  contextUri: string
}

export const SongRow = ({ row, contextUri }: SongRowProps) => {
  const [currentTrackId] = useRecoilState(currentTrackIdState)
  const [isPlaying] = useRecoilState(isPlayingState)

  const { play } = usePlayPause()

  const playSong = () => play({ contextUri, songUri: row.original.uri, songId: row.original.id })

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
            {cell.column.id === 'id' && cell.row.original.id === currentTrackId && isPlaying ? (
              <div className='relative w-3 h-3'>
                <Image layout='fill' src={'/images/equaliser-animated.gif'} alt='eq' />
              </div>
            ) : (
              flexRender(cell.column.columnDef.cell, { ...cell.getContext() })
            )}
          </td>
        )
      })}
    </tr>
  )
}
