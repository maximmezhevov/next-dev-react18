'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { signOutAction } from '@/actions/auth'

export const useSignOutServerRefresh = () => {
	const [isPending, setIsPending] = useState(false)

	const router = useRouter()

	const handleSignOutServerRefresh = async () => {
		setIsPending(true)

		try {
			const data = await signOutAction()

			if (data?.error) {
				throw new Error(data.error)
			}

			if (data?.success) {
				toast.success(data.success)

				router.refresh()
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

	return { isPending, handleSignOutServerRefresh }
}
