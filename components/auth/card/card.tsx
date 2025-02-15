import Link from 'next/link'
import { Button, Card } from '@/components/shadcn'
import { Suspense } from 'react'
import { ButtonCallback, HeaderCallback } from './callback-components'

type AuthCardProps = {
	children?: React.ReactNode

	headerTitle?: string
	headerDescription?: string
	classNameContent?: string
	backButtonHref?: string
	backButtonLabel?: string

	callbackTitle?: string
	callbackButtonLabel?: string
}

export const AuthCard: React.FC<AuthCardProps> = ({
	children,

	headerTitle,
	headerDescription,
	backButtonHref,
	backButtonLabel,
	classNameContent,

	callbackTitle,
	callbackButtonLabel,
}) => {
	return (
		<Card.Root className='w-[400px] border-0 shadow-none sm:border sm:shadow-md'>
			{(headerTitle || callbackTitle || headerDescription) && (
				<Card.Header className='text-center'>
					{headerTitle && <Card.Title>{headerTitle}</Card.Title>}
					{callbackTitle && (
						<Suspense fallback={null}>
							<HeaderCallback title={callbackTitle} />
						</Suspense>
					)}
					{headerDescription && (
						<Card.Description>{headerDescription}</Card.Description>
					)}
				</Card.Header>
			)}
			{children && (
				<Card.Content className={classNameContent}>{children}</Card.Content>
			)}
			<Card.Footer>
				{backButtonHref && backButtonLabel && (
					<Button
						asChild
						variant='link'
						className='h-auto w-full p-0 text-sm text-muted-foreground underline-offset-2 transition-none hover:text-foreground hover:underline'
					>
						<Link href={backButtonHref}>{backButtonLabel}</Link>
					</Button>
				)}
				{(callbackButtonLabel || backButtonHref) && (
					<Suspense fallback={null}>
						<ButtonCallback
							callbackButtonLabel={callbackButtonLabel}
							backButtonHref={backButtonHref}
						/>
					</Suspense>
				)}
			</Card.Footer>
		</Card.Root>
	)
}
