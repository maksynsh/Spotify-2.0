import React, { useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { ClockIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, ChevronUpIcon, PlayIcon } from '@heroicons/react/24/solid'

import { Track } from 'types/spotify'
import moment from 'moment'

interface Song extends Track {
  added_at: string
}

const columnHelper = createColumnHelper<Song>()

const columns = [
  columnHelper.accessor('id', {
    cell: (props) => <PlayIcon width={16} className='cursor-pointer text-white' />,
    header: () => '#',
    size: 1,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.name, {
    id: 'title',
    cell: (info) => (
      <div className='flex gap-4'>
        <img className='w-10 h-10' src={info.row.original.album?.images.pop()?.url} alt='' />
        <div className='flex flex-col justify-between'>
          <div className='font-semibold leading-none text-white'>{info.getValue()}</div>
          <div className='leading-none'>{info.row.original.artists?.at(0)?.name}</div>
        </div>
      </div>
    ),
    header: () => 'Title',
  }),
  columnHelper.accessor('album.name', {
    id: 'album-name',
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
    cell: (info) => {
      const value = info.getValue()
      const seconds = moment.duration(value).seconds()
      const minutes = moment.duration(value).minutes()
      return minutes + ':' + seconds
    },
    header: () => <ClockIcon width={24} height={24} />,
  }),
]

interface SongsTableProps {
  data: Song[]
}

export const SongsTable = ({ data }: SongsTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const { getHeaderGroups, getRowModel } = useReactTable({
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

  return (
    <div className='text-white bg-dark bg-opacity-30 backdrop-blur-md px-2 md:px-8'>
      <table className='text-sm w-full table-fixed overflow-auto'>
        <thead className='border-b-[1px] border-carbon'>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className='h-9'>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    className='text-start uppercase font-normal first-of-type:w-11 px-4'
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
        <tbody className='text-xs md:text-sm'>
          {getRowModel().rows.map((row) => {
            return (
              <tr
                key={row.id}
                className='text-gray h-14 rounded-md hover:bg-carbon hover:bg-opacity-60 hover:text-white'
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className='text-trim px-4 cursor-default'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
