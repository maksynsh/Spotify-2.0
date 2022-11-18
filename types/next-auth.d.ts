import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    error?: string
    user: {
      id: string
    } & DefaultSession['user']
  }
}
