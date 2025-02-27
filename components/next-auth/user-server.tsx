import type { User } from 'next-auth'
import { auth } from '@/lib/auth'
import { ButtonAddCallback } from '@/components/shared'
import { UserAvatar } from '@/components/auth'

import { UserDropdownServer } from './dropdown-server'

export const UserServer: React.FC = async () => {
	const session = await auth()
	const user: User | undefined = session?.user

	if (!user) {
		return (
			<ButtonAddCallback href='/sign-in' variant='secondary' size='icon' className='rounded-full'>
				<UserAvatar image={null} />
			</ButtonAddCallback>
		)
	} else {
		return <UserDropdownServer user={user} />
	}
}
