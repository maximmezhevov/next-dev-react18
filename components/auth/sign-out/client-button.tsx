'use client'

import type { ButtonVariantProps } from '@/components/ui'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import toast from 'react-hot-toast'
import { ButtonSubmit } from '@/components/ui'
import { AuthError } from 'next-auth'

interface Props extends ButtonVariantProps {
	className?: string
}

export const SignOutClientButton: React.FC<React.PropsWithChildren<Props>> = ({
	children,
	...props
}) => {
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

	return (
		<ButtonSubmit onClick={handleSignOutClient} disabled={isPending} {...props}>
			{children || 'sign-out (client signOut() from next-auth/react no update() useSession)'}
		</ButtonSubmit>
	)
}
