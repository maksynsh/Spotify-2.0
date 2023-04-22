import Image from 'next/image'
import { Cell, flexRender, Row } from '@tanstack/react-table'
import { useRecoilState } from 'recoil'

import { currentTrackIdState, isPlayingState } from 'atoms/song'
import { usePlayPause } from 'hooks'
import { PlayIcon } from '@heroicons/react/24/solid'

interface SongRowProps {
  row: Row<any>
  contextUri?: string
}

export const SongRow = ({ row, contextUri }: SongRowProps) => {
  const [currentTrackId] = useRecoilState(currentTrackIdState)
  const [isPlaying] = useRecoilState(isPlayingState)

  const { play } = usePlayPause()

  const playSong = () =>
    play({
      contextUri: contextUri || row.original.album.uri,
      songUri: row.original.uri,
      songId: row.original.id,
    })

  const renderIdCell = (cell: Cell<any, unknown>) => {
    return (
      <>
        <div className='absolute w-5 h-5 transition-all ease-in duration-100 group-hover:opacity-100 opacity-0'>
          <PlayIcon />
        </div>
        {cell.row.original.id === currentTrackId && isPlaying ? (
          <div className='relative w-3 h-3 group-hover:opacity-0 opacity-100 transition-all ease-in duration-100'>
            <Image layout='fill' src={'/images/equaliser-animated.gif'} alt='eq' />
          </div>
        ) : (
          <div className='group-hover:opacity-0 opacity-100 transition-all ease-in duration-100'>
            {flexRender(cell.column.columnDef.cell, { ...cell.getContext() })}
          </div>
        )}
      </>
    )
  }

  return (
    <tr
      className='group text-gray h-14 ease-in duration-100 hover:bg-carbon hover:bg-opacity-60 hover:text-white'
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
            {cell.column.id === 'id'
              ? renderIdCell(cell)
              : flexRender(cell.column.columnDef.cell, { ...cell.getContext() })}
          </td>
        )
      })}
    </tr>
  )
}
