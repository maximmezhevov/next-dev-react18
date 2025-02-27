'use client'

import { useState } from 'react'
import { signOutAction } from '@/action/auth'
import toast from 'react-hot-toast'

export const useSignOutServerReload = () => {
	const [isPending, setIsPending] = useState(false)

	const handleSignOutServerReload = async () => {
		setIsPending(true)

		try {
			const data = await signOutAction()

			if (data?.error) {
				throw new Error(data.error)
			}

			if (data?.success) {
				toast.success(data.success)

				window.location.reload()
			}
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message)
				console.error(error.message)
			}
		} finally {
			setIsPending(false)
		}
	}

	return { isPending, handleSignOutServerReload }
}
