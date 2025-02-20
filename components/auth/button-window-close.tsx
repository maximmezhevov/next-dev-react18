'use client'

import { Button } from '@/components/shadcn'

export const ButtonWindowClose = () => {
	const onClick = () => {
		return window.close()
	}
	return (
		<Button onClick={onClick} className='w-full'>
			window.close()
		</Button>
	)
}
