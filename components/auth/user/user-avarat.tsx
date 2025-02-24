import type { User } from 'next-auth'

import { User2 } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback, Skeleton } from '@/components/ui'
import { cn } from '@/lib/shadcn'

export const UserAvatar: React.FC<{ image: User['image']; className?: string }> = ({
	image,
	className,
}) => {
	if (!image) {
		return <User2 />
	}

	return (
		<Avatar className={cn(className)}>
			{!image ? <User2 /> : <AvatarImage src={image} />}
			<AvatarFallback>
				<Skeleton className='size-9' />
			</AvatarFallback>
		</Avatar>
	)
}
