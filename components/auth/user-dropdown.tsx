// import type { User } from '@prisma/client'

// import { Dropdown } from '@/components/shadcn'
// import { UserAvatar } from '@/components/ui'

// // import { LoginButton } from './login-button'

// export const UserDropdown: React.FC<{ user: User }> = ({ user }) => {
// 	if (!user) {
// 		return (
// 			//
// 			<UserAvatar user={user} />
// 			//
// 		)
// 	}

// 	return (
// 		<Dropdown.Root>
// 			<Dropdown.Trigger asChild>
// 				<UserAvatar user={user} />
// 			</Dropdown.Trigger>
// 			<Content user={user} />
// 		</Dropdown.Root>
// 	)
// }

// const Content: React.FC<{ user: User }> = ({ user }) => {
// 	return (
// 		<Dropdown.Content>
// 			<DropdownProfile user={user} />
// 			<Dropdown.Separator />
// 			<Dropdown.Group>
// 				<Dropdown.Item>...</Dropdown.Item>
// 			</Dropdown.Group>
// 			<Dropdown.Separator />
// 			<Dropdown.Group>
// 				<Dropdown.Item>Log out</Dropdown.Item>
// 			</Dropdown.Group>
// 		</Dropdown.Content>
// 	)
// }

// const DropdownProfile: React.FC<{ user: User }> = ({ user }) => {
// 	return (
// 		<Dropdown.Label className='p-0 font-normal'>
// 			<div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
// 				<UserAvatar user={user} className='cursor-default bg-secondary' />
// 				<div className='grid flex-1 text-left text-sm leading-tight'>
// 					<span className='truncate font-semibold'>{user?.name}</span>
// 					<span className='truncate text-xs'>{user?.email}</span>
// 				</div>
// 			</div>
// 		</Dropdown.Label>
// 	)
// }
