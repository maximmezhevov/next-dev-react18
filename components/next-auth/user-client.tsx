'use client'

import type { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { User2 } from 'lucide-react'
import { ButtonAddCallback } from '@/components/shared'

import { UserDropdownClient } from './dropdown-client'

export const UserClient: React.FC = () => {
	const { data: session } = useSession()
	const user: Session | null = session

	if (!user) {
		return (
			<ButtonAddCallback href='/sign-in' size='icon' className='rounded-full'>
				<User2 />
			</ButtonAddCallback>
		)
	} else {
		return <UserDropdownClient />
	}
}
