import type { AvailableProviders } from '@/@types'
import { signIn } from '@/auth'
import { Button } from '@/components/shadcn'
import { IconMap, LabelMap } from './constants'

/**
 * default redirectTo = '/dev/next-auth'
 */
export const OAuthServer: React.FC<{
	provider: AvailableProviders
	redirectTo?: string
}> = ({ provider, redirectTo = '/dev/next-auth' }) => {
	return (
		<form
			action={async () => {
				'use server'
				await signIn(provider, { redirectTo })
			}}
		>
			<Button type='submit' className='w-full'>
				{IconMap[provider]}
				{LabelMap[provider]}
			</Button>
		</form>
	)
}
