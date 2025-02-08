import Link from 'next/link'
import { Card, Separator } from '@/components/shadcn'

import { Social } from './social'

type AuthCardProps = {
	children?: React.ReactNode
	headerLabel: string
	headerDescription?: string
	backButtonHref: string
	backButtonLabel: string
	showSocial?: boolean
}

export const AuthCard: React.FC<AuthCardProps> = ({
	children,
	headerLabel,
	headerDescription,
	backButtonHref,
	backButtonLabel,
	showSocial,
}) => {
	return (
		<Card.Root className='w-[400px] shadow-md'>
			<Card.Header className='text-center'>
				<Card.Title>{headerLabel}</Card.Title>
				<Card.Description>{headerDescription}</Card.Description>
			</Card.Header>
			{children && (
				<Card.Content className='space-y-4'>
					{showSocial && (
						<>
							<Social />
							<div className='flex items-center gap-2'>
								<Separator className='w-full shrink' />
								<div className='shrink-0 text-xs text-muted-foreground'>
									or Credential
								</div>
								<Separator className='w-full shrink' />
							</div>
						</>
					)}
					{children}
				</Card.Content>
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
