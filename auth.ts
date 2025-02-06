// https://authjs.dev/getting-started/migrating-to-v5

import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import authConfig from '@/auth.config'
import { getUserById } from '@/services/auth'

const prisma = new PrismaClient()

export const { auth, handlers, signIn, signOut } = NextAuth({
	pages: {
		signIn: '/auth/login',
		// error: '/auth/error',
	},
	events: {
		async linkAccount({ user }) {
			await prisma.user.update({
				where: { id: user.id },
				data: { emailVerified: new Date() },
			})
		},
	},
	callbacks: {
		async session({ token, session }) {
			// console.log({
			// 	sessionToken: token,
			// 	session,
			// })

			if (token.sub && session.user) {
				session.user.id = token.sub
			}

			if (token.role && session.user) {
				session.user.role = token.role
			}

			return session
		},
		async jwt({ token }) {
			// console.log('token', token)

			if (!token.sub) return token
			const existingUser = await getUserById(token.sub)
			if (!existingUser) return token
			token.role = existingUser.role

			return token
		},
	},
	adapter: PrismaAdapter(prisma),
	session: { strategy: 'jwt' },
	...authConfig,
})
