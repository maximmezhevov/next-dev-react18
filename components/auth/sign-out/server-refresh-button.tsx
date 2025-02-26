'use client'

import type { ButtonVariantProps } from '@/components/ui'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { signOutAction } from '@/action/auth'
import { ButtonSubmit } from '@/components/ui'
import { useRouter } from 'next/navigation'

interface Props extends ButtonVariantProps {
	className?: string
}

export const SignOutServerRefreshButton: React.FC<React.PropsWithChildren<Props>> = ({
	children,
	...props
}) => {
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
	return (
		<ButtonSubmit onClick={handleSignOutServerRefresh} disabled={isPending} {...props}>
			{children || 'sign-out (server action router.refresh())'}
		</ButtonSubmit>
	)
}
