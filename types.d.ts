import type { User } from '@prisma/client'
import type { DefaultSession } from 'next-auth'

type Role = User['role'] //'ADMIN' | 'USER'

// https://authjs.dev/getting-started/typescript?framework=next-js#module-augmentation

export type ExistingUser = DefaultSession['user'] & {
	role: Role
}

declare module 'next-auth' {
	interface Session {
		user: ExistingUser
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT /* 'JWT' is defined but never used */ } from 'next-auth/jwt'

declare module 'next-auth/jwt' {
	interface JWT {
		role?: Role
	}
}
