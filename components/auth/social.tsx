'use client'

import { FaGithub } from 'react-icons/fa6'
// import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/shadcn'

export const Social: React.FC = () => {
	const onClick = () => {
		signIn('github', { redirectTo: '/dev/next-auth' })
	}
	return (
		<div className='flex w-full items-center gap-x-2'>
			{/* <Button variant='outline' size='lg' className='w-full' onClick={() => {}}>
				<FcGoogle />
			</Button> */}
			<Button onClick={onClick} className='w-full'>
				<FaGithub /> Continue with GitHub
			</Button>
		</div>
	)
}
