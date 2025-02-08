'use client'

import { FaGithub } from 'react-icons/fa6'
// import { FcGoogle } from 'react-icons/fc'
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
			{/* <Button variant='outline' size='lg' className='w-full' onClick={() => {}}>
				<FcGoogle />
			</Button> */}
			<SubmitButton isPending={isPending} onClick={onClick}>
				<FaGithub /> Continue with GitHub
			</SubmitButton>
		</div>
	)
}
