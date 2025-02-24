'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { Button, type buttonVariants } from '@/components/ui'

interface Props extends VariantProps<typeof buttonVariants> {
	className?: string
}

export const SignOutClientButton: React.FC<Props> = ({ ...props }) => {
	const [isPending, setIsPending] = useState(false)

	const handleSignOutClient = async () => {
		setIsPending(true)

		try {
			await signOut()
		} catch {
			console.log('Что-то пошло не так')
		} finally {
			setIsPending(false)
		}
	}

	return (
		<Button onClick={handleSignOutClient} disabled={isPending} {...props}>
			{isPending && <Loader2 className='animate-spin' />}
			Sign-out (client)
		</Button>
	)
}
