# Spotify 2.0 with Next.js + Tailwind CSS

## Set up your environment

node version 16.14
yarn verison 1.22

1. Install dependencies with `yarn install`

2. Create env file with following variables:
`NEXTAUTH_URL` - Base URL
`JWT_SECRET` - Secret phrase
`NEXT_PUBLIC_CLIENT_ID` - Spotify developers client id
`NEXT_PUBLIC_CLIENT_SECRET` - Spotify developers client secret
`NEXT_PUBLIC_REDIRECT_URI` - baseUrl + /api/auth/callback/spotify

3. Start dev environment with `npm run dev` or `yarn dev`

4. Build production app using `npm run build` or `yarn build`

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) or preview live with [StackBlitz](https://stackblitz.com/github/vercel/next.js/tree/canary/examples/with-tailwindcss)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss&project-name=with-tailwindcss&repository-name=with-tailwindcss)
