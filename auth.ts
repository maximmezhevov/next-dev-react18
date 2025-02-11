// https://authjs.dev/getting-started/migrating-to-v5

import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import authConfig from '@/auth.config'
import { getTwoFactorConfirmationByUserId, getUserById } from '@/services/auth'

const prisma = new PrismaClient()

export const { auth, handlers, signIn, signOut } = NextAuth({
	pages: {
		signIn: '/auth/login',
		error: '/auth/error',
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
		async signIn({ user, account }) {
			if (account?.provider !== 'credentials') return true

			const existingUser = await getUserById(user.id as string)

			if (existingUser?.fakeEmailVerified) return true

			if (!existingUser?.emailVerified) return false

			if (existingUser?.twoFactor) {
				const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
					existingUser.id
				)

				if (!twoFactorConfirmation) return false

				await prisma.twoFactorConfirmation.delete({
					where: { id: twoFactorConfirmation.id },
				})
			}

			return true
		},
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub
			}

			if (token.role && session.user) {
				session.user.role = token.role
			}

			// if ((token.emailVerified || token.fakeEmailVerified) && session.user) {
			// 	session.user.emailVerified = token.emailVerified
			// 	session.user.fakeEmailVerified = token.fakeEmailVerified
			// }

			return session
		},
		async jwt({ token }) {
			if (!token.sub) return token

			const existingUser = await getUserById(token.sub)
			if (!existingUser) return token

			token.role = existingUser.role

			// token.emailVerified = existingUser.emailVerified
			// token.fakeEmailVerified = existingUser.fakeEmailVerified

			return token
		},
	},
	adapter: PrismaAdapter(prisma),
	session: { strategy: 'jwt' },
	...authConfig,
})
