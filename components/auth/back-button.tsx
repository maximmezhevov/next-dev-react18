import type { AuthCardProps } from './types'
import Link from 'next/link'
import { Button } from '../shadcn'

type BackButtonProps = Pick<AuthCardProps, 'backButtonHref' | 'backButtonLabel'>
export const BackButton: React.FC<BackButtonProps> = ({
	backButtonHref,
	backButtonLabel,
}) => {
	return (
		<Button asChild variant='link' size='sm' className='w-full font-normal'>
			<Link href={backButtonHref}>{backButtonLabel}</Link>
		</Button>
	)
}
