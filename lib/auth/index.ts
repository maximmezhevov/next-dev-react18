import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import { signInSchema } from '@/lib/zod/auth'
import bcryptjs from 'bcryptjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: { strategy: 'jwt' },

	providers: [
		Credentials({
			async authorize(credentials) {
				const validateFields = signInSchema.safeParse(credentials)
				if (validateFields.success) {
					const { email, password } = validateFields.data

					const user = await prisma.user.findFirst({ where: { email } })
					if (!user || !user.password) return null

					const passwordMatch = await bcryptjs.compare(password, user.password)

					if (passwordMatch) return user
				}
				return null
			},
		}),

		GitHub,
	],
})
