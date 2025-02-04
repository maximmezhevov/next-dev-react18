'use client'

import { FaGithub } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '../shadcn'

export const Social: React.FC = () => {
	return (
		<div className='flex w-full items-center gap-x-2'>
			<Button variant='outline' size='lg' className='w-full' onClick={() => {}}>
				<FcGoogle />
			</Button>
			<Button variant='outline' size='lg' className='w-full' onClick={() => {}}>
				<FaGithub />
			</Button>
		</div>
	)
}
