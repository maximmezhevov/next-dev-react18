'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { AuthError } from 'next-auth'
import toast from 'react-hot-toast'

export const useSignOutClient = () => {
	const [isPending, setIsPending] = useState(false)

	const handleSignOutClient = async () => {
		setIsPending(true)

		try {
			await signOut()
			return toast.success('До встречи!')
		} catch (error) {
			if (error instanceof AuthError) {
				switch (error.type) {
					case 'SignOutError':
						toast.error('Что то пошло не так!')
						console.error(error.message)
						break

					default:
						toast.error('Неизвестная ошибка!')
						console.error(error.message)
						break
				}
			}
		} finally {
			setIsPending(false)
		}
	}

	return { isPending, handleSignOutClient }
}
