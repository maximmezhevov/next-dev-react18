import type { User } from 'next-auth'
import { User2 } from 'lucide-react'
import { cn } from '@/lib/shadcn'
import { Avatar, AvatarFallback, AvatarImage, Skeleton } from '@/components/ui'

export const UserAvatar: React.FC<{ image: User['image']; className?: string }> = ({
	image,
	className,
}) => {
	if (!image) {
		return <NoImage className={className} />
	}
	// eslint-disable-next-line jsx-a11y/alt-text
	return <Image image={image} className={className} />
}

const NoImage: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<div
			className={cn(
				'flex shrink-0 items-center justify-center bg-secondary [&_svg]:size-4',
				className
			)}
		>
			<User2 />
		</div>
	)
}

const Image: React.FC<{
	image: string
	className?: string
}> = ({ image, className }) => {
	return (
		<Avatar className={cn(className)}>
			<AvatarImage src={image} />
			<AvatarFallback>
				<Skeleton className='size-9' />
			</AvatarFallback>
		</Avatar>
	)
}
