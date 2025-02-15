import { Metadata } from 'next'
import { AuthCard, LoginFormNoVerif, OAuth } from '@/components/auth'
import { NamedSeparator, SuspenseSkeleton } from '@/components/ui'

export const metadata: Metadata = {
	title: 'Авторизация без email верификацией',
}

export default function LoginPage() {
	return (
		<AuthCard
			callbackTitle='NRD18'
			headerDescription='Добро пожаловать!'
			backButtonHref='/auth/register'
			callbackButtonLabel='Нет учетной записи?'
			classNameContent='space-y-6'
		>
			{/* <OAuthServer provider='github' />
				<OAuthClient provider='github' /> */}

			<SuspenseSkeleton>
				<OAuth provider='github' />
			</SuspenseSkeleton>
			<NamedSeparator label='или с учетной записью' />
			<SuspenseSkeleton className='h-[216px] w-full'>
				<LoginFormNoVerif />
			</SuspenseSkeleton>
		</AuthCard>
	)
}
