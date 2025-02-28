import type { User } from 'next-auth'
import {
	Trigger,
	DropdownMenuGroupSignOut,
	SignOutServerRefreshButton,
	SignOutServerReloadButton,
} from '@/components/auth'
import { DropdownMenu } from '@/components/ui'

export const UserDropdownServer: React.FC<{ user: User }> = ({ user }) => {
	if (!user) return null

	return (
		<DropdownMenu.DropdownMenu>
			<Trigger image={user.image} />
			<Content />
		</DropdownMenu.DropdownMenu>
	)
}

const Content: React.FC = () => {
	return (
		<DropdownMenu.Content>
			<DropdownMenuGroupSignOut>
				<SignOutServerRefreshButton variant='ghost' wrap />
				<SignOutServerReloadButton variant='ghost' wrap />
			</DropdownMenuGroupSignOut>
		</DropdownMenu.Content>
	)
}
