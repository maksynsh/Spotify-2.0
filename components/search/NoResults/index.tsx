interface NoResultsProps {
  query: string | string[] | undefined
}

export const NoResults = ({ query }: NoResultsProps) => {
  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      <div className='text-xl fong-semibold'>No results found for &quot;{query}&quot;</div>
      <div>
        Please make sure your words are spelled correctly or use less or different keywords.
      </div>
    </div>
  )
}
