import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Credential from 'next-auth/providers/credentials'

import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import { LoginSchema } from '@/lib/zod/auth'

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: { strategy: 'jwt' },

	providers: [
		Credential({
			async authorize(credentials) {
				const validate = LoginSchema.safeParse(credentials)

				if (validate.success) {
					const { email } = validate.data
					const user = await prisma.user.findUnique({ where: { email } })
					return user
				}

				return null
			},
		}),

		GitHub,
	],
})
