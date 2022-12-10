import React, { useEffect, useState } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'

import { useDimensions } from 'hooks'
import { SongRow } from '../playlist/SongsTable/SongRow'

export interface ColumnBreakpoints {
  [key: number]: string[]
}

export type ColumnsType<T> = ColumnDef<T, any>[]

export interface TableProps<T> {
  data: T[]
  columns: ColumnsType<T>
  columnBreakpoints: ColumnBreakpoints
  playlistUri: string
}

export const Table = <T extends object>({
  data,
  columns,
  columnBreakpoints,
  playlistUri,
}: TableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([])

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

  const { width } = useDimensions()

  useEffect(() => {
    Object.keys(columnBreakpoints).forEach((breakpoint: string) => {
      const breakpointPx = Number(breakpoint)
      getAllLeafColumns().forEach((column) => {
        if (columnBreakpoints[breakpointPx].includes(column.id)) {
          if (width < breakpointPx) {
            column.toggleVisibility(false)
            return
          }
          column.toggleVisibility(true)
        }
      })
    })
  }, [width])

  return (
    <table className='text-sm w-full table-fixed overflow-auto select-none'>
      <thead className='border-b-[1px] border-carbon text-gray'>
        {getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className='h-9'>
            {headerGroup.headers.map((header) => {
              return (
                <th
                  key={header.id}
                  className='text-start uppercase font-normal first-of-type:min-w-fit first-of-type:pr-0 
                    last-of-type:w-12 last-of-type:px-1 px-4'
                  style={{ width: header.column.id === 'id' ? header.getSize() : '' }}
                >
                  <div
                    className={`flex gap-1 ${
                      header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                    }`}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className='text-trim select-none' id='column_title'>
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
  )
}
