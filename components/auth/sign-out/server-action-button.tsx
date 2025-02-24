'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { signOutAction } from '@/action/auth'
import { Button, type ButtonVariantProps } from '@/components/ui'

interface Props extends ButtonVariantProps {
	className?: string
}

export const SignOutSrverActionButton: React.FC<Props> = ({ variant, ...props }) => {
	const [isPending, setIsPending] = useState(false)

	const handleSignOutSrverAction = async () => {
		setIsPending(true)

		try {
			await signOutAction()
		} catch {
			console.log('Что-то пошло не так')
		} finally {
			setIsPending(false)
		}
	}

	return (
		<Button
			onClick={handleSignOutSrverAction}
			variant={isPending && variant === 'ghost' ? 'secondary' : variant}
			disabled={isPending}
			{...props}
		>
			{isPending && <Loader2 className='animate-spin' />}
			Sign-out (server action)
		</Button>
	)
}
