'use server'

import { AuthError } from 'next-auth'
import { signOut } from '@/lib/auth'

export async function signOutAction() {
	try {
		await signOut({ redirect: false })
		return { success: 'До встречи!' }
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'SignOutError':
					return { error: 'Что-то пошло не так!' }

				default:
					return { error: 'Что-то пошло не так!' }
			}
		} else {
			return { error: 'Неизвестная ошибка!' }
		}
	}
}
