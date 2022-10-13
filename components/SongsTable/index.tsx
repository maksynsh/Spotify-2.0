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
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'

import { Track } from 'types/spotify'

interface Song extends Track {
  added_at: string
}

const columnHelper = createColumnHelper<Song>()

const columns = [
  columnHelper.accessor('id', {
    cell: (props) => 'play',
    header: () => '#',
    size: 1,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.name, {
    id: 'title',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Title</span>,
  }),
  columnHelper.accessor('album.name', {
    id: 'album-name',
    cell: (info) => info.getValue(),
    header: () => <span>Album</span>,
  }),
  columnHelper.accessor('added_at', {
    id: 'added-at',
    cell: (info) => info.getValue(),
    header: () => <span>Date added</span>,
  }),
  columnHelper.accessor('duration_ms', {
    id: 'duration',
    cell: (info) => info.getValue(),
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
    <div className='text-white bg-dark bg-opacity-30 backdrop-blur-md'>
      <table className='text-sm w-full table-fixed overflow-auto'>
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} className='text-start uppercase font-normal'>
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
        <tbody>
          {getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className='text-trim'>
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
