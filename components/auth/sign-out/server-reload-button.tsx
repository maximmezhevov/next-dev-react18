'use client'

import type { ButtonVariantProps } from '@/components/ui'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { signOutAction } from '@/action/auth'
import { ButtonSubmit } from '@/components/ui'

interface Props extends ButtonVariantProps {
	className?: string
}

export const SignOutServerReloadButton: React.FC<React.PropsWithChildren<Props>> = ({
	children,
	...props
}) => {
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
	return (
		<ButtonSubmit onClick={handleSignOutServerReload} disabled={isPending} {...props}>
			{children || 'sign-out (server action window.location.reload())'}
		</ButtonSubmit>
	)
}
