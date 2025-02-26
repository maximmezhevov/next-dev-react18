'use client'

import type { User } from 'next-auth'
import { useSession } from 'next-auth/react'
import { DropdownMenuGroupSignOut, SignOutClientButton, Trigger } from '@/components/auth'
import { DropdownMenu } from '@/components/ui'

export const UserDropdownClient: React.FC = () => {
	const { data: session } = useSession()
	const user: User | undefined = session?.user

	if (!user) return null

	return (
		<DropdownMenu.Root>
			<Trigger image={user.image} />
			<Content />
		</DropdownMenu.Root>
	)
}

const Content: React.FC = () => {
	return (
		<DropdownMenu.Content>
			<DropdownMenuGroupSignOut>
				<SignOutClientButton variant='ghost' wrap />
			</DropdownMenuGroupSignOut>
		</DropdownMenu.Content>
	)
}
