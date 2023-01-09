import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createColumnHelper } from '@tanstack/react-table'
import moment from 'moment'
import { ClockIcon } from '@heroicons/react/24/outline'
import { PlayIcon } from '@heroicons/react/24/solid'

import { Track } from 'types/spotify'
import { duration } from 'lib/utils'
import { PlayButton, ColumnsType, ColumnBreakpoints, Table, LinkList } from 'components'

export interface SongType extends Track {
  added_at: string
  image: string
}

const columnHelper = createColumnHelper<SongType>()

const columns: ColumnsType<SongType> = [
  columnHelper.accessor('id', {
    cell: (info) =>
      info.cell.row.getIsSelected() ? (
        <PlayIcon width={16} className='cursor-pointer text-white' />
      ) : (
        <div>{info.row.index + 1}</div>
      ),
    header: () => '#',
    size: 40,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.name, {
    id: 'title',
    cell: (info) => (
      <div className='flex gap-4 min-w-0'>
        <div className='relative w-10 h-10 shrink-0'>
          <Image
            src={info.row.original.image}
            loader={() => info.row.original.image}
            layout='fill'
            width={40}
            height={40}
            alt='album'
          />
        </div>

        <div className='flex flex-col min-w-0 justify-center md:justify-between'>
          <Link href={`/album/${info.row.original.album?.id}`}>
            <h3
              className='font-semibold leading-none text-inherit link truncate w-min'
              onClick={(e) => e.stopPropagation()}
            >
              {info.getValue()}
            </h3>
          </Link>
          <div className='leading-none text-gray truncate' onClick={(e) => e.stopPropagation()}>
            <LinkList type='artist' array={info.row.original.artists || []} />
          </div>
        </div>
      </div>
    ),
    header: () => 'Title',
  }),
  columnHelper.accessor('album', {
    id: 'album',
    cell: (info) => (
      <Link href={`/album/${info.getValue()?.id}`}>
        <div className='link' onClick={(e) => e.stopPropagation()}>
          {info.getValue()?.name}
        </div>
      </Link>
    ),
    header: () => 'Album',
  }),
  columnHelper.accessor('added_at', {
    id: 'added-at',
    cell: (info) => moment(info.getValue()).fromNow(),
    header: () => <span>Date added</span>,
  }),
  columnHelper.accessor('duration_ms', {
    id: 'duration',
    cell: (info) => duration(info.getValue()),
    header: () => <ClockIcon width={24} height={24} />,
  }),
]

const COLUMN_BREAKPOINTS: ColumnBreakpoints = {
  1280: ['added-at'],
  768: ['added-at', 'album'],
  640: ['added-at', 'album', 'id'],
}

interface SongsTableProps {
  data: SongType[]
  playlistUri: string
}

export const SongsTable = ({ data, playlistUri }: SongsTableProps) => {
  return (
    <div className='text-white bg-dark bg-opacity-30 backdrop-blur-md px-2 md:px-8'>
      <div className='flex items-center py-4'>
        <PlayButton size='large' uri={playlistUri} />
      </div>

      <Table
        data={data}
        columns={columns}
        columnBreakpoints={COLUMN_BREAKPOINTS}
        playlistUri={playlistUri}
      />
    </div>
  )
}
