import React, { useEffect, useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import moment from 'moment'
import { ClockIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, ChevronUpIcon, PlayIcon } from '@heroicons/react/24/solid'

import { Track } from 'types/spotify'
import { useDimensions } from 'hooks'
import { duration } from 'lib/utils'
import { SongRow } from './components/SongRow'

export interface Song extends Track {
  added_at: string
  image: string
}

const columnHelper = createColumnHelper<Song>()

const columns = [
  columnHelper.accessor('id', {
    cell: (info) =>
      info.cell.row.getIsSelected() ? (
        <PlayIcon width={16} className='cursor-pointer text-white' />
      ) : (
        info.row.index + 1
      ),
    header: () => '#',
    size: 1,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.name, {
    id: 'title',
    cell: (info) => (
      <div className='flex gap-4 min-w-0'>
        <img className='w-10 h-10' src={info.row.original.image} alt='album' />
        <div className='flex flex-col min-w-0 justify-center md:justify-between'>
          <h3 className='font-semibold leading-none text-inherit'>{info.getValue()}</h3>
          <div className='leading-none text-gray'>{info.row.original.artists?.at(0)?.name}</div>
        </div>
      </div>
    ),
    header: () => 'Title',
  }),
  columnHelper.accessor('album.name', {
    id: 'album',
    cell: (info) => info.getValue(),
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

interface ColumnBreakpoints {
  [key: number]: string[]
}

const COLUMN_BREAKPOINTS: ColumnBreakpoints = {
  1280: ['added-at'],
  768: ['added-at', 'album'],
  640: ['added-at', 'album', 'id'],
}

interface SongsTableProps {
  data: Song[]
  playlistUri: string
}

export const SongsTable = ({ data, playlistUri }: SongsTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const { width } = useDimensions()

  const { getHeaderGroups, getRowModel, getAllLeafColumns } = useReactTable({
    columns,
    data,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    autoResetAll: false,
  })

  useEffect(() => {
    Object.keys(COLUMN_BREAKPOINTS).forEach((breakpoint: any) => {
      getAllLeafColumns().forEach((column) => {
        if (COLUMN_BREAKPOINTS[breakpoint].includes(column.id)) {
          if (width < breakpoint) {
            column.toggleVisibility(false)
            return
          }
          column.toggleVisibility(true)
        }
      })
    })
  }, [width])

  return (
    <div className='text-white bg-dark bg-opacity-30 backdrop-blur-md px-2 md:px-8'>
      <table className='text-sm w-full table-fixed overflow-auto select-none'>
        <thead className='border-b-[1px] border-carbon text-gray'>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className='h-9'>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    className='text-start uppercase font-normal sm:first-of-type:w-10 first-of-type:pr-0 
                    last-of-type:w-12 last-of-type:px-1 px-4'
                  >
                    <div
                      className={`flex gap-1 ${
                        header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                      }`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div
                        style={{
                          userSelect: 'none',
                        }}
                        className='text-trim'
                        id='column_title'
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                      {header.column.getIsSorted() &&
                        (header.column.getIsSorted() === 'desc' ? (
                          <ChevronDownIcon width={14} />
                        ) : (
                          <ChevronUpIcon width={14} />
                        ))}
                    </div>
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody className='text-xs md:text-sm before:h-2 before:table-row'>
          {getRowModel().rows.map((row) => {
            return <SongRow key={row.id} row={row} contextUri={playlistUri} />
          })}
        </tbody>
      </table>
    </div>
  )
}
