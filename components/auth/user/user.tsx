import type { User as UserType } from 'next-auth'
import { User2 } from 'lucide-react'
import { auth } from '@/lib/auth'
import { ButtonAddCallback } from '@/components/shared'

import { UserDropdown } from './dropdown'

export const User: React.FC = async () => {
	const session = await auth()
	const user: UserType | undefined = session?.user

	if (!user) {
		return (
			<ButtonAddCallback href='/sign-in' size='icon' className='rounded-full'>
				<User2 />
			</ButtonAddCallback>
		)
	}

	return <UserDropdown user={user} />
}
