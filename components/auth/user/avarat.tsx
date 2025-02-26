import type { User } from 'next-auth'
import { User2 } from 'lucide-react'
import { cn } from '@/lib/shadcn'
import { Avatar, AvatarFallback, AvatarImage, Skeleton } from '@/components/ui'

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
