import type { AuthCardProps } from './types'
import { Social } from './social'
import { BackButton } from './back-button'
import { Card, Separator } from '@/components/shadcn'

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
			<Card.Content className='space-y-4'>
				{showSocial && (
					<>
						<Social />
						<div className='flex items-center gap-1'>
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

			<Card.Footer>
				<BackButton
					backButtonHref={backButtonHref}
					backButtonLabel={backButtonLabel}
				/>
			</Card.Footer>
		</Card.Root>
	)
}
