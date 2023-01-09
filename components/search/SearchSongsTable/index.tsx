import React from 'react'
import Image from 'next/image'
import { createColumnHelper } from '@tanstack/react-table'
import { ClockIcon } from '@heroicons/react/24/outline'
import { PlayIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

import { duration } from 'lib/utils'
import { ColumnsType, ColumnBreakpoints, Table, LinkList } from 'components'

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
          <Link href={`/album/${info.row.original.album?.id}`}>
            <h3
              className='font-semibold leading-none text-inherit link truncate'
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
