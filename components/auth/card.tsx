import { Card } from '@/components/shadcn'
import { WatchCallbackUrlButton, SuspenseSkeleton } from '@/components/ui'

type AuthCardProps = {
	headerTitle?: string
	headerDescription?: string
	children?: React.ReactNode
	backButtonHref?: string
	backButtonLabel?: string

	classNameContent?: string
}

export const AuthCard: React.FC<AuthCardProps> = ({
	headerTitle = null,
	headerDescription = null,
	children = null,
	backButtonHref = null,
	backButtonLabel = null,

	classNameContent,
}) => {
	return (
		<Card.Root className='w-[400px] border-0 shadow-none sm:border sm:shadow-md'>
			{(headerTitle || headerDescription) && (
				<Card.Header className='text-center'>
					{headerTitle && <Card.Title>{headerTitle}</Card.Title>}
					{headerDescription && (
						<Card.Description>{headerDescription}</Card.Description>
					)}
				</Card.Header>
			)}
			{children && (
				<Card.Content className={classNameContent}>{children}</Card.Content>
			)}
			{backButtonHref && backButtonLabel && (
				<Card.Footer>
					<SuspenseSkeleton className='h-6 w-full'>
						<WatchCallbackUrlButton
							href={backButtonHref as string}
							label={backButtonLabel}
							variant='link2'
							size='24'
							className='w-full'
						/>
					</SuspenseSkeleton>
				</Card.Footer>
			)}
		</Card.Root>
	)
}
