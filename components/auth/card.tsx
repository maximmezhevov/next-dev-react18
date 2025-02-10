import Link from 'next/link'
import { Button, Card } from '@/components/shadcn'
import { cn } from '@/lib'

type AuthCardProps = {
	children?: React.ReactNode
	headerBigLabel?: string
	headerLabel?: string
	headerDescription?: string
	classNameContent?: string
	backButtonHref: string
	backButtonLabel: string
}

export const AuthCard: React.FC<AuthCardProps> = ({
	children,
	headerLabel,
	headerBigLabel,
	headerDescription,
	backButtonHref,
	backButtonLabel,
	classNameContent,
}) => {
	return (
		<Card.Root className='w-[400px] border-0 shadow-none sm:border sm:shadow-md'>
			<Card.Header className={cn('text-center', headerBigLabel && 'space-y-0')}>
				<Card.Title
					className={cn(
						'',
						headerBigLabel && 'text-5xl font-black uppercase tracking-tight'
					)}
				>
					{headerLabel || headerBigLabel}
				</Card.Title>
				{headerDescription && (
					<Card.Description>{headerDescription}</Card.Description>
				)}
			</Card.Header>
			{children && (
				<Card.Content className={classNameContent}>{children}</Card.Content>
			)}
			<Card.Footer>
				<Button
					asChild
					variant='link'
					className='h-auto w-full p-0 text-sm text-muted-foreground underline-offset-2 transition-none hover:text-foreground hover:underline'
				>
					<Link href={backButtonHref}>{backButtonLabel}</Link>
				</Button>
			</Card.Footer>
		</Card.Root>
	)
}
