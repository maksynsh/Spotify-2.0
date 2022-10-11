import React from 'react'

import { getProviders, signIn } from 'next-auth/react'
import Head from 'next/head'

import { SpotifyLogo } from 'assets'
import { Button } from 'components'

interface LoginProps {
  providers: any
}

const Login = ({ providers }: LoginProps) => {
  return (
    <div className='flex flex-col items-center justify-center gap-6 min-h-screen w-ful'>
      <Head>
        <title>Sign In</title>
      </Head>

      <SpotifyLogo className='text-green h-24 w-24' />
      <div className='flex flex-col items-center gap-3'>
        {Object.values(providers).map((provider: any) => (
          <Button
            key={provider.id}
            size='large'
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            Login with {provider.name}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Login

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}
