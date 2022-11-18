import Link from 'next/link'

export default function PageNotFound() {
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center gap-2 text-white'>
      <h1>
        <b>404</b> - Page Not Found
      </h1>
      <hr className='bg-white w-10' />
      <Link href='/'>
        <a className='btn-base'>Go back home</a>
      </Link>
    </div>
  )
}
