import type { User } from 'next-auth'
import { auth } from '@/lib/auth'
import { User2 } from 'lucide-react'
import { ButtonAddCallback } from '@/components/shared'

import { UserDropdownServer } from './dropdown-server'

export const UserServer: React.FC = async () => {
	const session = await auth()
	const user: User | undefined = session?.user

	if (!user) {
		return (
			<ButtonAddCallback href='/sign-in' size='icon' className='rounded-full'>
				<User2 />
			</ButtonAddCallback>
		)
	} else {
		return <UserDropdownServer user={user} />
	}
}
