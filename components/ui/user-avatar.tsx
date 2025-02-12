import type { User } from '@prisma/client'

import { User2 } from 'lucide-react'
import { cn } from '@/lib'
import { Button, Avatar } from '@/components/shadcn'

export const UserAvatar: React.FC<{
	user: Pick<User, 'name' | 'image'>
	className?: string
}> = ({ user, className }) => {
	if (!user.image || !user.name) {
		return (
			<Button
				variant='ghost-secondary'
				size='32-i'
				className={cn('data-[state=open]:bg-secondary/80', className)}
			>
				<User2 />
			</Button>
		)
	}

	return (
		<Avatar.Root className='h-9 w-9 rounded-md'>
			<Avatar.Image src={user.image} alt={user?.name} />
			<Avatar.Fallback className='[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'>
				<User2 />
			</Avatar.Fallback>
		</Avatar.Root>
	)
}
