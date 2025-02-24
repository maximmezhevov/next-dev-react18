'use client'

import { useState } from 'react'
import { VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { signOutAction } from '@/action/auth'
import { Button, type buttonVariants } from '@/components/ui'

interface Props extends VariantProps<typeof buttonVariants> {
	className?: string
}

export const SignOutSrverActionButton: React.FC<Props> = ({ ...props }) => {
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
		<Button onClick={handleSignOutSrverAction} disabled={isPending} {...props}>
			{isPending && <Loader2 className='animate-spin' />}
			Sign-out (server action)
		</Button>
	)
}
