import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/shadcn'
import { ButtonCallback, ButtonWatchCallback } from '@/components/shared'
import { Card, SuspenseSkeleton } from '@/components/ui'

type AuthCardProps = {
	headerTitle: string
	headerDescription?: string
	children: React.ReactNode
	footerButtonHref: string
	footerButtonLabel: string

	classNameHeader?: string
	classNameTitle?: string
	classNameContent?: string
}

export const AuthCard: React.FC<AuthCardProps> = ({
	headerTitle,
	headerDescription,
	children,
	footerButtonHref,
	footerButtonLabel,

	classNameHeader,
	classNameTitle,
	classNameContent,
}) => {
	return (
		<Card.Card className='w-[400px] border-0 shadow-none sm:border sm:shadow-md'>
			{(headerTitle || headerDescription) && (
				<Card.CardHeader className={cn('text-center', classNameHeader)}>
					{headerTitle && (
						<Card.CardTitle className={cn(classNameTitle)}>{headerTitle}</Card.CardTitle>
					)}
					{headerDescription && <Card.CardDescription>{headerDescription}</Card.CardDescription>}
				</Card.CardHeader>
			)}

			{children && <Card.CardContent className={classNameContent}>{children}</Card.CardContent>}

			<Card.CardFooter className='gap-1'>
				<SuspenseSkeleton className='h-9 w-full'>
					<ButtonCallback variant='ghost' size='icon' className='shrink-0'>
						<ArrowLeft />
					</ButtonCallback>
					<ButtonWatchCallback
						href={footerButtonHref}
						variant='link'
						className='w-full data-[callback=true]:pr-14'
					>
						{footerButtonLabel}
					</ButtonWatchCallback>
				</SuspenseSkeleton>
			</Card.CardFooter>
		</Card.Card>
	)
}
