import type { User as UserType } from 'next-auth'
import { auth } from '@/lib/auth'
import { ButtonAddCallback } from '@/components/ui'

import { UserAvatar } from './avarat'
import { UserDropdown } from './dropdown'

export const User: React.FC = async () => {
	const session = await auth()
	const user: UserType | undefined = session?.user

	if (!user) {
		return (
			<ButtonAddCallback href='/sign-in' variant='secondary' size='icon' className='rounded-full'>
				<UserAvatar image={null} />
			</ButtonAddCallback>
		)
	} else {
		return <UserDropdown user={user} />
	}
}
