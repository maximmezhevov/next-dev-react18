import type { AuthCardProps } from './types'
import { Social } from './social'
import { BackButton } from './back-button'
import { Card } from '@/components/shadcn'

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
			<Card.Header>
				<Card.Title>{headerLabel}</Card.Title>
				<Card.Description>{headerDescription}</Card.Description>
			</Card.Header>
			<Card.Content>{children}</Card.Content>
			{showSocial && (
				<Card.Footer>
					<Social />
				</Card.Footer>
			)}
			<Card.Footer>
				<BackButton backButtonHref={backButtonHref} backButtonLabel={backButtonLabel} />
			</Card.Footer>
		</Card.Root>
	)
}
