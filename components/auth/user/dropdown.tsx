'use client'

import type { User } from 'next-auth'
import { SignOutServerRefreshButton } from '@/components/auth'
import { DropdownMenu } from '@/components/ui'

import { UserAvatar } from './avarat'

const UserDropdown: React.FC<{ user: User | undefined }> = ({ user }) => {
	if (!user) return null

	return (
		<DropdownMenu.DropdownMenu>
			<Trigger image={user.image} />
			<Content user={user} />
		</DropdownMenu.DropdownMenu>
	)
}

const Trigger: React.FC<{ image: User['image'] }> = ({ image }) => {
	return (
		<DropdownMenu.Trigger className='size-9 overflow-hidden rounded-full'>
			<UserAvatar image={image} className='size-9' />
		</DropdownMenu.Trigger>
	)
}

const Content: React.FC<{ user: User }> = ({ user }) => {
	return (
		<DropdownMenu.Content className='space-y-1'>
			<Profile user={user} />
			<DropdownMenu.Separator />
			<Links />
			<DropdownMenu.Separator />
			<SignOut />
		</DropdownMenu.Content>
	)
}

const Profile: React.FC<{ user: User }> = ({ user }) => {
	return (
		<div className='flex items-center gap-2 px-1 py-1.5 text-sm'>
			<UserAvatar image={user.image} className='size-9 rounded-md' />
			<div className='flex flex-col justify-between *:truncate'>
				<span className='text-sm'>{user?.name}</span>
				<span className='text-xs'>{user?.email}</span>
			</div>
		</div>
	)
}

const Links: React.FC = () => {
	return (
		<DropdownMenu.Group className='space-y-0.5'>
			<DropdownMenu.Item>...</DropdownMenu.Item>
		</DropdownMenu.Group>
	)
}

const SignOut: React.FC = () => {
	return (
		<DropdownMenuGroupSignOut>
			<SignOutServerRefreshButton variant='ghost' />
		</DropdownMenuGroupSignOut>
	)
}

// TODO // временный компонент
const DropdownMenuGroupSignOut: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<DropdownMenu.Group className='space-y-0.5 *:flex *:min-h-8 *:w-full *:justify-start *:rounded-sm *:px-2 *:py-1.5 *:text-sm'>
			{children}
		</DropdownMenu.Group>
	)
}

export { UserDropdown, Trigger, DropdownMenuGroupSignOut }
