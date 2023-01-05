import React from 'react'
import Image from 'next/image'
import { createColumnHelper } from '@tanstack/react-table'
import { ClockIcon } from '@heroicons/react/24/outline'
import { PlayIcon } from '@heroicons/react/24/solid'

import { duration } from 'lib/utils'
import { ColumnsType, ColumnBreakpoints, Table } from 'components'

const columnHelper = createColumnHelper<SpotifyApi.TrackObjectFull>()

const columns: ColumnsType<SpotifyApi.TrackObjectFull> = [
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
            src={(info.row.original.album.images.at(-1) || info.row.original.album.images[0]).url}
            loader={() =>
              (info.row.original.album.images.at(-1) || info.row.original.album.images[0]).url
            }
            layout='fill'
            width={40}
            height={40}
            alt='album'
          />
        </div>

        <div className='flex flex-col min-w-0 justify-center md:justify-between'>
          <h3 className='font-semibold leading-none text-inherit truncate'>{info.getValue()}</h3>
          <div className='leading-none text-gray truncate'>
            {info.row.original.artists?.at(0)?.name}
          </div>
        </div>
      </div>
    ),
    header: () => 'Title',
  }),
  columnHelper.accessor('album', {
    id: 'album',
    cell: (info) => info.getValue()?.name,
    header: () => 'Album',
  }),
  columnHelper.accessor('duration_ms', {
    id: 'duration',
    cell: (info) => duration(info.getValue()),
    header: () => <ClockIcon width={24} height={24} />,
  }),
]

const COLUMN_BREAKPOINTS: ColumnBreakpoints = {
  768: ['album'],
  640: ['album', 'id'],
}

interface SearchSongsTableProps {
  data: SpotifyApi.TrackObjectFull[]
}

export const SearchSongsTable = ({ data }: SearchSongsTableProps) => {
  return (
    <div className=''>
      <Table data={data} columns={columns} columnBreakpoints={COLUMN_BREAKPOINTS} />
    </div>
  )
}
