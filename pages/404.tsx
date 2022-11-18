import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'
import { SpotifyLogo } from 'assets'
import Link from 'next/link'

export default function PageNotFound() {
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center gap-2 text-white'>
      <h1 className='flex flex-col items-center'>
        <b className='text-4xl flex items-center' aria-label='404'>
          4<SpotifyLogo className='w-8 h-8' />4
        </b>
        <p>Page Not Found</p>
      </h1>
      <hr className='bg-white w-24 mb-4' />
      <Link href='/'>
        <a className='btn-base btn-secondary'>
          <ArrowLeftOnRectangleIcon className='w-6 h-6' /> Go back home
        </a>
      </Link>
    </div>
  )
}
