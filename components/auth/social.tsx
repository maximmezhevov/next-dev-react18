'use client'

import { FaGithub } from 'react-icons/fa6'
import { signIn } from 'next-auth/react'
import { SubmitButton } from './submit-button'
import { useTransition } from 'react'

export const Social: React.FC = () => {
	const [isPending, startTransition] = useTransition()

	const onClick = () => {
		startTransition(async () => {
			await signIn('github', { redirectTo: '/dev/next-auth' })
		})
	}

	return (
		<div className='flex w-full items-center gap-x-2'>
			<SubmitButton isPending={isPending} onClick={onClick}>
				<FaGithub /> Продолжить с GitHub
			</SubmitButton>
		</div>
	)
}
