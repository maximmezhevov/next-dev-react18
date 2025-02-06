// import NextAuth from 'next-auth'
// import authConfig from '@/auth.config'
// const { auth } = NextAuth(authConfig)
// export default auth((req) => console.log('...'))
// ReferenceError: Cannot access '__WEBPACK_DEFAULT_EXPORT__' before initialization

export { auth as middleware } from '@/lib/auth'
