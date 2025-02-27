'use client'

import type { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { UserAvatar } from '@/components/auth'
import { ButtonAddCallback } from '@/components/shared'

import { UserDropdownClient } from './dropdown-client'

export const UserClient: React.FC = () => {
	const { data: session } = useSession()
	const user: Session | null = session

	if (!user) {
		return (
			<ButtonAddCallback href='/sign-in' variant='secondary' size='icon' className='rounded-full'>
				<UserAvatar image={null} />
			</ButtonAddCallback>
		)
	} else {
		return <UserDropdownClient />
	}
}
