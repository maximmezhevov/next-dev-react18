import Link from 'next/link'
import { Card } from '@/components/shadcn'

type AuthCardProps = {
	children?: React.ReactNode
	headerLabel: string
	headerDescription?: string
	classNameContent?: string
	backButtonHref: string
	backButtonLabel: string
}

export const AuthCard: React.FC<AuthCardProps> = ({
	children,
	headerLabel,
	headerDescription,
	backButtonHref,
	backButtonLabel,
	classNameContent,
}) => {
	return (
		<Card.Root className='w-[400px] border-0 shadow-none sm:border sm:shadow-md'>
			<Card.Header className='text-center'>
				<Card.Title>{headerLabel}</Card.Title>
				{headerDescription && (
					<Card.Description>{headerDescription}</Card.Description>
				)}
			</Card.Header>
			{children && (
				<Card.Content className={classNameContent}>{children}</Card.Content>
			)}
			<Card.Footer>
				<Link
					href={backButtonHref}
					className='w-full text-center text-sm text-muted-foreground hover:text-foreground'
				>
					{backButtonLabel}
				</Link>
			</Card.Footer>
		</Card.Root>
	)
}
