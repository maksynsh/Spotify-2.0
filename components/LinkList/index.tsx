import Link from 'next/link'

interface LinkListProps {
  array: { id: string; name: string }[]
  type: 'artist' | 'album' | 'playlist'
}

export const LinkList = ({ array, type = 'artist' }: LinkListProps) => {
  return (
    <>
      {array.map(({ id, name }, i) => [
        i > 0 && ', ',
        <Link key={id} href={`/${type}/${id}`}>
          <span className='hover:underline cursor-pointer'>{name}</span>
        </Link>,
      ])}
    </>
  )
}
